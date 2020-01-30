import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import api from "../services/api";

import { styles } from "./styles";

export default class New extends Component {
  static navigationOptions = {
    headerTitle: "New post"
  };

  state = {
    preview: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker({ title: "Select Image" }, upload => {
      if (upload.error) {
        console.log("Error Uploading Image");
      } else if (upload.didCancel) {
        console.log("User canceled upload");
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${upload.data}`
        };

        let prefix;
        let ext;

        if (upload.fileName) {
          [prefix, ext] = upload.fileName.split(".");
          ext = ext.toLowerCase() === "heic" ? "jpg" : ext;
        } else {
          prefix = new Date().getTime();
          ext = "jpg";
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`
        };
        this.setState({ preview, image });
      }
    });
  };

  handleSubmit = async () => {
    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.navigation.navigate("Feed");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}
        >
          <Text style={styles.selectButtonText}> Select Image </Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Post's author"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Post's place"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Post's description"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Post's hashtags"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity style={styles.postButton} onPress={this.handleSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
