import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/footballacheive/win1.jpeg";
import win2 from "./assets/footballacheive/win2.jpeg";
import win3 from "./assets/footballacheive/win3.jpeg";
import win4 from "./assets/footballacheive/win4.jpeg";
import win5 from "./assets/footballacheive/win5.jpeg";
import win6 from "./assets/footballacheive/win6.jpeg";
import win7 from "./assets/footballacheive/win7.jpeg";





const Fbacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Football Champions"
      Our football team delivered a flawless performance to win the district-level football championship. The captain's leadership and tactical plays, along with a solid defense, ensured an undefeated tournament.`
    },
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College League"
      Our football team dominated the Inter-College League, overcoming strong opponents to claim the championship title. The final match saw brilliant goals and relentless defense that secured a narrow victory in the last minutes of the game.`
    },
    {
      imgSrc: win3,
      text: `"Triumphant in the State Football Championship"
      The team claimed first place in the state-level football championship, defeating the reigning champions in a nail-biting final. Exceptional teamwork, tactical precision, and perfect finishing made this victory unforgettable.`
    },
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
      Facing top teams from across the nation, our football team reached the finals of the National Sports Meet. Though we finished second, the team displayed exceptional talent, resilience, and sportsmanship, earning the respect of opponents and spectators alike.`
    },
    {
      imgSrc: win5,
      text: `"Victory at the Collegiate Football Championship"
      In a highly anticipated collegiate football championship, our team clinched the trophy with a commanding 3-1 victory. The final match was a testament to our team's strategy, with key goals coming from powerful counter-attacks and precision passing.`
    },
    {
      imgSrc: win6,
      text: `"Victory at the Regional Football Cup"
      Our football team triumphed in the Regional Football Cup, defeating tough opponents in a highly competitive tournament. The final match was decided by a late penalty goal, securing a hard-fought victory and a memorable championship win.`
    },
    {
      imgSrc: win7,
      text: `"District Football Championship Win"
      The team clinched the district football championship with a dominant 4-0 victory in the finals. Strong offensive plays and an unbreakable defense secured the title and solidified our team as the best in the region.`
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

export default Fbacheivement;
