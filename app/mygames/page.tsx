import GameCard from "./GameCard";

export default function MyGames() {
  return (
    <div style={{
        "fontSize": 18,
        "fontFamily": '"Croissant One", "serif"',
        "fontWeight": 400,
        "fontStyle": "normal",

        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "left",

        "marginTop": "10px",
        "padding": "5px",

        "height": "82vh",

        "backgroundColor": "#240046",
        "borderRadius": "10px",

    }}>

      <div style={{
        "backgroundColor": "#3C096C",
        "minHeight": "20%",

        "marginBottom": "5px",
        "padding": "5px",

        "borderRadius": "10px",
      }}>
        This will be the filter controls...
      </div>


      <div style={{
        "display": "block",
        "backgroundColor": "#3C096C",
        "width": "100%",
        "margin": "0 auto",
        "padding": "5px",

        "height": "80%",

        "overflowY": "auto",

        "borderRadius": "10px",
        // "margin": "auto"
      }}>

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
          image_url={"https://ignwg52srfesp8qk.public.blob.vercel-storage.com/trio.jpeg"}
        />

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
          image_url={"https://ignwg52srfesp8qk.public.blob.vercel-storage.com/trio.jpeg"}
        />

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
          image_url={"https://ignwg52srfesp8qk.public.blob.vercel-storage.com/trio.jpeg"}
        />

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
          image_url={"https://ignwg52srfesp8qk.public.blob.vercel-storage.com/trio.jpeg"}
        />

        <GameCard
          name={"Juego de Prueba"}
          min_duration={30}
          max_duration={90}
          min_players={2}
          max_players={4}
          image_url={"https://ignwg52srfesp8qk.public.blob.vercel-storage.com/trio.jpeg"}
        />
        
      </div>
    </div>
  );
}