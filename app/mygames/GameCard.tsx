import { GiAlarmClock, Gi3dMeeple } from "react-icons/gi";
import trio_img from '../../public/trio.jpeg'; 

interface game_card_data {
  name: string,
  min_duration: number,
  max_duration: number,
  min_players: number,
  max_players: number
}

export default function GameCard({
  name,
  min_duration,
  max_duration,
  min_players,
  max_players
}: game_card_data
) {

  return (
    <div style={{
      "display": "flex"
    }}>
      <div>
        <img src={trio_img} alt="Trio img" />;
      </div>

      <div style={{
        "display": "flex",
        "flexDirection": "column"
      }}>
        <div>
          <Gi3dMeeple /> {min_players} - {max_players}
        </div>
        <div>
          {name}
        </div>
        <div>
          <GiAlarmClock /> {min_duration} - {max_duration}
        </div>
      </div>
    </div>
  );
}