import React from "react";
import { Text, View } from "react-native";
import { TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import Header from "./src/Components/HeaderFooter/Header";
import AgendaIndex from "./src/Components/Agenda/Index";
import SwipeIndex from "./src/Components/Swiper/Index";
import LeadsInex from "./src/Components/Leads/Index";


const HomeScreenTab = TabNavigator({
  Home: {screen: HomeScreen},
  Search: { screen: SearchTab},
  Notifications: {screen: Notifications},
  Messages: {screen: Messages},
	},{
		tabBarComponent: props => (<TabBarComponent{...props} />),
		tabBarPosition: 'top',
		animationEnabled: true,
		tabBarOptions: {
		activeTintColor: 'blue',
		inactiveTintColor: 'grey',
		activeBackgroundColor: "#fff",
		inactiveBackgroundColor: "#fff",
		showIcon: true,
		showLabel: false,
		},


} );



const routeConfiguration = {
  screen1: { screen: SwipeIndex },
  screen2: { screen: AgendaIndex },
  screen3: { screen: LeadsInex },
};


const tabBarComponent = ({ props }) => {
  props.activeTintColor = colorArray[props.navigationState.index];

  return (
    <TabBarBottom
      {...props}
    />
  );
};

const tabBarConfiguration = {
  tabBarComponent,
  tabBarPosition: 'bottom',
};

export const BottomTabBar = TabNavigator(routeConfiguration, tabBarConfiguration);
