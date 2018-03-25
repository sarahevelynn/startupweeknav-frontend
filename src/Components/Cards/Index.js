import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../HeaderFooter/Header";
import CardList from "./CardList";

export default class LeadsIndex extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header />
      <CardList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
