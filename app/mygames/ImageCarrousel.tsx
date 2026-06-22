import { useState } from "react";
import { GiAlarmClock, Gi3dMeeple } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ShowImage from "./ShowImage";

interface image_carrousel_data {
  name: string,
  main_image: string,
  images: string[]
}

export default function ImageCarrousel({
  name,
  main_image,
  images
}: image_carrousel_data
) {

  const [isSelected, setIsSelected] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  return (
    <div style={{
      "display": "flex",
      "flexDirection": "row",
      "backgroundColor": "#5A189A",
      "overflowX": "auto",       /* Enables horizontal scrolling when content overflows */
      "overflowY": "hidden" ,    /* Prevents vertical scrolling */
      "width": "100%",            /* Or a fixed width like 500px */

      "height": "20vh",
      "minHeight": "150px",

      "maxWidth": "600px",       /* Keeps the parent container at a constrained size */
      "gap": "10px",              /* Adds spacing between the square containers */
      "padding": "10px",          /* Prevents content from clipping at the edges */
      "boxSizing": "border-box",

      "marginTop": "5px",
      "marginBottom": "10px",

      "borderRadius": "10px",
    }}>

      {isSelected ? <ShowImage
        name={name}
        image={selectedImage}
        setIsSelected={setIsSelected}
      /> : <></>}

      <div style={{
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "flexShrink": 0,
        "flex": "0 0 auto",
        "backgroundColor": "#3C096C",

        "height": "100%",
        "aspectRatio": "1",
        "width": "auto",

        "cursor": "pointer",
        "borderRadius": "10px"
      }} onClick={() => {
        setSelectedImage(main_image)
        setIsSelected(true)
      }}>
        <img style={{
          "borderRadius": "10px",
          "objectFit": "contain",
        }} src={main_image} alt={"Cubierta de " + name} />
      </div>
      
      {images.map((img, idx) => {
        return (
          <div key={idx} style={{
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "flexShrink": 0,
            "flex": "0 0 auto",
            "backgroundColor": "#3C096C",

            "height": "100%",
            "aspectRatio": "1",
            "width": "auto",

            "boxSizing": "border-box",

            "cursor": "pointer",
            "borderRadius": "10px"
          }} onClick={() => {
            setSelectedImage(img)
            setIsSelected(true)
          }}>
        <img style={{
          "borderRadius": "10px",
          "objectFit": "contain",
        }} src={img} alt={"Imagen de " + name} />
      </div>
    )
    })}
        
    </div>
  );
}