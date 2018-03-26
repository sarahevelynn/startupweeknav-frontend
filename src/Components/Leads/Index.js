import React from "react";
import PropTypes from "prop-types";
import { NavigatorIOS, Text, View, StyleSheet } from "react-native";
import Header from "../HeaderFooter/Header";
import Button from "../General/Button";
import FormIndex from "./CreateCard/Index";
import CardListIndex from "./CardList/Index";

export default class LeadsInex extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: "Leads HomePage",
          passProps: { index: 1 }
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this._addCard = this._addCard.bind(this);
    this._viewLeads = this._viewLeads.bind(this);
  }

  _addCard() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: FormIndex,
      title: "Add a Lead",
      passProps: { index: nextIndex }
    });
  }
  _viewLeads() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: CardListIndex,
      title: "View Your Leads",
      passProps: { index: nextIndex }
    });
  }

  render() {
    return (
      <View>
        <View style={styles.header} />
        <Header style={styles.header} />
        <View style={styles.container}>
          <Text style={styles.title}>Here you can: {this.props.title}</Text>
          <View style={styles.button}>
            <Button onPress={this._addCard}>Take a Picture</Button>
          </View>
          <View style={styles.button}>
            <Button onPress={this._addCard}>Add a Card</Button>
          </View>
          <View style={styles.button}>
            <Button onPress={this._viewLeads}>View All Leads</Button>
          </View>
        </View>
      </View>
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
  header: {
    height: 65
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10
  }
});
