import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Cards.css';

const Cards = (props) => {
  const navigate = useNavigate(); // Create a navigate function

  // Function to handle the "View More" button click
  const handleViewMore = () => {
    // Create a route based on the sport's name
    const routePath = `/${props.name.toLowerCase().replace(' ', '')}`;
    navigate(routePath); // Navigate to the specific sport's route
  };

  return (
    <div className="categoryWrapper" style={{ backgroundImage: `url(${props.image})`, cursor: 'pointer' }}>
      <h1>{props.name}</h1>
      <button onClick={handleViewMore}> {/* Attach click handler */}
        <span>
          <span>
            <span data-attr-span="View More">
              View More
            </span>
          </span>
        </span>
        <p>{props.para}</p>
      </button>
    </div>
  );
};

export default Cards;
