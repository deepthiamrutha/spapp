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
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { FlatList } from "react-native-gesture-handler";

export default class Blogs extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }
  componentDidMount() {
    this.getBlogs();
  }
  getBlogs = () => {
    axios
      .get(
        "https://api.spaceflightnewsapi.net/v3/blogs"
      )
      .then((response) => {

        this.setState({ blogs: response.data });
        console.log(this.state.blogs)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  renderItem = ({ item }) => {
    let date=item.publishedAt.slice(0,10)
    return (
      <View style={styles.newsContainer}>
      <View style={styles.textCont}>
      <Image style={styles.blogImage} source={{uri:item.imageUrl}}/>

      < Text style={styles.titleText}> {item.title}</Text>
      < Text style={styles.text}> {item.summary}</Text>
      < Text style={styles.text}> {date}</Text>
      <View style={styles.urlStyl}>
      <TouchableOpacity onPress={async()=>{ await Linking.openURL(item.url);}}>
      <Text styles={styles.text}>
      {item.url}
      </Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
        <ImageBackground source={require("../assets/backgroundimg.jpg")} style={styles.backgroundImage}>
        <Text style={styles.paragraph}>Blogs</Text>
         <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.blogs}
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
   blogImage: {
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
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  textCont:{
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
    backgroundColor:"#6c6e67",
  },
});
