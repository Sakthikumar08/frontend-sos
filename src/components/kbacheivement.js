import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/kabaddiacheive/win1.jpeg";
import win2 from "./assets/kabaddiacheive/win2.jpeg";
import win3 from "./assets/kabaddiacheive/win3.jpeg";
import win4 from "./assets/kabaddiacheive/win4.jpeg";
import win5 from "./assets/kabaddiacheive/win5.jpeg";
import win6 from "./assets/kabaddiacheive/win6.jpeg";
import win7 from "./assets/kabaddiacheive/win7.jpeg";
import win8 from "./assets/kabaddiacheive/win8.jpeg";
import win9 from "./assets/kabaddiacheive/win9.jpeg";
import win10 from "./assets/kabaddiacheive/win10.jpeg";




const Kbacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Kabaddi Champions"
      Our kabaddi team delivered a flawless performance to win the district-level kabaddi championship. The team's captain led with tactical plays, and the defense held strong to ensure an undefeated tournament.`
    },
    
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College Kabaddi League"
      Our kabaddi team dominated the Inter-College League, overcoming formidable opponents to claim the championship title. The final match saw brilliant tackles and relentless defense that secured victory in the last moments of the game.`
    },
    
    {
      imgSrc: win3,
      text: `"Triumphant in the State Kabaddi Championship"
      The team claimed first place in the state-level kabaddi championship, defeating the previous year’s champions in an electrifying match. Exceptional teamwork and strategic raids made this victory unforgettable.`
    },
    
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Kabaddi Meet"
      Facing the top teams from across the nation, our kabaddi team reached the finals of the National Sports Meet. Despite finishing second, the team displayed exceptional talent and left a lasting impression on fans and rivals alike.`
    },
    
    {
      imgSrc: win5,
      text: `"Victory at the Collegiate Kabaddi Championship"
      In a much-anticipated collegiate kabaddi championship, our team clinched the trophy with a commanding performance. The final match was a testament to our team's strategy, with key points coming from powerful raids and exceptional defense.`
    },
    
    {
      imgSrc: win6,
      text: `"Victory at the National Kabaddi Tournament"
      Our kabaddi team triumphed at the National Kabaddi Tournament, showcasing impressive teamwork and resilience. The victory was marked by a series of dominant raids and solid defensive strategies that overwhelmed the opposition.`
    },
    
    {
      imgSrc: win7,
      text: `"Achieved first place in the District Kabaddi Championship"
      Our team exhibited outstanding skill and coordination to clinch first place in the district championship. The final match was a thrilling contest, with key raids securing the victory for the team.`
    },
    
    {
      imgSrc: win8,
      text: `"State Kabaddi Championship Victory"
      The team dominated the state-level kabaddi championship, outclassing their opponents with powerful raids and an impenetrable defense that left the competition in the dust.`
    },
    
    {
      imgSrc: win9,
      text: `"Runners-Up in the Inter-College Kabaddi Tournament"
      The final match of the inter-college kabaddi tournament was an intense battle, with our team showing immense determination and skill, eventually finishing as the runners-up.`
    },
    
    {
      imgSrc: win10,
      text: `"National Kabaddi Championship Finals"
      Our team reached the finals of the National Kabaddi Championship, displaying top-level kabaddi skills and resilience. Their journey through the tournament was a testament to their hard work and passion for the game.`
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
    {/*   <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        Add
      </button> */}
      <button className="add-match-button" onClick={() => setIsModalOpen(true)}>+</button>

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

export default Kbacheivement;
