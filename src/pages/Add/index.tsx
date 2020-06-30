import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, MapEvent, LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { SvgXml } from "react-native-svg";

import CheckBox from "../../components/Checkbox";
import colors from "../../styles/colors";

import {
  Container,
  Header,
  MapContainer,
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

import paperIcon from "../../assets/toilet-paper.svg";
import disabledIcon from "../../assets/disabled.svg";
import manIcon from "../../assets/man-sign.svg";
import womanIcon from "../../assets/woman-sign.svg";
import showerIcon from "../../assets/shower.svg";
import urinalIcon from "../../assets/urinal.svg";

const Add: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState<LatLng>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [options, setOptions] = useState([
    { name: "Papel", key: "paper", icon: paperIcon },
    { name: "Masculino", key: "male", icon: manIcon },
    { name: "Feminino", key: "female", icon: womanIcon },
    { name: "PCD", key: "disabled", icon: disabledIcon },
    { name: "Mictorio", key: "urinal", icon: urinalIcon },
    { name: "Chuveiro", key: "shower", icon: showerIcon },
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    const loadPos = async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ooooops.....", "Precisamos da sua permissão");
        return;
      }

      // const location = await Location.getCurrentPositionAsync();

      // const { latitude, longitude } = location.coords;
      // setInitialPosition([latitude, longitude]);
      setInitialPosition([-20.8368359, -41.1270382]);
    };

    loadPos();
  }, []);

  const handleCheck = (option: string) => {
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
  const handleChangePrice = (e: string) => {
    setPrice(e);
  };

  const handleSetLocation = (e: MapEvent) => {
    setLocation(e.nativeEvent.coordinate);
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
                value={selectedOptions.includes(option.key)}
                size={36}
                borderColor="transparent"
                checkColor={colors.primary}
                backgroundColor={colors.background}
                onPress={() => handleCheck(option.key)}
              />
              <SvgXml
                style={{ marginLeft: 5 }}
                xml={option.icon}
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
        <Rating>5/5</Rating>
      </ScrollView>
    </Container>
  );
};

export default Add;
