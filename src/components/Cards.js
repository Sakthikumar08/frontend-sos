import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Cards.css';

const Cards = (props) => {
  const navigate = useNavigate();

  // Function to handle the "View More" button click
  const handleViewMore = () => {
    const routePath = `/${props.name.toLowerCase().replace(' ', '')}`; // Generates the correct route
    navigate(routePath);
  };

  return (
    <div className="categoryWrapper" style={{ backgroundImage: `url(${props.image})`, cursor: 'pointer' }}>
      <h1>{props.name}</h1>
      <button onClick={handleViewMore}> 
        <span>
          <span>
            <span data-attr-span="View More">View More</span>
          </span>
        </span>
        <p>{props.para}</p>
      </button>
    </div>
  );
};

export default Cards;
