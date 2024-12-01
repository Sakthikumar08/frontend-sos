import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/basketballacheive/win1.jpeg";
import win2 from "./assets/basketballacheive/win2.jpeg";
import win3 from "./assets/basketballacheive/win3.jpeg";
import win4 from "./assets/basketballacheive/win4.jpeg";
import win5 from "./assets/basketballacheive/win5.jpeg";
import win6 from "./assets/basketballacheive/win6.jpeg";
import win7 from "./assets/basketballacheive/win7.jpeg";
import win8 from "./assets/basketballacheive/win8.jpg";
import win9 from "./assets/basketballacheive/win9.jpeg";
import win10 from "./assets/basketballacheive/win10.jpeg";




const Basacheivement = () => {
  const [items, setItems] = useState([
    {
      imgSrc: win1,
      text: `"District Basketball Champions"
  Our players delivered a flawless performance to win the district-level basketball championship. The teams captain led with strategic plays, and the defense held strong to ensure an undefeated tournament.`
    },
    
    {
      imgSrc: win2,
      text: `"Champions of the Inter-College League"
  Our basketball team dominated the Inter-College League, overcoming formidable opponents to claim the championship title. The final game saw brilliant three-pointers and relentless defense that secured victory in the last quarter.`
    },
    {
      imgSrc: win3,
      text: `"Triumphant in the State Basketball Championship"
  The team claimed first place in the state-level championship, defeating the previous year’s winners in an electrifying game. Exceptional teamwork and precise shooting made this victory unforgettable.`
    },
    {
      imgSrc: win4,
      text: `"Runners-Up at the National Sports Meet"
  Facing the top teams from across the nation, our basketball team reached the finals of the National Sports Meet. Despite finishing second, the team displayed exceptional talent and left a lasting impression on fans and rivals alike.`
    },
    {
      imgSrc: win5,
      text: "The FIBA Men's Basketball World Cup is an international basketball competition contested by the senior men's national teams of the members of Fédération Internationale de Basketball (FIBA). Held every four years, it showcases the finest basketball talent globally, with thrilling matches that define excellence in the sport."
    },
    {
      imgSrc: win6,
      text: `"Victory at the Collegiate Sports Fest"
  In a much-anticipated collegiate sports fest, our basketball team clinched the championship trophy. The game was decided in the final seconds, with a buzzer-beater shot that sealed a thrilling victory.`
    },
    {
      imgSrc: win7,
      text: "Achieved first place in the district basketball championship. With sharp shooting and tactical gameplay, the team clinched a decisive 85-78 win in the finals."
    },
    {
      imgSrc: win8,
      text: "Secured a state-level championship victory, overpowering rivals with a dominating performance. The team's quick ball movement and solid defense were key to their success."
    },
    {
      imgSrc: win9,
      text: "Runners-up in the inter-college basketball tournament. The final game was an intense battle, with our team showing resilience and determination until the last buzzer."
    },
    {
      imgSrc: win10,
      text: "The team reached the finals of the National Basketball Championship, showcasing their ability to compete at the highest level. Their journey was a testament to their skill, hard work, and passion for the game."
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

export default Basacheivement;
