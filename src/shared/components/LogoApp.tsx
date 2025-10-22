import React from "react";
import {
  Image,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

const logo = require("@assets/images/logo1.png");

interface LogoAppProps {
  styleConteiner: StyleProp<ViewStyle>;
  styleImage: StyleProp<ImageStyle>;
}
export const LogoApp = ({ styleConteiner, styleImage }: LogoAppProps) => {
  return (
    <View style={styleConteiner}>
      <Image source={logo} style={styleImage} />
    </View>
  );
};
