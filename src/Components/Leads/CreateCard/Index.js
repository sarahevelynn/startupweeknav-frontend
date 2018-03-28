import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Header from "../../HeaderFooter/Header";
import Form from "./CardForm";

class FormIndex extends Component {
  render() {
    return (
      <View>
        <View style={styles.header} />
        <Header />
        <Form />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 65
  }
});

export default FormIndex;
