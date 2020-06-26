import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CheckBox from "../../components/Checkbox";
import colors from "../../styles/colors";

import {
  Container,
  Header,
  Map,
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

const Add: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [options, setOptions] = useState([
    { name: "Papel", value: false, key: "paper" },
    { name: "Ducha", value: false, key: "douche" },
    { name: "Deficiente", value: false, key: "disabled" },
    { name: "Masculino", value: false, key: "male" },
    { name: "Feminino", value: false, key: "female" },
    { name: "Mictorio", value: false, key: "urinal" },
    { name: "Chuveiro", value: false, key: "shower" },
  ]);

  const handleCheck = (option: {
    name: string;
    value: boolean;
    key: string;
  }) => {
    const newOptions = options.map((o) =>
      o.key === option.key ? { name: o.name, value: !o.value, key: o.key } : o
    );
    setOptions(newOptions);
  };

  const handleChangeName = (e: string) => {
    setName(e);
  };
  const handleChangePrice = (e: string) => {
    setPrice(e);
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Name onChangeText={handleChangeName} />
        <Img />
        <Map />
        <Options>
          {options.map((option) => (
            <Option key={option.name}>
              <CheckBox
                value={option.value}
                size={24}
                borderColor="transparent"
                checkColor={colors.primary}
                backgroundColor={colors.background}
                onPress={() => handleCheck(option)}
              />
              <OptionText>{option.name}</OptionText>
            </Option>
          ))}
        </Options>
        <PriceWrapper>
          <Currency>R$</Currency>
          <Price keyboardType="numeric" onChangeText={handleChangePrice} />
        </PriceWrapper>
        <Rating>5/5</Rating>
      </ScrollView>
    </Container>
  );
};

export default Add;
