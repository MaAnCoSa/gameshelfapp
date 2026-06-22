import { GiAlarmClock, Gi3dMeeple } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ImageCarrousel from "./ImageCarrousel";

interface game_card_data {
  name: string,
  min_duration: number,
  max_duration: number,
  min_players: number,
  max_players: number,
  description: string,
  main_image: string,
  images: string[],
  setGameIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GameDetails({
  name,
  min_duration,
  max_duration,
  min_players,
  max_players,
  description,
  main_image,
  images,
  setGameIsSelected
}: game_card_data
) {

  return (
    <div style={{
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "backgroundColor": "#240046",
      "display": "flex",
      "flexDirection": "column",
      "alignItems": "center",
      "justifyContent": "left",
      "zIndex": "9",
      "borderRadius": "10px",

      "overflowY": "auto",

      "padding": "10px",

      // "border": "solid white 2px"
    }}>

      <div style={{
        "width": "100%",
        "height": "auto",
        "backgroundColor": "#240046",
        "display": "flex",
        "alignItems": "left",
        "justifyContent": "left",
        "zIndex": "9",

        "marginBottom": "10px",

        // "border": "solid white 2px"
      }}>

        <div style={{
          "width": "40px",
          "height": "40px",
          "display": "flex",
          "justifyContent": "center",
          "alignItems": "center",

          "marginRight": "10px",
          "marginTop": "5px",
          "marginLeft": "5px",

          "borderRadius": "20px",

          "cursor": "pointer",

          // "border": "solid green 2px"
        }} onClick={() => {setGameIsSelected(false)}}>
          <IoMdCloseCircleOutline size={40}/>
        </div>

        <div style={{
          "fontSize": 25,
          "fontFamily": '"Croissant One", "serif"',
          "fontWeight": 400,
          "fontStyle": "normal",

          "width": "100%",
          
          "display": "flex",
          "justifyContent": "right",
          "alignItems": "center",

          // "border": "solid green 2px"
        }}>
          {name} 
        </div>
          
      </div>

      <div style={{
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "right",
        "alignItems": "center",

        "width": "100%",

        "marginTop": "5px",
        
        // "border": "solid white 2px"
      }}>
        <Gi3dMeeple style={{ "height": "15px", "marginRight": "5px" }}/> {min_players} - {max_players}
      </div>
          
      <div style={{
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "right",
        "alignItems": "center",

        "width": "100%",

        "marginBottom": "5px"
        
        // "border": "solid white 2px"
      }}>
        <GiAlarmClock style={{ "height": "15px", "marginRight": "5px" }} /> {min_duration} - {max_duration}
      </div>

      <ImageCarrousel
        name={name}
        main_image={main_image}
        images={images}
      />

      <div style={{
        "fontSize": 20,
        "fontFamily": '"Croissant One", "serif"',
        "fontWeight": 400,
        "fontStyle": "normal",

      }}>
        {description}
      </div>
    </div>
  );
}