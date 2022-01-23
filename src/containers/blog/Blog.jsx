import React from "react";
import Article from "../../components/article/Article";
import { blog0, blog02 } from "./imports";
import "./blog.css";

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">
        A lot is happening, <br />
      </h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article
          imgUrl={blog0}
          date=""
          text="  80 Introduction to The High Roller Suite & the First 10 High Roller Suite Coins Will be up for auction, Only to those members who have a total of 3 or more Puffers."
        />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article
          imgUrl={blog02}
          date=""
          text="Opening of The High Roller Suite & the release of 2000 High Roller Puffers, Only available to members of the High Roller Suite."
        />
        <Article
          imgUrl={blog0}
          date=""
          text="Release of 250 Cross Strain Puffers, leaving 250 spots left for exclusive puffer members to come together and customize"
        />
      </div>
    </div>
  </div>
);

export default Blog;
