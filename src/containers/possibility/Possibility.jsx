import React from "react";
import possibilityImage from "../../assets/possibility.png";
import "./possibility.css";

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h4>Give Away</h4>
      <h1 className="gradient__text">
        The possibilities are <br /> you won a PS5
      </h1>
      <p>
        One Lucky Puffers Club Member will be chosen at random to receive a Sony
        PlayStation 5
      </p>
    </div>
  </div>
);

export default Possibility;
