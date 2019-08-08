import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Container, Content, Form, Item, Input, Button } from "native-base";
import firebase from "react-native-firebase";

import { createStackNavigator, createAppContainer } from "react-navigation";
import CriarConta from "./src/pages/CriarConta/criar-conta";
import Home from "./src/pages/Home/home";
import AddDenuncia from "./src/components/AddDenuncia/AddDenuncia";
import Camera from "./src/components/Camera/Camera";

class App extends Component {
  state = {
    emailAuth: "",
    passwordAuth: "",
    user: null,
    loginDisable: false
  };

  static navigationOptions = {
    title: "GeoRef"
  };

  login = async () => {
    this.setState({ loginDisable: true });
    const { emailAuth, passwordAuth } = this.state;

    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(emailAuth, passwordAuth);
      this.setState({ user, emailAuth: "", passwordAuth: "" });
      this.props.navigation.navigate("Home", { user: this.state.user });
      this.setState({ loginDisable: false });
    } catch (err) {
      console.log(err);
      this.setState({ loginDisable: false });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Faça seu login: </Text>
          </View>
          <Form>
            <Item style={styles.itemForm}>
              <Input
                placeholder="email"
                value={this.state.emailAuth}
                onChangeText={emailAuth => this.setState({ emailAuth })}
              />
            </Item>
            <Item style={styles.itemForm}>
              <Input
                placeholder="senha"
                value={this.state.passwordAuth}
                onChangeText={passwordAuth => this.setState({ passwordAuth })}
              />
            </Item>
            <Button
              block
              style={{ marginTop: 10 }}
              disabled={this.state.loginDisable}
              onPress={this.login}
            >
              <Text style={styles.textButton}>Fazer Login</Text>
            </Button>
            <Button
              block
              style={{ marginTop: 10 }}
              onPress={() => this.props.navigation.navigate("CriarConta")}
            >
              <Text style={styles.textButton}>Criar Conta</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator({
  App,
  AddDenuncia,
  Home,
  CriarConta,
  Camera
});

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

export default createAppContainer(AppNavigator);
