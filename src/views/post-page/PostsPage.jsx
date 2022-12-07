import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { newContext } from "../../context/context";
import PostCard from "../post-card/PostCard";
import styles from "./postPage.module.css";

const PostPage = () => {
  const { posts, setPosts } = useContext(newContext);

  const baseUrl = 'http://localhost:3000/posts/';

  const [addFormState, setAddFormState] = useState({
    title: '',
    author: '',
  }); 

  async function addPost(e) {
    e.preventDefault();
    await axios.post(
      baseUrl,
      addFormState,
    );

    setAddFormState({title: '', author: ''});

    const response = await axios.get(baseUrl);
    setPosts(response.data);
  }

  function titleFieldChange(e) {
    setAddFormState({...addFormState, title: e.target.value});
  }

  function authorFieldChange(e) {
    setAddFormState({...addFormState, author: e.target.value});
  }

  useEffect(() => {
    async function getPosts() {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    }
    getPosts();
  }, []);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Adicionar Post
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Adição de Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className={styles.addForm}>
                <label>Title:</label>
                <input type="text" value={addFormState.title} onChange={(e) => titleFieldChange(e)}/>
                <label>Author:</label>
                <input type="text" value={addFormState.author} onChange={(e) => authorFieldChange(e)}/>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => addPost(e)}
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        posts.length !== 0 ? posts.map((post) => {
          return (
            <div key={post.id}>
              <PostCard props={post} key={post.id} />
            </div>
          );
        }) : null
      }
    </div>
  );
};

export default PostPage;
