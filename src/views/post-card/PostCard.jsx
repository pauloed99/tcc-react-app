import axios from "axios";
import React, { useContext, useState } from "react";
import { newContext } from "../../context/context";
import styles from "./postCard.module.css";

const PostCard = (props) => {
  const { setPosts } = useContext(newContext); 

  const [editFormState, setEditFormState] = useState({
    title: props.props.title,
    author: props.props.author,
  });  

  const baseUrl = 'http://localhost:3000/posts/';

  function titleFieldChange(e) {
    setEditFormState({...editFormState, title: e.target.value});
  }

  function authorFieldChange(e) {
    setEditFormState({...editFormState, author: e.target.value});
  }

  async function updatePost(e) {
    e.preventDefault();
    await axios.put(
        `${baseUrl}` + props.props.id,
        editFormState
    );

    const responseTwo = await axios.get(baseUrl);

    setPosts(responseTwo.data);
  }  

  async function deletePost(e) {
    e.preventDefault();
    await axios.delete(`${baseUrl}` + props.props.id);

    const responseTwo = await axios.get(baseUrl);

    setPosts(responseTwo.data);
  }

  return (
    <div className={`card ${styles.myCustomClassName}`} style={{ width: "18rem", marginTop: '2rem' }} id={styles.container}>
      <div className="card-body">
        <form className={styles.editForm}>
          <label>Title:</label>
          <input type="text" value={editFormState.title} onChange={(e) => titleFieldChange(e)}/>
          <label>Author:</label>
          <input type="text" value={editFormState.author} onChange={(e) => authorFieldChange(e)}/>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "1rem" }}
            onClick={(e) => updatePost(e)}
          >
            Atualizar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: "1rem" }}
            onClick={(e) => deletePost(e)}
          >
            Deletar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
