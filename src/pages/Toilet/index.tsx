import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Header,
  PriceWrapper,
  Currency,
  Price,
  Name,
} from "./styles";

const Toilet: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setName(route.params.point.name);
    setPrice(route.params.point.price);
  }, []);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Name>{name}</Name>
        <PriceWrapper>
          <Currency>R$</Currency>
          <Price>{Number(price)?.toFixed(2)}</Price>
        </PriceWrapper>
      </ScrollView>
    </Container>
  );
};

export default Toilet;
