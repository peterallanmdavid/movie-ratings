import React from "react";
import MoviesAccordion from "./components/MovieAccordion";

const App: React.FC = () => {
  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-5 ">Movies Ratings</h1>
      <MoviesAccordion />
    </div>
  );
};

export default App;
