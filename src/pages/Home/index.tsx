import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import {
  Container,
  Header,
  Img,
  Title,
  Footer,
  Button,
  ButtonText,
} from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <Title>iLivio</Title>
        <Img source={require("../../assets/toilet-paper.png")} />
      </Header>
      <Footer source={require("../../assets/bloob.png")} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Img source={require("../../assets/toilet.png")} />
        <Button onPress={() => navigation.navigate("Find")}>
          <ButtonText>Procurar</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default Home;
