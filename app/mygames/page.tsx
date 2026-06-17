import GameCard from "./GameCard";

export default function MyGames() {
  return (
    <div style={{
        "fontSize": 18,
        "fontFamily": '"Croissant One", "serif"',
        "fontWeight": 400,
        "fontStyle": "normal",

        "display": "flex",
        "justifyContent": "center",
        "marginTop": "10px",

        "backgroundColor": "#240046",
        "borderRadius": "10px",
    }}>
      <div style={{
        "border": "solid white 2px",
        "margin": "auto"
      }}>

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
        />
        
      </div>
    </div>
  );
}