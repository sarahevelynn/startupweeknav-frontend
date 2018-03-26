import React from "react";
import { Text, View } from "react-native";
import { TabNavigator } from "react-navigation";
import Header from "./src/Components/HeaderFooter/Header";
import AgendaIndex from "./src/Components/Agenda/Index";
import SwipeIndex from "./src/Components/Swiper/Index";
import LeadsInex from "./src/Components/Leads/Index";

class EventScreen extends React.Component {
  render() {
    return (
        <SwipeIndex />
    );
  }
}

class AgendaScreen extends React.Component {
  render() {
    return (
      <AgendaIndex />
    );
  }
}

class LeadsScreen extends React.Component {
  render() {
    return (
      <LeadsInex />
    );
  }
}

export default TabNavigator({
  Agenda: { screen: AgendaScreen },
  Events: { screen: EventScreen },
  Leads: { screen: LeadsScreen }
});
