import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../HeaderFooter/Header";
import LeadList from "./LeadsList";

export default class LeadsList extends React.Component {
  render() {
    return (
      <View>
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
