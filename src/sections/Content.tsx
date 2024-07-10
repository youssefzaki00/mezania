import React from "react";
import Description from "./Description.js";
import Calculation from "./Calculation.js";

function Content() {
  return (
    <article className="home__content">
      <Description />
      <Calculation />
    </article>
  );
}

export default Content;
