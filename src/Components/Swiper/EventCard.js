import React from "react";
import { Text, View, Image, Linking, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import Button from "../General/Button";
import CardSection from "../General/CardSection";
import CardContain from "../General/CardContain";

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
    cardContentStyle,
    cardInfoStyle,
    cardTicketStyle,
  } = styles;
  return (
    <View >
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

          <CardSection >
            <Button >
              {event.register}
            </Button>
            <Button
              onPress={() => Linking.openURL(event.tickets)}
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
  }
};

export default EventCard;
