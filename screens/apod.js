import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  HandofKings: require('../assets/fonts/HandofKing.ttf'),
  AuntieFont: require('../assets/fonts/Auntie.ttf'),
  Hantly: require('../assets/fonts/Hantlay.ttf'),
  Algerian: require('../assets/fonts/AlgerianRegular.ttf'),
};

export default class Apod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picsData: '',

      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.getApod();
  }
  getApod = () => {
    axios
      .get(
        ' https://api.nasa.gov/planetary/apod?&api_key=QxehKJwZu4SXNW3ukc0UCGULNHIBRHlVidNYbku6'
      )
      .then((response) => {
        this.setState({ picsData: response.data.url });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={{
              uri: this.state.picsData,
            }}
            style={styles.picDay}>
            <Text style={styles.paragraph}> Welcome </Text>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 40,
    fontFamily: 'Algerian',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',

    marginTop: RFValue(20),
  },
  picDay: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
