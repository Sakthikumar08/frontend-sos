import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/shuttleacheive/win1.jpeg";
import win2 from "./assets/shuttleacheive/win2.jpeg";
import win3 from "./assets/shuttleacheive/win3.jpeg";
import win4 from "./assets/shuttleacheive/win4.jpeg";
import win5 from "./assets/shuttleacheive/win5.jpeg";
import win6 from "./assets/shuttleacheive/win6.jpeg";






const Shtacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Shuttle Champions"
      Our shuttle team delivered a flawless performance to win the district-level shuttle championship. The captain's leadership and tactical plays, along with a solid defense, ensured an undefeated tournament.`
    },
    
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College Shuttle League"
      Our shuttle team dominated the Inter-College League, overcoming strong opponents to claim the championship title. The final match saw brilliant smashes and relentless defense that secured a narrow victory in the last moments of the game.`
    },
    
    {
      imgSrc: win3,
      text: `"Triumphant in the State Shuttle Championship"
      The team claimed first place in the state-level shuttle championship, defeating the reigning champions in a nail-biting final. Exceptional teamwork, tactical precision, and perfect finishing made this victory unforgettable.`
    },
    
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
      Facing top teams from across the nation, our shuttle team reached the finals of the National Sports Meet. Though we finished second, the team displayed exceptional talent, resilience, and sportsmanship, earning the respect of opponents and spectators alike.`
    },
    
    {
      imgSrc: win5,
      text: `"Victory at the Collegiate Shuttle Championship"
      In a highly anticipated collegiate shuttle championship, our team clinched the trophy with a commanding 3-1 victory. The final match was a testament to our team's strategy, with key smashes and quick reflexes.`
    },
    
    {
      imgSrc: win6,
      text: `"Victory at the Regional Shuttle Cup"
      Our shuttle team triumphed in the Regional Shuttle Cup, defeating tough opponents in a highly competitive tournament. The final match was decided by a late match-winning point, securing a hard-fought victory and a memorable championship win.`
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

export default Shtacheivement;
