import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Swipeout from "react-native-swipeout";
import Card from "./Card";
import CardSection from "./CardSection";

var baseURL = "https://startupweeknavigator.herokuapp.com/startupcards/";

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      toggle: false
    };
  }

  componentWillMount() {
    axios
      .get(baseURL)
      .then(response => this.setState({ cards: response.data.startupcards }));
  }

  renderDescription = card => {
    if (this.state.toggle) {
      return (
        <View style={styles.descriptionContainer}>
          <Text style={styles.cardDescriptionStyle}>{card.note}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  _onPress() {
    this.setState({ toggle: !this.state.toggle });
  }

  rendercards(card) {
    return this.state.cards.map(card => (
      <Card key={card.id}>
        <CardSection>
          <View style={styles.containerStyle}>
            <View>
              <Text style={styles.cardNumStyle}>{card.priority}</Text>
            </View>
            <View>
              <Image
                style={styles.cardImageStyle}
                source={{ uri: card.image }}
              />
            </View>

            <View>
              <View>
                <Text style={styles.cardInfoStyle}>{card.category}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this._onPress(card)}
                style={styles.descriptionButton}
              >
                <Text style={styles.textStyle}>Tap to See Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardSection>
        <View>{this.renderDescription(card)}</View>
      </Card>
    ));
  }

  render() {
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
  },
  containerStyle: {
    backgroundColor: "#dce2e2",
    flexDirection: "row",
    flex: 1,
    flexWrap: "nowrap",
    alignItems: "center"
  },
  cardNumStyle: {
    fontSize: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingRight: 15,
    color: "#105b57",
    fontWeight: "bold"
  },
  cardImageStyle: {
    height: 100,
    width: 100,
    margin: 10,
    marginLeft: 0,
    borderWidth: 5,
    borderRadius: 4,
    borderColor: "#105b57"
  },
  cardInfoStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#105b57"
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
    borderTopWidth: 0,
  },
  cardDescriptionStyle: {
    flexWrap: "wrap",
    flex: 1,
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
});
