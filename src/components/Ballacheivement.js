import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/ballbadmintonacheive/win1.jpeg";
import win2 from "./assets/ballbadmintonacheive/win2.jpeg";
import win3 from "./assets/ballbadmintonacheive/win3.jpeg";
import win4 from "./assets/ballbadmintonacheive/win4.jpeg";

const Ballacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Ball Badminton Champions"
    Our team showcased unmatched skill and coordination to win the district-level ball badminton championship. The captain's strategic leadership and precise smashes ensured a clean sweep throughout the tournament.`
    },
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College League"
    The ball badminton team triumphed in the highly competitive Inter-College League. Exceptional court coverage and powerful drives in the final match secured a hard-fought victory against strong opponents.`
    },
    {
      imgSrc: win3,
      text: `"Triumphant in the State Ball Badminton Championship"
    The team clinched the state-level championship with a remarkable display of agility and teamwork. Facing the previous year’s champions, they dominated the court, delivering a spectacular performance in the final sets.`
    },
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
    Competing against the nation's best teams, our ball badminton team earned the runners-up position in the National Sports Meet. Their relentless efforts and sharp reflexes throughout the tournament won the hearts of spectators and opponents alike.`
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

export default Ballacheivement;
