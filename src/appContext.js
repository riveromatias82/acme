import React from "react";

export const UserContext = React.createContext({
  words: [],
  registerWord: (word) => {},
  cleanRegister: () => {},
});