import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, ScrollView } from "react-native";
import { withNavigationFocus } from "react-navigation";
import Permissions from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
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

const problems = [
  "Caixa d'agua de distribuição com problemas",
  "Encanamento aparente/visível",
  "Encanamento quebrado",
  "Encanamento com vazamento",
  "Emergência de água à superficie",
  "Falta de abastecimento",
  "Instalação ilegal",
  "Esgoto a céu aberto",
  "Esgoto quebrado",
  "Sistema de escoamento danificado/entupido",
  "Transbordamento de esgoto",
  "Vazamento em esgoto",
  "Má disposição de resíduos",
  "Problemas em drenagem"
];

class AddDenuncia extends Component {
  static navigationOptions = {
    title: "Adicionar Denuncia"
  };

  state = {
    location: null,
    locationPermission: null,
    adressGeo: null,
    nome: "",
    enderecoProblema: "",
    pontoReferencia: "",
    problema: "",
    cidade: "",
    latitude: null,
    longitude: null,
    informacoesAdicionais: "",
    buttonDisable: false
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  onValueChange = value => {
    this.setState({ problema: value });
  };

  componentDidMount() {
    Permissions.check("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
    // this._requestPermission();
    // Geolocation.setRNConfiguration();
  }

  _requestPermission = () => {
    Permissions.request("location").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
  };

  findCoordinates = () => {
    this._requestPermission();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?key=b77df8fd45d4451982f93421aa8bb451&q=${encodeURIComponent(
            position.coords.latitude + "," + position.coords.longitude
          )}&pretty=1&no_annotations=1`
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ adressGeo: data.results[0] });
            this.setState({
              enderecoProblema: data.results[0].formatted,
              cidade: data.results[0].components.city_district
            });
          })
          .catch(err => console.log(err));
      },
      error => {
        if (error.message === "No location provider available.") {
          Alert.alert("Ligue a localização do dispositivo.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };

  handleEmail = dataImage => {
    this.setState({ buttonDisable: true });
    if (
      this.state.enderecoProblema === "" ||
      !dataImage ||
      this.state.cidade === "" ||
      this.state.pontoReferencia === ""
    ) {
      Alert.alert("Campos obrigatórios não preenchidos (*)");
      this.setState({ buttonDisable: false });
    } else {
      const objSend = {
        problema: this.state.problema,
        enderecoProblema: this.state.enderecoProblema,
        pontoReferencia: this.state.pontoReferencia,
        informacoesAdicionais: this.state.informacoesAdicionais,
        cidade: this.state.cidade,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        base64Image: "data:image/jpeg;base64," + dataImage.base64
      };
      fetch("https://node-api-nodemailer.herokuapp.com/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objSend)
      })
        .then(res => {
          Alert.alert("Denúncia realizada com sucesso!");
          this.setState({ buttonDisable: false }, () =>
            this.props.navigation.goBack()
          );
        })
        .catch(err => {
          console.log(err);
          this.setState({ buttonDisable: false }, () =>
            this.props.navigation.goBack()
          );
        });
    }
  };

  render() {
    console.log("state", this.state);
    const dataImage =
      this.props.navigation.getParam("image") === undefined
        ? null
        : this.props.navigation.getParam("image");

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
              <Item stackedLabel style={styles.itemForm}>
                <Label>*Endereço</Label>
                <Input
                  placeholder="clique para pegar as coordenadas"
                  name="enderecoProblema"
                  // onChangeText={value =>
                  //   this.handleChange(value, "enderecoProblema")
                  // }
                  value={this.state.enderecoProblema}
                />
              </Item>
              <Item stackedLabel style={styles.itemForm}>
                <Label>*Cidade</Label>
                <Input
                  placeholder="clique para pegar as coordenadas"
                  name="cidade"
                  // onChangeText={value => this.handleChange(value, "cidade")}
                  value={this.state.cidade}
                />
              </Item>
              <Item stackedLabel style={styles.itemForm}>
                <Label>*Ponto de referência</Label>
                <Input
                  // placeholder="ponto de referência"
                  name="pontoReferencia"
                  onChangeText={value =>
                    this.handleChange(value, "pontoReferencia")
                  }
                  value={this.state.pontoReferencia}
                />
              </Item>

              <Item style={styles.itemForm}>
                <Picker
                  mode="dropdown"
                  placeholder="Selecione seu problema"
                  selectedValue={this.state.problema}
                  onValueChange={this.onValueChange}
                >
                  {problems.map((item, index) => (
                    <Picker.Item value={item} label={item} key={index} />
                  ))}
                </Picker>
              </Item>

              <Item stackedLabel style={styles.rowImage}>
                <Label>*Imagem</Label>
                <View style={styles.containerImagem}>
                  <Thumbnail
                    large
                    source={{
                      uri:
                        dataImage !== null
                          ? dataImage.uri
                          : "https://via.placeholder.com/150"
                    }}
                  />
                  <Button
                    onPress={() => this.props.navigation.navigate("Camera")}
                    light
                    style={{
                      padding: 10
                    }}
                  >
                    <Text>Tirar Foto</Text>
                  </Button>
                </View>
              </Item>
              <Item stackedLabel style={styles.itemForm}>
                <Label>Informações adicionais</Label>
                <Input
                  // placeholder="informações adicionais"
                  name="informacoesAdicionais"
                  onChangeText={value =>
                    this.handleChange(value, "informacoesAdicionais")
                  }
                  value={this.state.informacoesAdicionais}
                />
              </Item>
              <Button
                block
                style={{ marginTop: 10 }}
                onPress={this.findCoordinates}
              >
                <Text style={styles.textButton}>Pegar minhas cordenadas</Text>
              </Button>
              <Button
                disabled={this.state.buttonDisable}
                block
                style={{ marginTop: 10 }}
                onPress={() => this.handleEmail(dataImage)}
              >
                <Text style={styles.textButton}>Cadastrar Denúncia</Text>
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

export default withNavigationFocus(AddDenuncia);
