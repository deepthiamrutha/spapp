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
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }
  componentDidMount() {
    this.getNews();
  }
  getNews = () => {
    axios
      .get('https://api.spaceflightnewsapi.net/v3/articles')
      .then((response) => {
        this.setState({ news: response.data });
        console.log(this.state.news);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  renderItem = ({ item }) => {
    let date = item.publishedAt.slice(0, 10);
    return (
      <View style={styles.newsContainer}>
        <View style={styles.textCont}>
          <Image style={styles.storyImage} source={{ uri: item.imageUrl }} />

          <Text style={styles.titleText}> {item.title}</Text>
          <Text style={styles.text}> {item.summary}</Text>
          <Text style={styles.text}> {date}</Text>
        </View>
        <View style={styles.urlStyl}>
        <TouchableOpacity
          onPress={async () => {
            await Linking.openURL(item.url);
          }}>
          <Text >{item.url}</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/backgroundimg.jpg')}
          style={styles.backgroundImage}>
          <Text style={styles.paragraph}>News</Text>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.news}
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

    backgroundColor: 'black',
    padding: 8,
  },
  
  paragraph: {
    fontSize: 40,
    fontFamily: 'Algerian',
    fontWeight: 'bold',
    color: '#b3ddf5',
    alignSelf: 'center',
 marginTop: RFValue(20),
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  storyImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(200),
    borderColor: "grey",
    borderWidth: 5,

  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  textCont: {
    margin: RFValue(13),
   borderRadius: RFValue(20),
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
   urlStyl:{
    backgroundColor:"#6c6e6780",
    
  },
});
