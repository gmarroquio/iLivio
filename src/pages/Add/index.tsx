import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Container, Header, Map, Img } from "./styles";

const Add: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <Img />
      <Map />
    </Container>
  );
};

export default Add;
