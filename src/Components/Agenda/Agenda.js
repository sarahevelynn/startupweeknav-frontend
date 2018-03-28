import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import Expo, { Constants } from "expo";
import Button from "../General/Button";
import Swipeout from "react-native-swipeout";

var baseURL = "https://startupweeknavigator.herokuapp.com/agenda/";

export default class Agenda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agenda: [],
      toggle: false
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    axios
      .get(baseURL)
      .then(response => this.setState({ agenda: response.data.agenda }));
  };

  deleteEvent = id => {
    axios
      .delete(baseURL + id, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify
      })
      .catch(err => console.error(err))
      .then(this.loadData());
  };

  renderSwipe(eventId) {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "#842525",
        color: "white",
        onPress: () => {
          this.deleteEvent(eventId);
        }
      }
    ];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        buttonWidth={60}
        backgroundColor="transparent"
        style={styles.deleteSwipe}
      >
        <Text style={styles.swipeButtonStyle}> Swipe to Delete Event </Text>
      </Swipeout>
    );
  }

  renderDescription = event => {
    if (this.state.toggle) {
      return (
        <View style={styles.descriptionContainer}>
          <Text style={styles.cardDescriptionStyle}>{event.eventDescription}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  _onPress() {
    this.setState({ toggle: !this.state.toggle });
  }

  renderAgenda(event) {
    return this.state.agenda.map(event => (
      <View key={event.id}>
        <View style={styles.eventStyle}>
          <View style={styles.cardImageContainerStyle}>
            <Image
              style={styles.cardImageStyle}
              source={{ uri: event.image }}
            />
          </View>

          <View style={styles.cardContentStyle}>
            <View style={[styles.cardContentStyle, { flexDirection: "row" }]}>
              <Text style={styles.cardTitleStyle}>{event.eventName}</Text>
            </View>

            <Text>{event.date}</Text>
            <Text>{event.time}</Text>
            <TouchableOpacity
              onPress={() => this._onPress(event)}
              style={styles.descriptionButton}
            >
              <Text style={styles.textStyle}>Tap to See Note</Text>
            </TouchableOpacity>
            <View>{this.renderSwipe(event.id)}</View>
          </View>
        </View>
        <View>{this.renderDescription(event)}</View>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView>
        {this.renderAgenda()}
      </ScrollView>
    );
  }
}

const styles = {
  eventStyle: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    borderTopWidth: 4,
    borderColor: "#d6d7da",
    marginTop: 1
  },
  cardImageStyle: {
    height: 100,
    width: 130
  },
  cardImageContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  cardContentStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "stretch"
  },
  cardTitleStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
    flex: 1,
    fontSize: 20,
    fontWeight: "600"
  },
  deleteSwipe: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da",
    alignContent: "stretch",
  },
  swipeButtonStyle: {
    fontSize: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6d7da"
  },

  descriptionButton: {
    backgroundColor: "#cae8e6",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#507573",
    width: 150
  },
  descriptionContainer: {
    flexDirection: "row",
    backgroundColor: "#6d7070",
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#d6d7da",
    borderTopWidth: 0
  },
  cardDescriptionStyle: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "600",
    padding: 5,
    color: "white"
  },
  textStyle: {
    alignSelf: "center",
    color: "#063835",
    fontSize: 17,
    fontWeight: "800",
    paddingTop: 5,
    paddingBottom: 5
  }
};
