import React from "react";
import { Text, View, Image, Linking } from "react-native";
import Card from "./Card";
import CardSection from "./CardSection";

const CardDetail = ({ card }) => {
  const {
    image,
    cardName,
    date,
    time,
    address,
    cardDescription,
    register,
    tickets
  } = card;
  const {
    containerStyle,
    cardImageStyle,
    cardImageContainerStyle,
    cardContentStyle,
    cardInfoStyle,
    cardNumStyle
  } = styles;
  return (
    <Card>
      <CardSection>
        <View style={containerStyle}>
          <View>
            <Text style={cardNumStyle}>{card.priority}</Text>
          </View>

          <View style={cardImageContainerStyle}>
            <Image style={cardImageStyle} source={{ uri: card.image }} />
          </View>

          <View style={cardContentStyle}>
            <View>
              <Text style={cardInfoStyle}>{card.category}</Text>
            </View>
          </View>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "nowrap",
    alignItems: "center",
  },
  cardNumStyle: {
    fontSize: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingRight: 15,
  },
  cardImageStyle: {
    height: 100,
    width: 100,
    margin: 15,
    borderWidth: 5,
    borderColor: "#41918d",

  },
  cardContentStyle: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  cardInfoStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    textDecorationStyle: "dotted",
    textDecorationColor: "blue"
  },
};

export default CardDetail;
