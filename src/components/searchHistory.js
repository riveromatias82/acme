import React, { useContext } from "react";
import { UserContext } from "../appContext";

export default function SearchHistory() {
  const context = useContext(UserContext);

  const handleCleanHistory = (e) => {
  	e.preventDefault();
		context.cleanRegister();
  }

  return (
  	<React.Fragment>
      <h2 className="subtitle">History of searched words: <a href="/#" style={{color: "red", fontSize: "1.4rem"}} onClick={(e) => handleCleanHistory(e)}>Clean</a></h2>
      <ul className="words-list">
      {context.words.map((word, index) => (
          <li key={index}>{word}</li>
      ))}
      </ul>
    </React.Fragment>
  );
}