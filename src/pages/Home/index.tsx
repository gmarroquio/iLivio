import React from "react";

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
  return (
    <Container>
      <Header>
        <Title>iLivio</Title>
        <Img source={require("../../assets/toilet-paper.png")} />
      </Header>
      <Footer source={require("../../assets/bloob.png")}>
        <Img source={require("../../assets/toilet.png")} />
        <Button>
          <ButtonText>Procurar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
