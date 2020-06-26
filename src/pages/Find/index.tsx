import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import {
  Container,
  Header,
  MapContainer,
  FlatListContainer,
  Filter,
  FilterText,
} from "./styles";

interface Filter {
  name: string;
  value: boolean;
  key: string;
}

const Find: React.FC = () => {
  const points = [
    {
      id: 1,
      options: [
        { name: "Papel", value: true, key: "paper" },
        { name: "Ducha", value: false, key: "douche" },
        { name: "Deficiente", value: false, key: "disabled" },
        { name: "Masculino", value: true, key: "male" },
        { name: "Feminino", value: false, key: "female" },
        { name: "Mictorio", value: true, key: "urinal" },
        { name: "Chuveiro", value: false, key: "shower" },
      ],
      locale: { latitude: -20.836338, longitude: -41.127478 },
    },
    {
      id: 2,
      options: [
        { name: "Papel", value: true, key: "paper" },
        { name: "Ducha", value: false, key: "douche" },
        { name: "Deficiente", value: false, key: "disabled" },
        { name: "Masculino", value: false, key: "male" },
        { name: "Feminino", value: true, key: "female" },
        { name: "Mictorio", value: false, key: "urinal" },
        { name: "Chuveiro", value: false, key: "shower" },
      ],
      locale: { latitude: -20.836498, longitude: -41.127727 },
    },
    {
      id: 3,
      options: [
        { name: "Papel", value: true, key: "paper" },
        { name: "Ducha", value: false, key: "douche" },
        { name: "Deficiente", value: true, key: "disabled" },
        { name: "Masculino", value: true, key: "male" },
        { name: "Feminino", value: true, key: "female" },
        { name: "Mictorio", value: true, key: "urinal" },
        { name: "Chuveiro", value: false, key: "shower" },
      ],
      locale: { latitude: -20.836984, longitude: -41.128175 },
    },
  ];
  const [filters, setFilters] = useState([
    { name: "Papel", value: false, key: "paper" },
    { name: "Ducha", value: false, key: "douche" },
    { name: "Deficiente", value: false, key: "disabled" },
    { name: "Masculino", value: false, key: "male" },
    { name: "Feminino", value: false, key: "female" },
    { name: "Mictorio", value: false, key: "urinal" },
    { name: "Chuveiro", value: false, key: "shower" },
  ]);
  const navigation = useNavigation();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const renderFilters = ({ item }: { item: Filter }) => (
    <Filter onPress={() => handleCheck(item)}>
      <FilterText>{item.name}</FilterText>
    </Filter>
  );

  const handleCheck = (filter: Filter) => {
    const newFilter = filters.map((f) =>
      f.key === filter.key ? { name: f.name, value: !f.value, key: f.key } : f
    );
    setFilters(newFilter);
  };

  useEffect(() => {
    const loadPos = async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ooooops.....", "Precisamos da sua permissão");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    };

    loadPos();
  }, []);

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
              // point.options.reduce(, true)
              <Marker
                key={String(point.id)}
                icon={require("../../assets/pin.png")}
                coordinate={point.locale}
              />
            ))}
          </MapView>
        )}
      </MapContainer>
      <FlatListContainer>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item) => String(item.key)}
          renderItem={renderFilters}
          showsHorizontalScrollIndicator={false}
          data={filters}
          horizontal
        />
      </FlatListContainer>
    </Container>
  );
};

export default Find;
