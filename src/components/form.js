import React, { useState, useEffect } from "react";
import "./form.css";
import pic1 from "./mushroom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faMailbox,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Form() {
  const [gameName, setGameName] = useState("");
  const [gameNames, setGameNames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // State variable to control dropdown visibility
  const [recommendations, setRecommendations] = useState([]); // State variable to store recommendations
  const [consoleLogs, setConsoleLogs] = useState([]); // State variable to store console logs

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("http://127.0.0.1:5000/games"); // Adjust URL accordingly
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGameNames(data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
        addConsoleLog("Error fetching games: " + error.message);
      }
    }

    fetchGames();
  }, []);

  const addConsoleLog = (message) => {
    setConsoleLogs((prevLogs) => [...prevLogs, message]);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setGameName(value);
    // Show dropdown if input value is not empty
    setShowDropdown(value.trim().length > 0);
  };

  // Function to handle dropdown selection
  const handleDropdownChange = (e) => {
    const selectedGame = e.target.value;
    setGameName(selectedGame); // Set selected game as the value of gameName
    console.log("Selected game:", selectedGame);
    addConsoleLog("Selected game: " + selectedGame);
  };

  // Function to handle button click
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/recommend?game=${gameName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      return data.recommendations;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      addConsoleLog("Error fetching recommendations: " + error.message);
      return [];
    }
  };
  
  const handleButtonClick = async () => {
    const recommendations = await fetchRecommendations();
    console.log("Recommendations:", recommendations);
    setRecommendations(recommendations);
    addConsoleLog("Recommendations: " + JSON.stringify(recommendations));
  };
  

  return (
    <div>
      <div className="border">
        <div className="title">
          <img src={pic1} alt="game-suggestion-icon" />
          Game Suggestion Generator
        </div>
        <div className="about">
          <p>
            Whether you're a hardcore gamer or a casual player, our intelligent
            recommendation system will help you find your next favorite game in
            just a few clicks. Input the name of the game to receive personalized
            game suggestions. Explore a vast library of games across various
            genres, from action-packed adventures to relaxing simulations. Stay
            up-to-date with the latest game releases and updates, ensuring you
            never miss out on the next big thing.
          </p>
        </div>
        <input
          className="text-box"
          type="text"
          placeholder="Enter Game"
          value={gameName}
          onChange={handleInputChange}
        />
        {showDropdown && gameNames.length > 0 && (
          <select className="dropdown" onChange={handleDropdownChange}>
            {gameNames.map((game, index) => (
              <option key={index} value={game}>
                {game}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="button" onClick={handleButtonClick}>
        <a>Submit</a>
      </div>
      <div className="recommendations">
        <h3>Recommendations:</h3>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
      <div className="socials">
          <h2>Socials</h2>
      </div>
      <div className="logo-border">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/suman-s-7b1313211/">
            <FontAwesomeIcon icon={faLinkedin} bounce />
          </a>
          <a href="https://github.com/Snugtroller">
            <FontAwesomeIcon icon={faGithub} bounce />
          </a>
          <a href="https://www.instagram.com/8_suman_8/?next=%2F">
            <FontAwesomeIcon icon={faInstagram} bounce />
          </a>
          <a href="https://twitter.com/SumanS1079452">
            <FontAwesomeIcon icon={faTwitter} bounce />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Form;
