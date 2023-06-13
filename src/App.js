import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Search from "./pages/search"
import History from "./pages/history"
import NavBar from "./components/navBar"

import { UserContext } from "./appContext";

import './App.scss';

function App() {
  const [words, setWords] = useState([]);

  const registerWord = (word) => {
    setWords([...words, word]);
  };

  const cleanRegister = () => {
    setWords([])
  };

  return (
    <div className="App"> 
      <div className="container">
        <UserContext.Provider
              value={{
                  words: words,
                  registerWord: registerWord,
                  cleanRegister: cleanRegister,
              }}
          >
          <Router>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Search />} />
              <Route exact path="history" element={<History />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}
export default App;