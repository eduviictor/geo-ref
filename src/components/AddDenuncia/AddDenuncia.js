import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
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
  Thumbnail
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

  state = {
    location: null,
    locationPermission: null
  };

  // requestPermissionLocation = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Example App",
  //         message: "Example App access to your location "
  //       }
  //     )
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location")
  //       alert("You can use the location");
  //     } else {
  //       console.log("location permission denied")
  //       alert("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // async componentWillMount() {
  //   await this.requestPermissionLocation();
  // }

  componentDidMount() {
    Permissions.check("location").then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
    });
    this._requestPermission();
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
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: false,
        timeout: 20000
        // maximumAge: 1000
      }
    );
  };

  render() {
    console.log(this.state);
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
              <Thumbnail
                large
                source={{
                  uri:
                    dataImage !== null
                      ? "data:image/jpeg;base64," + dataImage.base64
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
            </Item>
            <Item style={styles.itemForm}>
              <Input placeholder="email" />
            </Item>
            <Button
              block
              style={{ marginTop: 10 }}
              onPress={this.findCoordinates}
            >
              <Text style={styles.textButton}>Achar minhas cordenadas</Text>
            </Button>
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
    justifyContent: "space-around",
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default withNavigationFocus(AddDenuncia);
