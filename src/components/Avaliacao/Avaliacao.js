import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, Alert } from "react-native";
import { AirbnbRating } from "react-native-ratings";

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Textarea,
  Label
} from "native-base";

const perguntas = [
  {
    id: 0,
    pergunta: "Qual seu nível de satisfação com o aplicativo?"
  },
  {
    id: 1,
    pergunta: "O aplicativo cumpriu com o seu objetivo?"
  },
  {
    id: 2,
    pergunta:
      "Como você avalia a complexidade de reportar um problema pelo aplicativo?"
  },
  {
    id: 3,
    pergunta: "Você usaria esse aplicativo no seu dia-a-dia?"
  },
  {
    id: 4,
    pergunta:
      "Você considera que esse aplicativo pode facilitar a resolução de problemas no saneamento básico?"
  }
];

export default class Avaliação extends Component {
  static navigationOptions = {
    title: "Avalie o App"
  };

  state = {
    respostas: ["", "", "", "", ""],
    infoAdicionais: "",
    rating: 0,
    buttonDisable: false
  };

  handleChange = (value, id) => {
    const respostas = this.state.respostas;
    respostas[id] = value;
    this.setState({ respostas });
  };

  ratingCompleted = rating => {
    this.setState({ rating });
  };

  report = () => {
    this.setState({ buttonDisable: true });
    if (
      this.state.respostas[0] === "" ||
      this.state.respostas[1] === "" ||
      this.state.respostas[2] === "" ||
      this.state.respostas[3] === "" ||
      this.state.respostas[4] === ""
    ) {
      Alert.alert("Campos obrigatórios em branco!");
      return;
    }
    const objSend = {
      respostas: this.state.respostas,
      infoAdicionais: this.state.infoAdicionais,
      rating: this.state.rating
    };

    fetch("https://node-api-nodemailer.herokuapp.com/report", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objSend)
    })
      .then(res => {
        Alert.alert("Avaliação cadastrada com sucesso!");
        this.setState({ buttonDisable: false }, () => {
          this.props.navigation.goBack();
          // console.log("navi", this.props.navigation);
          // this.props.navigation.state.params.onSelect({ selected: true });
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ buttonDisable: false }, () => {
          this.props.navigation.goBack();
          // this.props.navigation.state.params.onSelect({ selected: true });
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <ScrollView>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Form>
              {perguntas.map((item, index) => {
                const id = item.id;
                return (
                  <Item key={index} stackedLabel style={styles.itemForm}>
                    <Label>*{item.pergunta}</Label>
                    <Input
                      // placeholder="nome"
                      name={`pergunta${item.id}`}
                      onChangeText={value => this.handleChange(value, id)}
                      value={this.state.respostas[index]}
                    />
                  </Item>
                );
              })}
              <Item style={styles.itemFormTextArea}>
                <Label>Fique a vontade para nos dizer algo mais.</Label>
                <Textarea
                  style={styles.textarea}
                  rowSpan={5}
                  bordered
                  value={this.state.infoAdicionais}
                  onChangeText={value =>
                    this.setState({ infoAdicionais: value })
                  }
                />
              </Item>
              <Item stackedLabel style={styles.itemFormRating}>
                <Label>
                  De 0 a 5, qual seu nível de satisfação com o aplicativo?
                </Label>
                <AirbnbRating
                  count={5}
                  reviews={["1", "2", "3", "4", "5"]}
                  defaultRating={0}
                  size={40}
                  onFinishRating={this.ratingCompleted}
                  // style={{ paddingVertical: 40 }}
                />
              </Item>
              <Button
                disabled={this.state.buttonDisable}
                block
                style={{ marginTop: 10 }}
                onPress={this.report}
              >
                <Text style={styles.textButton}>Cadastrar Avaliação</Text>
              </Button>
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
  itemFormTextArea: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 0,
    justifyContent: "space-around",
    paddingBottom: 10,
    paddingTop: 10
  },
  textarea: {
    width: "100%"
  },
  itemFormRating: {
    marginLeft: 0,
    flex: 1,
    paddingBottom: 10
    // justifyContent: ""
  },
  textButton: {
    color: "white"
  },
  rowImage: {
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
