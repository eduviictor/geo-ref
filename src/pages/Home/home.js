import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Button, Container, Content } from "native-base";
import email from "react-native-email";

import firebase from "react-native-firebase";

export default class Home extends Component {
  static navigationOptions = {
    title: "SaneReport"
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      user: navigation.getParam("user")
    };
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection("users");
  }

  componentDidMount() {
    // console.log("ref", this.ref.get().then(() => console.log("teste")));
    this.ref
      .doc(this.state.user.uid)
      .get()
      .then(doc => console.log(doc.data));
    // .get()
    // .then(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // })
    // .catch(err => console.log(err));
    // this.unsubscribe = this.ref.onSnapshot(this.getUserFromId);
  }

  // componentWil
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }lUnmount() {
  //   this.unsubscribe();
  // }

  // getUserFromId = querySnapshot => {
  // querySnapshot.forEach(doc => {
  //   const { email, nome, cpf } = doc.data();
  //   this.setState({ nome, email, cpf });
  // });
  // const userRef = firebase
  //   .firestore()
  //   .collection("users")
  //   .doc(this.state.user.uid);
  // console.log("userRef", userRef);
  // userRef
  //   .get()
  //   .then(doc => console.log(doc.data))
  //   .catch(err => console.log(err));
  // // this.setState({ userData: data });
  // };

  openEmail = () => {
    const to = ["georef2019@gmail.com"];
    email(to, {
      cc: ["eduvictornobrega@gmail.com"]
    });
  };

  render() {
    console.log(this.state);
    return (
      <Container style={styles.container}>
        {/* <Text> Bem Vindo {this.state.user.displayName}</Text> */}
        <Content>
          <Button
            primary
            style={styles.button}
            onPress={() => this.props.navigation.navigate("AddDenuncia")}
          >
            <Text style={styles.textButton}>Cadastrar Denúncia</Text>
          </Button>
          <Button primary style={styles.button} onPress={this.openEmail}>
            <Text style={styles.textButton}>Fale Conosco</Text>
          </Button>
          <Button
            primary
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Avaliacao")}
          >
            <Text style={styles.textButton}>Avaliar Aplicativo</Text>
          </Button>
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
    height: "auto",
    padding: 20
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  textButton: {
    color: "white"
  }
});
