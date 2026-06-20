"use client";

import GameCard from "./GameCard";

import { useState, useEffect } from 'react';
import GameDetails from "./GameDetails";
import { Game, emptyGame } from "../types/Game";

export default function MyGames() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const [gameIsSelected, setGameIsSelected] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState("")
  const [selectedGame, setSelectedGame] = useState(emptyGame)

  const api_url = "https://gameshelfappbackend.vercel.app"

  useEffect(() => {
    searchGames();
  }, []);

  const searchGames = async (searchFilter = '') => {
    setLoading(true);
    try {
      const url = `${api_url}/game${searchFilter}`
      console.log(url)
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGameDetails = async (id: string) => {
    setLoading(true);

    for (let i = 0; i < items.length; i++) {
      if (items[i]["id"] == id) {
        setSelectedGame(items[i])
        setGameIsSelected(true)
        break
      }
    }
    
    setLoading(false);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchGames(filter);
  };

  return (
    <div style={{
        "fontSize": 18,
        "fontFamily": '"Croissant One", "serif"',
        "fontWeight": 400,
        "fontStyle": "normal",

        "position": "relative",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "left",

        "marginTop": "10px",
        "padding": "5px",

        "height": "82vh",

        "backgroundColor": "#240046",
        "borderRadius": "10px",

    }}>

      { loading ?
      <div style={{
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#3C096C80",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "zIndex": "10",
        "borderRadius": "10px"
      }}>
        LOADING...
      </div>
      : <></> }

      { gameIsSelected ?
      <div style={{
        "position": "absolute",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#240046",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "zIndex": "9",
        "borderRadius": "10px"
      }}>

        <GameDetails 
          name={selectedGame["name"]}
          min_duration={selectedGame["min_duration"]}
          max_duration={selectedGame["max_duration"]}
          min_players={selectedGame["min_players"]}
          max_players={selectedGame["max_players"]}
          description={selectedGame["description"]}
          main_image={selectedGame["main_image"]}
          images={selectedGame["images"]}
          setGameIsSelected={setGameIsSelected}
        />

      </div>
      : <></> }

      <div style={{
        "backgroundColor": "#3C096C",
        "minHeight": "20%",

        "marginBottom": "5px",
        "padding": "5px",

        "borderRadius": "10px",
      }}>
        This will be the filter controls...
        <div style={{
          "cursor": "pointer",
          
          "border": "solid white 2px"
        }} onClick={handleSearch}>
          Buscar
        </div>
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

        {items.map(game => {
          return (
            <GameCard key={game["id"]}
              id={game["id"]}
              name={game["name"]}
              min_duration={game["min_duration"]}
              max_duration={game["max_duration"]}
              min_players={game["min_players"]}
              max_players={game["max_players"]}
              main_image={game["main_image"]}
              setSelectedGameId={setSelectedGameId}
              getGameDetails={getGameDetails}
            />
          )
        })}
        
      </div>
    </div>
  );
}