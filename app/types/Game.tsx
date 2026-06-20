export type Game = {
  id: string;
  name: string;
  min_duration: number,
  max_duration: number,
  min_players: number,
  max_players: number,
  main_image: string,
  description: string,
  images: string[]
};

export const emptyGame: Game = {
  "id": "",
  "name": "",
  "min_duration": 0,
  "max_duration": 0,
  "min_players": 0,
  "max_players": 0,
  "main_image": "",
  "description": "",
  "images": []
}