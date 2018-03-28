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
import Swipeout from "react-native-swipeout";
import axios from "axios";
import Expo, { Constants } from "expo";
import Button from "../General/Button";
import Card from "../General/Card";
import CardSection from "../General/CardSection";

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
        style={styles.buttonStyle}
      >
        <Text style={styles.textRedStyle}> Swipe to Delete Event </Text>
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
      <Card key={event.id} style={styles.containerStyle}>
        <CardSection>
        <View style={styles.containerStyle}>
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
            <View >
            <View>{this.renderSwipe(event.id)}</View>
            <TouchableOpacity
              onPress={() => this._onPress(event)}
              style={styles.buttonStyle}
            >
              <Text style={styles.textGreenStyle}>Tap to See Note</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </CardSection>
        <View>{this.renderDescription(event)}</View>
      </Card>
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderAgenda()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#b8c9c8",
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#d6d7da",
  },  containerStyle: {
      backgroundColor: "#dce2e2",
      flexDirection: "row",
      flex: 1,
      flexWrap: "nowrap",
      alignItems: "center"
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
  buttonStyle: {
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#d6d7da",
    marginBottom: 5,
    marginLeft: 35,
    backgroundColor: "#FFFFFF"
  },
  descriptionContainer: {
    flexDirection: "row",
    backgroundColor: "#287573",
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
  textGreenStyle: {
    color: "#287573",
    fontSize: 17,
    fontWeight: "800",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "right",
    paddingRight:3

  },
  textRedStyle: {
    color: "#842525",
    fontSize: 17,
    fontWeight: "800",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "right",
    paddingRight:3

  }
};
