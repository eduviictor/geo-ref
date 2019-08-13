import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import ItemListAvaliacoes from "../ItemListAvaliacoes/ItemListAvaliacoes";
import { Icon } from "native-base";

export default class ListAvaliacoes extends Component {
  // onSelect = selected => {
  //   this.setState(selected);
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Avaliações",
      headerRight: (
        <Icon
          type="MaterialIcons"
          name="add"
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate("Avaliacao")}
        />
      )
    };
  };

  state = {
    data: null,
    selected: false
  };

  renderItem = ({ item }) => <ItemListAvaliacoes item={item} />;

  componentDidMount() {
    fetch("https://node-api-nodemailer.herokuapp.com/listReports")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ data: data.reverse() });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  list: {
    padding: 10
  }
});
