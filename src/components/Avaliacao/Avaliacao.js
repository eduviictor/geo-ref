import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Picker,
  Thumbnail,
  Label
} from "native-base";

const perguntas = [
  "Qual seu nível de satisfação com o aplicativo?",
  "O aplicativo cumpriu com o seu objetivo?",
  "Como você avalia a complexidade de reportar um problema pelo aplicativo?",
  "Você usaria esse aplicativo no seu dia-a-dia?",
  "Você considera que esse aplicativo pode facilitar a resolução de problemas no saneamento básico?",
];

export default class Avaliação extends Component {
  render() {
    return (
      <ScrollView>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Form>
              <Item stackedLabel style={styles.itemForm}>
                <Label>Nome</Label>
                <Input
                  // placeholder="nome"
                  name="nome"
                  onChangeText={value => this.handleChange(value, "nome")}
                  value={this.state.nome}
                />
              </Item>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    padding: 20
  },
  content: {
    height: "auto",
    width: "100%"
    // backgroundColor: "red",
    // paddingTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20
    // paddingBottom: 20
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
    // flexDirection: "column",
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0
  },
  containerImagem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingTop: 5
  }
});
