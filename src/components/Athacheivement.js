import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/atheleticsacheive/win1.jpeg";
import win2 from "./assets/atheleticsacheive/win2.jpeg";
import win3 from "./assets/atheleticsacheive/win3.jpeg";
import win4 from "./assets/atheleticsacheive/win4.jpg";

const Athacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Athletics Champion"
      Our athlete delivered an exceptional performance to win the district-level athletics competition. With a flawless sprint and impeccable technique, they secured the gold in the 100-meter race, setting a new personal best.`
    },
    {
      imgSrc: win2,
      text: `"Champion of the Inter-College Athletics Meet"
      The athlete triumphed in the highly competitive Inter-College Athletics Meet. Their endurance and speed in the 1500-meter race helped them clinch the gold medal, breaking a long-standing record in the process.`
    },
    {
      imgSrc: win3,
      text: `"Triumphant in the State Athletics Championship"
      Our athlete dominated the state-level championship in the long jump, achieving an outstanding leap that surpassed their own record. Their dedication and hard work paid off, earning them first place in a thrilling competition.`
    },
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Athletics Meet"
      Competing at the National Athletics Meet, our athlete came in second place in the high jump event. Despite fierce competition, their consistent form and excellent technique allowed them to finish as the runner-up, earning widespread admiration.`
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

export default Athacheivement;
