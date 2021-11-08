import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
export default class News extends React.Component {
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
         <View style={{flex:0.92}}>
        <Text style={styles.paragraph}>Additional Resources</Text>
        <TouchableOpacity
          onPress={async () => {
            await Linking.openURL('https://epic.gsfc.nasa.gov/');
          }}>
          <Text style={styles.titleText}>DSCOVR:EPIC</Text>
          <Image
            source={require('../assets/earth.PNG')}
            style={styles.imageSty}
          />
          <Text style={styles.text}> "This is provided by NASA's Epic EARTH IMAGERY."</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await Linking.openURL(
              'https://www.planet.com/explorer/#/zoom/2.44/mosaic/431b62a0-eaf9-45e7-acf1-d58278176d52.global_monthly_2021_06_mosaic/center/14.595,2.341'
            );
          }}>
          <Text style={styles.titleText}>World Imagery</Text>
          <Image
            source={require('../assets/world.PNG')}
            style={styles.imageSty}
          />
          <Text style={styles.text}> This Is Provided By planet.com (AN ACCOUNT IS NEEDED)</Text>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#101A28',
    padding: 8,
  },
  paragraph: {
    fontSize: 40,
    fontFamily: 'Algerian',
    fontWeight: 'bold',
    color: '#b3ddf5',
    alignSelf: 'center',
    justifyContent:"center",
    textAlign:"center",

  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  imageSty: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(200),
  },
  titleText: {
    fontStyle: 'bold',
   textAlign:"center",
    fontSize: RFValue(25),
    color: '#d7effc',
    alignSelf: 'center',
    alignContent: 'center',
    textDecorationLine: 'underline',
    textShadowColor:"white",
    textDecorationColor:"red",
  },
  text:{
    textAlign:"center",
    fontSize: RFValue(20),
    color: 'white',
    alignSelf: 'center',
  },
 
});
