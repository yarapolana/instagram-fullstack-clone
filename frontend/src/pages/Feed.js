import React, { Component } from "react";
import io from "socket.io-client";

import api from "../services/api";

import comment from "../assets/comment.svg";
import like from "../assets/like.svg";
import send from "../assets/send.svg";
import more from "../assets/more.svg";

import "./Feed.css";

export default class Feed extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("/posts");

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", likePost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likePost._id ? likePost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="More" />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt={post.author}
            />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="Like" />
                </button>
                <button type="button">
                  <img src={comment} alt="Comment" />
                </button>
                <button type="button">
                  <img src={send} alt="Send" />
                </button>
              </div>
              <strong>{post.likes} likes</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}
