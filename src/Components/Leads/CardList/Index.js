import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../HeaderFooter/Header";
import LeadList from "./LeadList";

export default class AgendaIndex extends React.Component {
  render() {
    return (
      <View>
      <View style={styles.header} />
      <Header />
        <LeadList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 90
  }
});
