import React, { Component } from "react";
import { Text, View } from "react-native";

import firebase from "react-native-firebase";

export default class Home extends Component {
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

  render() {
    // console.log(this.state);
    return (
      <View>
        <Text> Bem Vindo {this.state.user.displayName}</Text>
      </View>
    );
  }
}
