import React from "react";
import { Text, View, Image, Linking, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Button from "../General/Button";
import CardSection from "./CardSection";
import CardContain from "./CardContain";

const EventCard = ({ event }) => {

  const {
    image,
    eventName,
    date,
    time,
    address,
    eventDescription,
    register,
    tickets
  } = event;
  const {
    container,
    cardContentStyle,
    cardInfoStyle,
    cardTicketStyle
  } = styles;
  return (
    <View>
      <CardContain>
        <Card
          key={event.id}
          title={event.eventName}
          image={{ uri: event.image }}
        >
          <CardSection>
            <View style={[cardContentStyle, { flexDirection: "row" }]}>
              <View style={cardInfoStyle}>
                <Text>{date}</Text>
                <Text>{time}</Text>
                <Text>{address}</Text>
              </View>
            </View>
          </CardSection>

          <CardSection>
            <Text>{eventDescription}</Text>
          </CardSection>

          <CardSection>
            <Button onPress={() => Linking.openURL(register)} value={register}>
              Register(Y/N)
            </Button>
            <Button
              onPress={() => Linking.openURL(event.register)}
              value={event.tickets}
            >
              Get Tickets
            </Button>
          </CardSection>
        </Card>
      </CardContain>
    </View>
  );
};

const styles = {
  container: {},
  cardContentStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  cardInfoStyle: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  cardTicketStyle: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttons: {
    flex: 1,
    justifyContent: "space-around"
  }
};

export default EventCard;
