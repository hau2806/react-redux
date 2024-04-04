import React from "react";
import lisaImage from "./comming-soon.png";

const Review = () => {
  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-md-6">
          <img className="img-fluid" src={lisaImage} alt="Comming soon" />
        </div>
      </div>
    </div>
  );
};

export default Review;
