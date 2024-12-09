import React, { useState, useEffect } from 'react';
import './Sports.css';
import axios from 'axios';

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
  const [newImg, setNewImg] = useState('');
  const [newText, setNewText] = useState('');

  // Fetch achievements from the backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/basachievements');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    fetchAchievements();
  }, []);

  // Add a new achievement
  const handleAddItem = async () => {
    if (newImg && newText) {
      try {
        const response = await axios.post('http://localhost:5000/api/basachievements', {
          imgSrc: newImg,
          text: newText,
        });
        setItems([...items, response.data]);
        setNewImg('');
        setNewText('');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error adding achievement:', error);
      }
    } else {
      alert('Both fields are required!');
    }
  };

  // Delete an achievement
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/basachievements/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className="app">
      <h1 className="heading">ACHIEVEMENTS</h1>
      <div className="container">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <img src={item.imgSrc} alt="Achievement" />
            <p>{item.text}</p>
            <button className="delete-btn" onClick={() => handleDeleteItem(item._id)}>
              Delete
            </button>
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
