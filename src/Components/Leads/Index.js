import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View, StyleSheet} from 'react-native';
import Header from "../HeaderFooter/Header";
import FormIndex from "./CreateCard/Index";
import CardListIndex from "./CardList/Index";

export default class LeadsInex extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: "Leads HomePage",
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
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
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex},
    });
  }
  _viewLeads() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: CardListIndex,
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex},
    });
  }

  render() {
    return (
      <View>
      <Header style={styles.header}/>
      <View style={styles.container}>
        <Text>Here you can: {this.props.title}</Text>
        <Button
          onPress={this._addCard}
          title="Take a Picture"
        />
        <Button
          onPress={this._addCard}
          title="Add a Card"
        />
        <Button
          onPress={this._viewLeads}
          title="View All Leads"
        />
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
    marginTop:5
  },
  header: {
    marginTop:35
  }
});
