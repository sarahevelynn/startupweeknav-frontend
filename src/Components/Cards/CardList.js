import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import CardDetail from "./CardDetail";

class CardList extends Component {
  state = { cards: [] };

  componentWillMount() {
    axios
      .get("https://startupweeknavigator.herokuapp.com/")
      .then(response => this.setState({ cards: response.data.startupcards }));
  }

  rendercards() {
    return this.state.cards.map(card => (
      <CardDetail key={card.id} card={card} />
    ));
  }

  render() {
    console.log(this.state);

    return (
        <ScrollView style={styles.container}>{this.rendercards()}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b8c9c8",
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#d6d7da",
    marginTop:5
  }
});

export default CardList;
