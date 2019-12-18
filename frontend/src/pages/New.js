import React, { Component } from "react";
import api from "../services/api";

import "./New.css";

export default class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-post">
        <input type="file" name="image" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Post's author"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Post's place"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Post's Description"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Post's Hashtags"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}
