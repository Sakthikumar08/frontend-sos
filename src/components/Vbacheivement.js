import React, { useState, useEffect } from 'react';
import './Sports.css';
import axios from 'axios';

const Vbacheivement = () => {
  const API_URL = "https://backend-spotligth-on-sports.onrender.com";
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImg, setNewImg] = useState('');
  const [newText, setNewText] = useState('');

  // Fetch achievements from the backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/vbachievements`);
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
        const response = await axios.post(`${API_URL}/api/vbachievements`, {
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
      await axios.delete(`${API_URL}/api/vbachievements/${id}`);
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

export default Vbacheivement;
