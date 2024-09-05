import React from "react";
import MoviesAccordion from "./components/MovieAccordion";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Movies</h1>
      <MoviesAccordion />
    </div>
  );
};

export default App;
