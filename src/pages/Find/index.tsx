import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  Container,
  Header,
  Map,
  FlatListContainer,
  Filter,
  FilterText,
} from "./styles";

const Find: React.FC = () => {
  const filter = ["Genero", "Preco", "Papel", "Deficiente"];
  const navigation = useNavigation();

  const renderFilters = ({ item }: { item: string }) => (
    <Filter>
      <FilterText>{item}</FilterText>
    </Filter>
  );

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
      <Map />
      <FlatListContainer>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item) => String(item)}
          renderItem={renderFilters}
          showsHorizontalScrollIndicator={false}
          data={filter}
          horizontal
        />
      </FlatListContainer>
    </Container>
  );
};

export default Find;
