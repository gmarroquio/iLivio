import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Img,
  Options,
  Option,
  OptionText,
  PriceWrapper,
  Currency,
  Price,
  Name,
  Rating,
} from "./styles";

const Toilet: React.FC = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState([
    { name: "Papel", value: true, key: "paper" },
    { name: "Ducha", value: false, key: "douche" },
    { name: "Deficiente", value: true, key: "disabled" },
    { name: "Masculino", value: true, key: "male" },
    { name: "Feminino", value: false, key: "female" },
    { name: "Mictorio", value: false, key: "urinal" },
    { name: "Chuveiro", value: false, key: "shower" },
  ]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Name>Bicho Guloso</Name>
        <Img />
        <Options>
          {options.map(
            (option) =>
              option.value && (
                <Option key={option.name}>
                  <OptionText>{option.name}</OptionText>
                </Option>
              )
          )}
        </Options>
        <PriceWrapper>
          <Currency>R$</Currency>
          <Price>2,00</Price>
        </PriceWrapper>
        <Rating>5/5</Rating>
      </ScrollView>
    </Container>
  );
};

export default Toilet;
