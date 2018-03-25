import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking } from "react-native";
import axios from "axios";
import Expo from "expo";
import Header from "../HeaderFooter/Header";
import { Card } from "react-native-elements";
import Button from "../General/Button";
import CardSection from "./CardSection";
import CardContain from "./CardContain";
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
      <CardContain>
        <Card>
          <CardSection>
            <View>
              <Text>No more events to go through!</Text>
              <Button>"Get more!"</Button>
            </View>
          </CardSection>
        </Card>
      </CardContain>
    );
  }

  render() {
    return (
      <View>
      <Header />
      <View style={styles.container}>
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
  main: {
    flex: 1
  }
});
