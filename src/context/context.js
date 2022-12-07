import { createContext, useState } from "react";

export const newContext = createContext();

export const NewProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const value = {
        posts, // The state itself
        setPosts, // The state update function
    }
    return (
      <newContext.Provider value={value}>
        {props.children}
      </newContext.Provider>
    )
  }