import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SvgXml } from "react-native-svg";

import {
  Container,
  Header,
  MapContainer,
  FilterContainer,
  FilterScroll,
  Filter,
  FilterText,
} from "./styles";

import paperIcon from "../../assets/toilet-paper.svg";
import disabledIcon from "../../assets/disabled.svg";
import manIcon from "../../assets/man-sign.svg";
import womanIcon from "../../assets/woman-sign.svg";
import showerIcon from "../../assets/shower.svg";
import urinalIcon from "../../assets/urinal.svg";

interface Filter {
  name: string;
  key: string;
  icon: string;
}

interface Point {
  id: number;
  options: {
    name: string;
    key: string;
  }[];
  locale: { latitude: number; longitude: number };
}

const Find: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    {
      id: 1,
      options: [
        { name: "Papel", key: "paper" },
        { name: "Masculino", key: "male" },
        { name: "Mictorio", key: "urinal" },
      ],
      locale: { latitude: -20.836338, longitude: -41.127478 },
    },
    {
      id: 2,
      options: [
        { name: "Papel", key: "paper" },
        { name: "Feminino", key: "female" },
      ],
      locale: { latitude: -20.836498, longitude: -41.127727 },
    },
    {
      id: 3,
      options: [
        { name: "Papel", key: "paper" },
        { name: "Deficiente", key: "disabled" },
        { name: "Masculino", key: "male" },
        { name: "Feminino", key: "female" },
        { name: "Mictorio", key: "urinal" },
      ],
      locale: { latitude: -20.836984, longitude: -41.128175 },
    },
  ]);
  const [filters, setFilters] = useState<Filter[]>([
    { name: "Papel", key: "paper", icon: paperIcon },
    { name: "Masculino", key: "male", icon: manIcon },
    { name: "Feminino", key: "female", icon: womanIcon },
    { name: "Deficiente", key: "disabled", icon: disabledIcon },
    { name: "Mictorio", key: "urinal", icon: urinalIcon },
    { name: "Chuveiro", key: "shower", icon: showerIcon },
  ]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigation = useNavigation();
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

  const handleCheck = (filter: string) => {
    const index = selectedFilters.findIndex((item) => item === filter);
    if (index >= 0) {
      const filtered = selectedFilters.filter((item) => item !== filter);
      setSelectedFilters(filtered);
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    // api
    //   .get("points", {
    //     params: {
    //       items: selectedFilters,
    //     },
    //   })
    //   .then((response) => setPoints(response.data));
  }, [selectedFilters]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Ionicons name="ios-add" size={30} color="white" />
        </TouchableOpacity>
      </Header>
      <MapContainer>
        {initialPosition[0] !== 0 && (
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            {points.map((point) => (
              <Marker
                key={String(point.id)}
                icon={require("../../assets/pin.png")}
                coordinate={point.locale}
              />
            ))}
          </MapView>
        )}
      </MapContainer>
      <FilterContainer>
        <FilterScroll horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <Filter
              key={filter.key}
              onPress={() => handleCheck(filter.key)}
              active={selectedFilters.includes(filter.key)}
            >
              <SvgXml xml={filter.icon} height={50} width={50} />
              {/* <FilterText>{filter.name}</FilterText> */}
            </Filter>
          ))}
        </FilterScroll>
      </FilterContainer>
    </Container>
  );
};

export default Find;
