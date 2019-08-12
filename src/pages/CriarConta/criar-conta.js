import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Content, Form, Item, Input, Button } from "native-base";

import firebase from "react-native-firebase";

class CriarConta extends Component {
  state = {
    nome: "",
    cpf: "",
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Criar Conta"
  };

  cadastrar = async () => {
    const { email, password, nome, cpf } = this.state;

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      // .then((item) => {
      // 	item.user.updateProfile({
      // 		displayName: this.state.nome
      // 	});
      // 	return item;
      // });
      console.log(user);
      const userRef = await firebase.firestore().doc(`users/${user.uid}`);
      const snapShot = userRef.get();

      if (!snapShot.exists) {
        const createdAt = new Date();
        try {
          await userRef.set({
            nome,
            cpf,
            email,
            createdAt
          });
          this.setState({ nome: "", cpf: "", email: "", password: "" });
          this.props.navigation.goBack();
        } catch (err) {
          console.log(err);
        }
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Cadastre-se: </Text>
          </View>
          <Form>
            <Item style={styles.itemForm}>
              <Input
                placeholder="nome"
                value={this.state.nome}
                onChangeText={nome => this.setState({ nome })}
              />
            </Item>
            <Item style={styles.itemForm}>
              <Input
                placeholder="cpf"
                value={this.state.cpf}
                onChangeText={cpf => this.setState({ cpf })}
              />
            </Item>
            <Item style={styles.itemForm}>
              <Input
                placeholder="email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item style={styles.itemForm}>
              <Input
                placeholder="senha"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button block style={{ marginTop: 10 }} onPress={this.cadastrar}>
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
  }
});

export default CriarConta;
