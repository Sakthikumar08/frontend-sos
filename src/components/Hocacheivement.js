import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/hockeyacheive/win1.png";
import win2 from "./assets/hockeyacheive/win2.jpg";
import win3 from "./assets/hockeyacheive/win3.jpeg";
import win4 from "./assets/hockeyacheive/win4.jpeg";
import win5 from "./assets/hockeyacheive/win5.jpeg";






const Hocacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Hockey Champions"
      Our hockey team delivered a flawless performance to win the district-level hockey championship. The captain's leadership, combined with excellent tactical plays and a solid defense, ensured an undefeated tournament.`
    },
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College League"
      Our hockey team dominated the Inter-College League, overcoming strong opponents to claim the championship title. The final match saw brilliant goals, with relentless defense that secured a narrow victory in the final minutes of the game.`
    },
    {
      imgSrc: win3,
      text: `"Triumphant in the State Hockey Championship"
      The team claimed first place in the state-level hockey championship, defeating the reigning champions in a thrilling final. Exceptional teamwork, tactical precision, and skillful execution made this victory unforgettable.`
    },
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
      Facing top teams from across the nation, our hockey team reached the finals of the National Sports Meet. Though we finished second, the team displayed exceptional talent, resilience, and sportsmanship, earning the respect of opponents and spectators alike.`
    },
    {
      imgSrc: win5,
      text: `"Victory at the Collegiate Hockey Championship"
      In a highly anticipated collegiate hockey championship, our team clinched the trophy with a commanding 3-1 victory. The final match was a testament to our team's strategy, with key goals coming from powerful counter-attacks and precision passing.`
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

export default Hocacheivement;
