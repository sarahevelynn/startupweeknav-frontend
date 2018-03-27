import React, { Component } from "react";
import { View, TextInput, Picker, Text, Image, StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";
import axios from "axios";
import { ImagePicker } from "expo";
import Button from "../../General/Button";

class NoteText extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        editable={true}
        maxLength={400}
        returnKeyType="done"
      />
    );
  }
}

const baseURL = "https://startupweeknavigator.herokuapp.com/startupcards";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: 0,
      catagory: "",
      note: "Sounds like a great sustainability lead!",
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
    const priorityButtons = [1, 2, 3, 4, 5];
    const categoryButtons = ["I can help them", "They can help me", "General contact", "Other"];

    return (
      <View>
        <View>
        <Text style={styles.textStyle}> Assign Priority to Contact </Text>
          <ButtonGroup
            onPress={(itemValue, itemIndex) =>
              this.setState({ priority: itemValue })
            }
            buttons={priorityButtons}
            containerStyle={{ height: 40 }}
          />
        </View>

        <View>
        <Text style={styles.textStyle}> Assign Category to Contact </Text>
        <ButtonGroup
          onPress={(itemValue, itemIndex) =>
            this.setState({ category: itemValue })
          }
          buttons={categoryButtons}
          containerStyle={{ height: 50 }}
          textStyle={{textAlign:"center"}}
          selectedButtonStyle={styles.imageButton}
        />
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
          <Button onPress={this._pickImage}>
            Pick an image from camera roll
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 80,
                  justifyContent: "center"
                }}
              />
            )}
          </Button>
        </View>

        <View style={{ height: 10 }} />
        <View>
          <Button onPress={() => this.sendInfo()}>
            <Text>Add Contact to Database</Text>
          </Button>
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
      this.setState({
        image: "https://s3-us-west-1.amazonaws.com/startupweekcards/card8.jpeg"
      });
    }
  };
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#393a3a"
  },
  PickerStyle: {
    height: 90,
    borderBottomWidth: 2,
    borderColor: "#696b6b"
  },
  itemStyle: { height: 90 },
  noteTextStyle: {
    height: 50,
    borderRadius: 1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#696b6b",
    fontSize: 20
  },
  imageButton: {
    backgroundColor: "green",
  }
});
