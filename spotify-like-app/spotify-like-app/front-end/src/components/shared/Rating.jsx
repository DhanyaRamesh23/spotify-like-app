import React, { useState } from "react";

import "../styles/rating.css";
export default function Rating({
  canRate = false,
  rating = 0,
  submitRateHandler,
  maxRating = 5,
}) {
  const [localRating, setLocalRating] = useState(rating);
  const HandleMouseEnter = (id) => {
    setLocalRating(id + 1);
  };

  const HandleMouseExit = () => {
    setLocalRating(0);
  };

  const HandleMouseClick = (id) => {
    submitRateHandler(id + 1); //Submitting the rate
  };
  const StarsToDisplay = () => {
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      if (canRate) {
        stars.push(
          <Star
            canCheck={true}
            checked={i < localRating}
            key={i}
            id={i}
            mouseEnterHandler={HandleMouseEnter}
            mouseClickHandler={HandleMouseClick}
          />
        );
      } else {
        let star;
        star = <Star checked={i < rating} key={i} id={i} />;
        stars.push(star);
      }
    }

    return stars;
  };
  return (
    <div className="rating">
      <div className="rating-stars" onMouseLeave={HandleMouseExit}>
        {StarsToDisplay().map((star) => star)}
      </div>
    </div>
  );
}

function Star({
  checked = false,
  canCheck = false,
  mouseEnterHandler,
  mouseClickHandler,
  id,
}) {
  if (canCheck) {
    return (
      <span
        className={"pointer fa fa-star" + (checked ? " checked" : "")}
        onMouseEnter={() => mouseEnterHandler(id)}
        onClick={() => mouseClickHandler(id)}
      ></span>
    );
  } else {
    return <span className={"fa fa-star" + (checked ? " checked" : "")}></span>;
  }
}
