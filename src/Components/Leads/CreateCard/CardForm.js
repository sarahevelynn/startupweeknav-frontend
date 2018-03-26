import React, { Component } from "react";
import { View, TextInput, Picker, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import { ImagePicker } from "expo";
import Button from "../../General/Button";

class NoteText extends Component {
  render() {
    return <TextInput {...this.props} editable={true} maxLength={400} />;
  }
}

const baseURL = "https://startupweeknavigator.herokuapp.com/startupcards";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: 1,
      catagory: "I can help them",
      note: "special note here",
      image: null,
      cards: []
    };
  }

getData = () => {
  axios({
    method: "GET",
    url: baseURL
  })
    .then(response => this.setState({ cards: response.data.startupcards }))
    .catch(err => console.error(err));
};

  sendInfo = () => {
    axios
      .post(baseURL, {
        priority: this.state.priority,
        category: this.state.category,
        note: this.state.note,
        image: this.state.image
      })
      .then(console.log(this.state))
      .catch(err => console.log(err))
      .then(this.getData());
  };

  render() {
    let { image } = this.state;

    return (
      <View >
        <View>
          <Text style={styles.textStyle}> Assign Priority to Contact </Text>
          <Picker
            style={styles.PickerStyle}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.priority}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ priority: itemValue })
            }
          >
            <Picker.Item label="1-High Priority" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5-Low Priority" value={5} />
          </Picker>
        </View>

        <View>
          <Text style={styles.textStyle}> Assign Category to Contact </Text>
          <Picker
            style={styles.PickerStyle}
            itemStyle={styles.itemStyle}
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label="I can help them" value="I can help them" />
            <Picker.Item label="They can help me" value="They can help me" />
            <Picker.Item
              label="Good general contact"
              value="Good general contact"
            />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <View>
          <Text style={styles.textStyle}> Leave Note about Contact </Text>
          <NoteText
            style={styles.noteTextStyle}
            multiline={true}
            onChangeText={note => this.setState({ note })}
            value={this.state.note}
          />
        </View>

        <View>
          <Text style={styles.textStyle}> Attach their card picture </Text>
          <Button onPress={this._pickImage} >
            Pick an image from camera roll
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </Button>
        </View>

        <View>
          <Text style={styles.textStyle}> Add Contact to Database </Text>
          <View>
            <Button onPress={() => this.sendInfo()}>
              <Text>Add</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: "https://s3-us-west-1.amazonaws.com/startupweekcards/card8.jpeg" });
    }
  };
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20
  },
  PickerStyle: {
    height: 44
  },
  itemStyle: { height: 44 },
  noteTextStyle: {
    height: 80,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#063835",
    fontSize: 20
  }
});
