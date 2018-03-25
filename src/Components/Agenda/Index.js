import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../HeaderFooter/Header";
import Agenda from "./Agenda";

export default class AgendaIndex extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header />
        <Agenda />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
