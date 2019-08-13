import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default class ItemListAvaliacoes extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={styles.viewItem}>
            <Text style={styles.label}>
              Qual seu nível de satisfação com o aplicativo?
            </Text>
            <Text style={styles.value}>{this.props.item.respostas[0]}</Text>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.label}>Classificação: </Text>
            <Text style={styles.value}>{this.props.item.rating} de 5</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    color: "#FFF",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  viewItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16
  },
  label: {
    fontWeight: "bold"
  }
});
