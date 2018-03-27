import React from "react";
import PropTypes from "prop-types";
import { NavigatorIOS, View, StyleSheet, Image } from "react-native";
import { Button, Text, Footer, FooterTab } from "native-base";
import Header from "../HeaderFooter/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import FormIndex from "./CreateCard/Index";
import CardListIndex from "./CardList/Index";
import CameraScreenIndex from "./TakePicture/Index";

export default class LeadsInex extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: "",
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
    this._takePicture = this._takePicture.bind(this);
  }
  _takePicture() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: CameraScreenIndex,
      title: "Take a Picture",
      passProps: { index: nextIndex }
    });
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
        <Header />
        <View style={styles.container}>
          <View style={styles.button}>
            <Icon.Button
              name="camera-retro"
              iconRight
              light
              vertical
              size={40}
              backgroundColor="#287573"
              onPress={this._takePicture}
              style={styles.icon}
            >
              <Text style={styles.text}>Take Picture</Text>
            </Icon.Button>
          </View>
          <View style={styles.button}>
            <Icon.Button
              name="user-plus"
              iconLeft
              light
              vertical
              size={40}
              backgroundColor="#287573"
              onPress={this._takePicture}
              style={styles.icon}
            >
              <Text style={styles.text}>Add a Lead</Text>
            </Icon.Button>
          </View>
          <View style={styles.button}>
            <Icon.Button
              name="address-book-o"
              iconLeft
              light
              vertical
              size={40}
              backgroundColor="#287573"
              onPress={this._viewLeads}
              style={styles.icon}
            >
              <Text style={styles.text}>View Leads</Text>
            </Icon.Button>
          </View>
          <View style={{height:20}}/>
        </View>
        <Image source={require("./denver.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b8c9c8",
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#d6d7da"
  },
  header: {
    height: 85
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color:"#215e5b",
    textAlign: "center",
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#215e5b"
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
    justifyContent: "center",
    alignContent: "center"
  },
  icon: {
    justifyContent: "center",
    alignContent: "center"
  },
  text: {
    fontFamily: "Arial",
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 15
  }
});
