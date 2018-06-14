import React from "react";
import { Text, View, Image } from "react-native";

const Header = props => {
  return (
    <View>
      <Image
        style={styles.imageStyle}
        resizeMode={"cover"}
        source={require("./small.logo.png")}
      />
    </View>
  );
};

const styles = {
  imageStyle: {
    paddingTop: 140,
    shadowColor: "#000",
    width: "100%",
    height: 70,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4
  }
};

export default Header;
