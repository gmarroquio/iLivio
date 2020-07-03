import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SvgUri } from "react-native-svg";
import firebase from "../../config/firebase";

import {
  Container,
  Header,
  MapContainer,
  FilterContainer,
  FilterScroll,
  Filter,
  FilterText,
} from "./styles";

interface Filter {
  id: number;
  name: string;
  key: string;
  url?: string;
}

interface Point {
  name: string;
  options: Filter[];
  locale: { latitude: number; longitude: number };
  price: number;
}

const Find: React.FC = () => {
  // @refresh reset
  const [points, setPoints] = useState<Point[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const navigation = useNavigation();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  // Load Filters
  useEffect(() => {
    const newFilters = [] as Filter[];
    firebase
      .firestore()
      .collection("filters")
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const filter = doc.data() as Filter;
          newFilters.push(filter);
        });
        setFilters(newFilters);
      });
  }, []);

  // Load position
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

  // Get points
  useEffect(() => {
    const newPoints = [] as Point[];
    const firestore = firebase.firestore().collection("points");
    if (selectedFilters?.length > 0) {
      firestore
        .where(
          "options",
          "==",
          selectedFilters.sort((a, b) => a - b)
        )
        .get()
        .then((response) => {
          response.forEach((doc) => {
            newPoints.push({
              name: doc.data().name,
              options: doc.data().options,
              price: doc.data().price,
              locale: {
                latitude: doc.data().locale[0],
                longitude: doc.data().locale[1],
              },
            });
          });
          setPoints(newPoints);
        });
    } else {
      firestore.get().then((response) => {
        response.forEach((doc) => {
          newPoints.push({
            name: doc.data().name,
            options: doc.data().options,
            price: doc.data().price,
            locale: {
              latitude: doc.data().locale[0],
              longitude: doc.data().locale[1],
            },
          });
        });
        setPoints(newPoints);
      });
    }
  }, [selectedFilters]);

  const handleCheck = (filter: number) => {
    const index = selectedFilters.findIndex((item) => item === filter);
    if (index >= 0) {
      const filtered = selectedFilters.filter((item) => item !== filter);
      setSelectedFilters(filtered);
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Add", { filters, pos: initialPosition })
          }
        >
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
                key={String(point.name)}
                icon={require("../../assets/pin.png")}
                coordinate={point.locale}
                onPress={() => navigation.navigate("Toilet", { point })}
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
              onPress={() => handleCheck(filter.id)}
              active={selectedFilters.includes(filter.id)}
            >
              <SvgUri uri={filter.url} height={50} width={50} />
              {/* <FilterText>{filter.name}</FilterText> */}
            </Filter>
          ))}
        </FilterScroll>
      </FilterContainer>
    </Container>
  );
};

export default Find;
