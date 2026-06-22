import React, { useRef, useState, useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion, useMotionValue } from 'framer-motion';

interface show_image {
  name: string,
  image: string,
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShowImage({
  name,
  image,
  setIsSelected
}: show_image
) {
    const [scale, setScale] = useState(0.8);
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const touchPointsRef = useRef<{ [key: number]: { clientX: number; clientY: number } }>({});
    const initialDistanceRef = useRef<number | null>(null);
    const initialScaleRef = useRef<number>(0.8);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    // Guardamos el tamaño exacto que ocupa la foto en píxeles (sin zoom)
    const [renderedDimensions, setRenderedDimensions] = useState({ width: 0, height: 0 });

    const updateDimensions = (naturalWidth: number, naturalHeight: number) => {
        if (naturalWidth > 0 && naturalHeight > 0) {
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
        }
    };

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
        updateDimensions(imgRef.current.naturalWidth, imgRef.current.naturalHeight);
        }
    }, []);

    // Calculamos las proporciones reales de la foto
    useEffect(() => {
        if (typeof window === 'undefined' || imageDimensions.width === 0) return;

        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        const windowRatio = viewWidth / viewHeight;
        const imageRatio = imageDimensions.width / imageDimensions.height;

        let displayedWidth = viewWidth;
        let displayedHeight = viewHeight;

        if (imageRatio > windowRatio) {
        displayedHeight = viewWidth / imageRatio;
        } else {
        displayedWidth = viewHeight * imageRatio;
        }

        setRenderedDimensions({ width: displayedWidth, height: displayedHeight });
    }, [imageDimensions]);

    const clampPositionToCenterPixel = (currentScale: number) => {
        if (renderedDimensions.width === 0) return;

        // Multiplicamos el tamaño base de la foto por el nivel de zoom actual
        const currentWidth = renderedDimensions.width * currentScale;
        const currentHeight = renderedDimensions.height * currentScale;

        const maxDragX = currentWidth / 2;
        const maxDragY = currentHeight / 2;

        const currentX = x.get();
        const currentY = y.get();

        if (Math.abs(currentX) > maxDragX) {
        x.set(Math.sign(currentX) * maxDragX);
        }
        if (Math.abs(currentY) > maxDragY) {
        y.set(Math.sign(currentY) * maxDragY);
        }
    };

    useEffect(() => {
        const checkAndClamp = () => clampPositionToCenterPixel(scale);
        const unsubscribeX = x.on('change', checkAndClamp);
        const unsubscribeY = y.on('change', checkAndClamp);
        return () => {
        unsubscribeX();
        unsubscribeY();
        };
    }, [scale, x, y, renderedDimensions]);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        setScale((prevScale) => {
        const newScale = prevScale - e.deltaY * 0.001;
        const clampedScale = Math.min(Math.max(newScale, 0.2), 5);
        clampPositionToCenterPixel(clampedScale);
        return clampedScale;
        });
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        touchPointsRef.current[e.pointerId] = { clientX: e.clientX, clientY: e.clientY };
        const activePointers = Object.values(touchPointsRef.current);

        if (activePointers.length === 2) {
        const dx = activePointers[0].clientX - activePointers[1].clientX;
        const dy = activePointers[0].clientY - activePointers[1].clientY;
        initialDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
        initialScaleRef.current = scale;
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (touchPointsRef.current[e.pointerId]) {
        touchPointsRef.current[e.pointerId] = { clientX: e.clientX, clientY: e.clientY };
        }

        const activePointers = Object.values(touchPointsRef.current);

        if (activePointers.length === 2 && initialDistanceRef.current !== null) {
        const dx = activePointers[0].clientX - activePointers[1].clientX;
        const dy = activePointers[0].clientY - activePointers[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        const factor = currentDistance / initialDistanceRef.current;
        
        setScale(() => {
            const newScale = initialScaleRef.current * factor;
            const clampedScale = Math.min(Math.max(newScale, 0.2), 5);
            clampPositionToCenterPixel(clampedScale);
            return clampedScale;
        });
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        delete touchPointsRef.current[e.pointerId];
        if (Object.keys(touchPointsRef.current).length < 2) {
        initialDistanceRef.current = null;
        }
    };

    const handleManualZoom = (type: 'in' | 'out' | 'reset') => {
        setScale((prevScale) => {
        let newScale = prevScale;
        if (type === 'in') newScale = prevScale + 0.3;
        if (type === 'out') newScale = prevScale - 0.3;
        if (type === 'reset') {
            x.set(0);
            y.set(0);
            return 0.8;
        }
        const clampedScale = Math.min(Math.max(newScale, 0.2), 5);
        clampPositionToCenterPixel(clampedScale);
        return clampedScale;
        });
    };

    const windowOverlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none'
    };

    const motionWrapperStyle: React.CSSProperties = {
        width: renderedDimensions.width > 0 ? `${renderedDimensions.width}px` : '100vw',
        height: renderedDimensions.height > 0 ? `${renderedDimensions.height}px` : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none'
    };

    const buttonContainerStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '30px',
        display: 'flex',
        gap: '15px',
        zIndex: 10000
    };

    const buttonStyle: React.CSSProperties = {
        padding: '12px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        backdropFilter: 'blur(5px)',
    };

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel} // Captura la rueda de forma directa y nativa en React
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={() => {setIsSelected(false)}}
            style={{
                "position": 'fixed',
                "top": "0",
                "left": "0",
                "width": '100vw',
                "height": '100vh',
                "overflow": 'hidden',
                "zIndex": 9999,
                "backgroundColor": "#10002B90",

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none'
        }}>
            
            <motion.div
                style={{
                    ...motionWrapperStyle,
                    x: x,
                    y: y,
                    scale: scale,
                }}
                drag
                dragConstraints={false}
                dragElastic={0}
                dragMomentum={false}
                whileDrag={{ cursor: 'grabbing' }}
                onDoubleClick={(e) => {
                e.stopPropagation();
                handleManualZoom(scale > 1 ? 'reset' : 'in');
                }}
                onClick={(e) => {
                    e.stopPropagation(); // Ahora solo frena el cierre si tocas ESTRICTAMENTE la foto
                }}
            >
                <img
                    ref={imgRef}
                    src={image}
                    alt={`Imagen de ${name}`}
                    draggable="false"
                    onLoad={(e) => updateDimensions(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
                    style={{
                        ...imageStyle,
                        ['WebkitUserDrag' as any]: 'none', 
                    }}
                />
            </motion.div>

            <div style={buttonContainerStyle} onClick={(e) => e.stopPropagation()}>
                <button style={buttonStyle} onClick={() => handleManualZoom('in')}>➕</button>
                <button style={buttonStyle} onClick={() => handleManualZoom('out')}>➖</button>
                <button style={buttonStyle} onClick={() => handleManualZoom('reset')}>Reset</button>
            </div>
        </div>

    );
}