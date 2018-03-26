import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Header from "../../HeaderFooter/Header";
import Form from "./CardForm";

class FormIndex extends Component {
  render() {
    return (
      <View style={{flex: -1}}>
      <Header />
      <Form />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

export default FormIndex;
