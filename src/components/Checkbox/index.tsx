import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";

interface Checkbox {
  size: number;
  value: boolean;
  borderColor?: string;
  checkColor?: string;
  backgroundColor?: string;
  onPress: Function;
}

const Checkbox: React.FC<Checkbox> = ({
  size,
  borderColor,
  checkColor,
  backgroundColor,
  value,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: size,
        width: size,
        borderColor: borderColor ? borderColor : "#fff",
        borderWidth: 2,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
      }}
      onPress={onPress}
    >
      {value && (
        <Image
          source={require("../../assets/check.png")}
          style={{
            height: size / 2,
            width: size / 2,
            tintColor: checkColor ? checkColor : "#fff",
          }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
