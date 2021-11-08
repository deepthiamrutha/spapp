import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

export default class IssLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getISSLocation();
    setInterval(async () => {
      this.getISSLocation();
    }, 5000);
  }

  getISSLocation = async () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({ location: response.data });
        console.log(this.state.location);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.backgroundImage}>
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>ISS Location</Text>
            </View>
            <MapView
              style={styles.mapContainer}
              region={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}>
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}>
                <Image
                  source={require('../assets/iss_icon.png')}
                  style={{ height: 50, width: 50 }}
                />
              </Marker>
            </MapView>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Latitude : {this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude : {this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude(KM) : {this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocity(km/hour) : {this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#b3ddf5',
    fontFamily: 'Algerian',
    alignSelf: 'center',
    marginTop: 20,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 0.6,
    width: '100%',
    height: '100%',
  },
  infoBox: {
    backgroundColor: 'white',
    flex: 0.2,
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
