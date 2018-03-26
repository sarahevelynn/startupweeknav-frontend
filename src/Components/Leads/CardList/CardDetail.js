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
        <View style={styles.containerStyle}>
          <View style={styles.cardImageContainerStyle}>
            <Image style={styles.cardImageStyle} source={{ uri: card.image }} />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.cardTitleStyle}> {card.note} </Text>
          </View>
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

            <View style={styles.cardContentStyle}>
              <View>
                <Text style={styles.cardInfoStyle}>{card.category}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this._onPress(card)}
                style={styles.descriptionButton}
              >
                <Text> Tap to Expand Information </Text>
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
    marginTop: 5
  },
  containerStyle: {
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
    paddingRight: 15
  },
  cardImageStyle: {
    height: 100,
    width: 100,
    margin: 15,
    borderWidth: 5,
    borderColor: "#41918d"
  },
  cardContentStyle: {
    flexDirection: "column",
    flexWrap: "wrap"
  },
  cardInfoStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionButton: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#063835",
    marginLeft: 5,
    marginRight: 5,
  },
  cardTitleStyle: {
    flexWrap: "wrap",
    paddingBottom: 10,
    flex: 1,
  }
});
