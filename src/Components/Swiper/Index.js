import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import axios from "axios";
import Expo from "expo";
import Header from "../HeaderFooter/Header";
import { Card } from "react-native-elements";
import Button from "../General/Button";
import GenerateButton from "../General/GenerateButton";
import CardSection from "../General/CardContain";
import CardContain from "../General/CardContain";
import EventDeck from "./EventDeck";
import EventCard from "./EventCard";

var baseURL = "https://startupweeknavigator.herokuapp.com/";

export default class SwipeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventName: "",
      eventDescription: "",
      date: "",
      time: "",
      register: "",
      tickets: "",
      address: "",
      image: ""
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    axios
      .get(baseURL)
      .then(response => this.setState({ events: response.data.startupevents }));
  };

  renderCard(event) {
    return (
      <View>
        <EventCard key={event.id} event={event} />
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <View>
        <CardContain>
          <Card
            key={"noMore"}
            title="No more events to go through!"
            image={require("./startups.jpg")}
          >
            <CardSection>
              <Text>To go back through events you have previously swiped left on, click the button below. If not, check out your agenda or add some leads. </Text>
            </CardSection>

            <CardSection>
              <GenerateButton>
                Generate More
              </GenerateButton>
            </CardSection>
          </Card>
        </CardContain>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Header />
        <View style={styles.container}>
        <Text style={styles.textStyle}>Startup Week Navigator</Text>
          <EventDeck
            data={this.state.events}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8c9c8"
  },
  textStyle: {
    fontSize: 30,
    textAlign: "center",
    color: "#00505e",
    fontWeight: "600"
  }
});
