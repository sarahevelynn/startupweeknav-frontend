import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Text style={textStyle}>
    {children}
    </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#063835",
    fontSize: 16,
    fontWeight: "700",
    padding: 10,    
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#063835",
    marginLeft: 5,
    marginRight: 5,
  }
}

export default Button;
