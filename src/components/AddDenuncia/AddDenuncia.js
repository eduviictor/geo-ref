import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { withNavigationFocus } from "react-navigation";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Picker
} from "native-base";

const problems = [
  "Caixa d'agua de distribuição com problemas",
  "Encanamento aparente/visível",
  "Encanamento quebrado",
  "Encanamento com vazamento",
  "Emergência de água à superficie",
  "Falta de abastecimento",
  "Instalação legal",
  "Esgoto a céu aberto",
  "Esgoto quebrado",
  "Sistema de escoamento danificado/entupido",
  "Transbordamento de esgoto",
  "Vazamento em esgoto"
];

class AddDenuncia extends Component {
  static navigationOptions = {
    title: "Adicionar Denuncia"
  };

  render() {
    // this.props.isFocused
    //   ? this.setState({ dataImage: this.props.navigation.getParam("image") })
    //   : null;
    // console.log(this.state);
    const dataImage =
      this.props.navigation.getParam("image") === undefined
        ? null
        : this.props.navigation.getParam("image");
    console.log(dataImage);
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Cadastre-se: </Text>
          </View>
          <Form>
            <Item style={styles.itemForm}>
              <Input placeholder="nome" />
            </Item>
            <Item style={styles.itemForm}>
              <Input placeholder="endereco do problema" />
            </Item>
            <Item style={styles.itemForm}>
              <Input placeholder="ponto de referência" />
            </Item>
            <Item style={styles.itemForm}>
              <Picker mode="dropdown" placeholder="Selecione uma opção">
                {problems.map((item, index) => (
                  <Picker.Item value={item} label={item} key={index} />
                ))}
              </Picker>
            </Item>
            <Item style={styles.rowImage}>
              <Image
                source={{
                  isStatic: true,
                  uri:
                    dataImage !== null
                      ? "data:image/jpeg;base64," + dataImage.base64
                      : null
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderWidth: 1,
                  borderColor: "black"
                }}
              />
              <Button
                onPress={() => this.props.navigation.navigate("Camera")}
                light
              >
                <Text>Tirar Foto</Text>
              </Button>
            </Item>
            <Button block style={{ marginTop: 10 }}>
              <Text style={styles.textButton}>Criar Conta</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  content: {
    height: "auto",
    width: "100%"
  },
  containerTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    height: "auto"
  },
  title: {
    fontSize: 20
  },
  itemForm: {
    marginLeft: 0
  },
  textButton: {
    color: "white"
  },
  rowImage: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default withNavigationFocus(AddDenuncia);
