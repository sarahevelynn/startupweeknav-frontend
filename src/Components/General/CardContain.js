import React from "react";
import { View } from "react-native";

const CardContain = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    shadowColor: "#41918d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 590
  }
};

export default CardContain;
