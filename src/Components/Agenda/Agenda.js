import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  ScrollView,
  Image,
  Linking
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
      agenda: []
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
        backgroundColor: "red",
        onPress: () => {
          this.deleteEvent(eventId);
        }
      }
    ];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor="transparent"
        style={styles.deleteSwipe}
      >
        <Text style={styles.swipeButtonStyle}> Swipe to Delete Event </Text>
      </Swipeout>
    );
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
            <View>{this.renderSwipe(event.id)}</View>
          </View>
        </View>
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
  }
};
