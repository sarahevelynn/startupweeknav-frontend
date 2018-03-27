import React, { Component } from "react";
import { TabNavigator, StyleSheet } from "react-navigation";
import Header from "./src/Components/HeaderFooter/Header";
import AgendaIndex from "./src/Components/Agenda/Index";
import SwipeIndex from "./src/Components/Swiper/Index";
import LeadsInex from "./src/Components/Leads/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Text, Footer, FooterTab } from "native-base";

export default (MainScreenNavigator = TabNavigator(
  {
    SwipeIndex: { screen: SwipeIndex },
    AgendaIndex: { screen: AgendaIndex },
    LeadsInex: { screen: LeadsInex }
  },
  {
    tabBarComponent: props => {
      return (
        <Footer style={{ height: 77 }}>
          <FooterTab style={{justifyContent:"space-around", paddingTop:3}}>
            <Icon.Button
              name="list-alt"
              iconLeft
              light
              vertical
              backgroundColor="#287573"
              size={25}
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("AgendaIndex")}
            >
              <Text style={styles.text}>Agenda</Text>
            </Icon.Button>
            <Icon.Button
              name="home"
              iconLeft
              light
              vertical
              backgroundColor="#287573"
              size={25}
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("SwipeIndex")}
            >
              <Text style={styles.text}>Events</Text>
            </Icon.Button>
            <Icon.Button
              name="handshake-o"
              iconLeft
              light
              vertical
              backgroundColor="#287573"
              size={25}
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LeadsInex")}
            >
              <Text style={styles.text}>Leads</Text>
            </Icon.Button>
          </FooterTab>
        </Footer>
      );
    },
    tabBarPosition: "bottom"
  }
));

const styles = {
  text: {
    fontFamily: "Arial",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center"
  }
};
