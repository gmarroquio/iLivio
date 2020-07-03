import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, MapEvent, LatLng } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import firebase from "../../config/firebase";

import CheckBox from "../../components/Checkbox";
import colors from "../../styles/colors";

import {
  Container,
  Header,
  MapContainer,
  Options,
  Option,
  OptionText,
  PriceWrapper,
  Currency,
  Price,
  Name,
  SubmitButton,
  SubmitButtonText,
} from "./styles";

interface Filter {
  id: number;
  name: string;
  key: string;
  url?: string;
}

const Add: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState<LatLng>();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [options, setOptions] = useState<Filter[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    setOptions(route.params.filters);
    setInitialPosition(route.params.pos);
  }, []);

  const handleCheck = (option: number) => {
    const index = selectedOptions.findIndex((item) => item === option);
    if (index >= 0) {
      const filtered = selectedOptions.filter((item) => item !== option);
      setSelectedOptions(filtered);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChangeName = (e: string) => {
    setName(e);
  };
  const handleChangePrice = (e: number) => {
    setPrice(e);
  };

  const handleSetLocation = (e: MapEvent) => {
    setLocation(e.nativeEvent.coordinate);
  };

  const handleSubmit = () => {
    if (name && location && selectedOptions.length > 0)
      firebase
        .firestore()
        .collection("points")
        .add({
          locale: [location?.latitude, location?.longitude],
          name,
          options: selectedOptions.sort((a, b) => a - b),
          price,
        })
        .then(navigation.goBack);
    else {
      Alert.alert("Preencha todos os campos");
    }
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Name
          onChangeText={handleChangeName}
          placeholder="Nome"
          placeholderTextColor="#fffa"
        />
        <MapContainer>
          {initialPosition[0] !== 0 && (
            <MapView
              showsUserLocation
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              }}
              onPress={handleSetLocation}
            >
              {location && (
                <Marker
                  icon={require("../../assets/pin.png")}
                  coordinate={location}
                />
              )}
            </MapView>
          )}
        </MapContainer>
        <Options>
          {options.map((option) => (
            <Option key={option.name}>
              <CheckBox
                value={selectedOptions.includes(option.id)}
                size={36}
                borderColor="transparent"
                checkColor={colors.primary}
                backgroundColor={colors.background}
                onPress={() => handleCheck(option.id)}
              />
              <SvgUri
                style={{ marginLeft: 5 }}
                uri={option.url}
                height={40}
                width={40}
              />
              <OptionText>{option.name}</OptionText>
            </Option>
          ))}
        </Options>
        <PriceWrapper>
          <Currency>R$</Currency>
          <Price keyboardType="numeric" onChangeText={handleChangePrice} />
        </PriceWrapper>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Adicionar</SubmitButtonText>
        </SubmitButton>
      </ScrollView>
    </Container>
  );
};

export default Add;
