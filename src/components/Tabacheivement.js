import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/tabletennisacheive/win1.jpeg";
import win2 from "./assets/tabletennisacheive/win2.jpeg";
import win3 from "./assets/tabletennisacheive/win3.jpeg";
import win4 from "./assets/tabletennisacheive/win4.jpeg";
import win5 from "./assets/tabletennisacheive/win5.jpeg";







const Tabacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Table Tennis Champions"
      Our table tennis team delivered a flawless performance to win the district-level table tennis championship. The captain's leadership and tactical plays, along with exceptional reflexes, ensured an undefeated tournament.`
    },
    
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College Table Tennis League"
      Our table tennis team dominated the Inter-College League, overcoming strong opponents to claim the championship title. The final match saw brilliant rallies and quick counter-attacks that secured a narrow victory in the last moments of the game.`
    },
    
    {
      imgSrc: win3,
      text: `"Triumphant in the State Table Tennis Championship"
      The team claimed first place in the state-level table tennis championship, defeating the reigning champions in a nail-biting final. Exceptional teamwork, tactical precision, and perfect finishes made this victory unforgettable.`
    },
    
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
      Facing top teams from across the nation, our table tennis team reached the finals of the National Sports Meet. Though we finished second, the team displayed exceptional talent, resilience, and sportsmanship, earning the respect of opponents and spectators alike.`
    },
    
    {
      imgSrc: win5,
      text: `"Victory at the Collegiate Table Tennis Championship"
      In a highly anticipated collegiate table tennis championship, our team clinched the trophy with a commanding 3-1 victory. The final match was a testament to our team's strategy, with key serves and exceptional rallies.`
    }
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImg, setNewImg] = useState("");
  const [newText, setNewText] = useState("");

  const handleAddItem = () => {
    if (newImg && newText) {
      setItems([...items, { imgSrc: newImg, text: newText }]);
      setNewImg("");
      setNewText("");
      setIsModalOpen(false);
    } else {
      alert("Both fields are required!");
    }
  };

  return (
    <div className="app">
      <h1 className="heading">ACHIEVEMENTS</h1>
      <div className="container">
        {items.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.imgSrc} alt="Achievement" />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        Add
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Achievement</h2>
            <input
              type="text"
              placeholder="Enter Image URL"
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
            />
            <textarea
              placeholder="Enter Description"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            ></textarea>
            <button onClick={handleAddItem}>Add</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabacheivement;
