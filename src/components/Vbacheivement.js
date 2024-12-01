import React, { useState } from "react";
import "./Sports.css";
import win1 from "./assets/volleyballacheive/win1.jpeg";
import win2 from "./assets/volleyballacheive/win2.jpeg";
import win3 from "./assets/volleyballacheive/win3.jpeg";
import win4 from "./assets/volleyballacheive/win4.jpeg";
import win5 from "./assets/volleyballacheive/win5.jpeg";
import win6 from "./assets/volleyballacheive/win6.jpeg";
import win7 from "./assets/volleyballacheive/win7.jpeg";
import win8 from "./assets/volleyballacheive/win8.jpeg";
import win9 from "./assets/volleyballacheive/win9.jpeg";
import win10 from "./assets/volleyballacheive/win10.jpeg";
import win11 from "./assets/volleyballacheive/win11.jpeg";



const Vbacheivement = () => {
  const [items, setItems] = useState([
    { imgSrc: win1, text: "The FIVB Men's Volleyball World Championship is an international volleyball competition contested by the senior men's national teams of the members of Fédération Internationale de Volleyball (FIVB), the sport's global governing body. The initial gap between championships was variable, but since 1962, they were held every four years. The tournament will be held biennially starting in 2025." },
    { imgSrc: win2, text: `"Champions of the University League"
Our team emerged victorious in the highly competitive University League Championship, defeating the defending champions in a thrilling five-set match. The players demonstrated extraordinary stamina and teamwork, turning the game around in the final moments to secure a memorable win.` },
    { imgSrc: win3, text: `"Triumphant in the Inter-State Tournament"
The team claimed first place in the inter-state volleyball tournament, which featured some of the best players from across the region. The semifinal match, lasting over two hours, showcased brilliant strategy, with the decisive points coming from perfectly executed spikes and blocks.` },
    { imgSrc: win4, text: `"Runners-Up at the National Sports Meet"
Competing against elite teams from across the nation, our team reached the finals of the National Sports Meet. Though we fell just short of the title, the tournament highlighted the players' dedication and their ability to adapt under pressure, winning the admiration of spectators and opponents alike.` },
    { imgSrc: win5, text: `"District Volleyball Champions"
The team's performance in the district-level championship was nothing short of spectacular, as they dominated every match without losing a single set. The final saw our captain lead by example, with pinpoint serves and decisive finishes that sealed the trophy.` },
    { imgSrc: win6, text: `"Victory at the Collegiate Sports Fest"
In a highly anticipated sports fest hosted by a neighboring college, our team clinched the volleyball championship. The final match was a masterclass in resilience, with our players overturning a two-set deficit to claim victory in the final set with a razor-thin margin of 15-13.` },
    { imgSrc: win7, text: "Achieved first place in the district volleyball championship. The players displayed exceptional skills, clinching the victory with a 3-2 score." },
    { imgSrc: win8, text: "Victory in the state-level championship with a dominating performance against top teams. This match was a testament to the team's strategy and skill on the court." },
    { imgSrc: win9, text: "Secured runners-up position in the inter-college volleyball tournament. The final match saw a nail-biting finish, with our team showcasing remarkable sportsmanship." },
    { imgSrc: win10, text: "Competing against elite teams from across the nation, our team reached the finals of the National Sports Meet. Though we fell just short of the title, the tournament highlighted the players' dedication and their ability to adapt under pressure, winning the admiration of spectators and opponents alike." },
    { imgSrc: win11, text: "The team's performance in the district-level championship was nothing short of spectacular, as they dominated every match without losing a single set. The final saw our captain lead by example, with pinpoint serves and decisive finishes that sealed the trophy." }
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

export default Vbacheivement;
