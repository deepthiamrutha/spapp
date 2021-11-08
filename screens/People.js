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
  Dimensions,
  ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: null,
      person: [],
    };
  }
  componentDidMount() {
    this.getPerson();
  }
  getPerson = () => {
    axios
      .get('http://api.open-notify.org/astros.json')
      .then((response) => {
        this.setState({
          num: response.data.number,
          person: response.data.people,
        });
        console.log(this.state.person);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.newsContainer}>
        <Text style={styles.nameStyle}> {item.name}</Text>
        <Text style={styles.textStyle}> {item.craft}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
         <ImageBackground source={require('../assets/backgroundimg.jpg')}
          style={styles.backgroundImage}>
        <Text style={styles.paragraph}>NUMBER OF PEOPLE :{this.state.num}</Text>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.person}
          renderItem={this.renderItem}
        />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   backgroundColor:"black",
    padding: 8,
  },
  paragraph: {
     fontSize: 30,
    fontFamily: 'Algerian',
    fontWeight: 'bold',
    color: '#b3ddf5',
    alignSelf: 'center',
 marginTop: RFValue(20),
 textAlign:"center",
  },
  newsContainer: {
    flexDirection: 'row',
     borderWidthColor:"white",
     backgroundColor:"#162131",
  },
  textStyle: {
    borderWidth: RFValue(4),
    fontSize: RFValue(20),
     borderWidthColor:"white",
    flex:0.3,
    color:"white",
  },
  nameStyle:{
    borderWidth: RFValue(4),
    borderWidthColor:"white",
    fontSize: RFValue(20),
    flex:0.7,
    color:"white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
   
});
