import { GiAlarmClock, Gi3dMeeple } from "react-icons/gi";
import { Game } from "../types/Game"

interface game_card_data {
  id: string,
  name: string,
  min_duration: number,
  max_duration: number,
  min_players: number,
  max_players: number,
  main_image: string,
  setSelectedGameId: React.Dispatch<React.SetStateAction<string>>,
  getGameDetails: (id: string) => void
}

export default function GameCard({
  id,
  name,
  min_duration,
  max_duration,
  min_players,
  max_players,
  main_image,
  setSelectedGameId,
  getGameDetails
}: game_card_data
) {

  const handleGameSelection = () => {
    setSelectedGameId(id)
    getGameDetails(id)
  }

  return (
    <div style={{
      "display": "flex",
      "flexDirection": "row",
      "backgroundColor": "#240046",

      "minWidth": "100%",
      "maxWidth": "100%",
      "height": "20vw",
      "maxHeight": "175px",
      "minHeight": "110px",

      "marginBottom": "5px",
      "borderRadius": "10px",

      "cursor": "pointer",
      
      //"border": "solid white 2px",
      "boxSizing": "border-box",
    }} onClick={handleGameSelection}>
      <div style={{
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "flexShrink": 0,

        "height": "100%",
        "aspectRatio": "1",
        "width": "auto",

        "boxSizing": "border-box",

      }}>
        <img style={{
          "borderTopLeftRadius": "10px",
          "borderBottomLeftRadius": "10px",
          "objectFit": "contain",
        }} src={main_image} alt={"Cubierta de " + name} />
      </div>

      <div style={{
        "display": "flex",
        "flexDirection": "column",

        "flexGrow": 1,
        "width": "100%",

        "marginLeft": "10px",
        "marginRight": "10px",
        "paddingTop": "10px",

        "boxSizing": "border-box"
      }}>
        <div style={{
        }}>
          {name}
        </div>

        <div style={{
          "display": "flex",
          "flexDirection": "row",
          "justifyContent": "right",
          "alignItems": "center",

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

          "marginBottom": "5px"
          
          // "border": "solid white 2px"
        }}>
          <GiAlarmClock style={{ "height": "15px", "marginRight": "5px" }} /> {min_duration} - {max_duration}
        </div>
      </div>
    </div>
  );
}