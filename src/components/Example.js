import React from 'react';
import './Cards.css';

const Example = (props) => {
  return (
    <>
     <div class="categoryWrapper">
    <h1>{props.name}</h1>
    <button>
      <span>
        <span>
          <span data-attr-span="See the Range">
            view More
          </span>
        </span>
      </span>
    </button>
  </div>

    </>
  )
}

export default Example
