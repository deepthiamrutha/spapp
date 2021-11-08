import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }
  componentDidMount() {
    this.getMeteor();
  }
  getMeteor = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?&api_key=CC5MO1qP5HjQeFN1tIrTg6vELZ6CVJY7MOwJxitu"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  renderItem = ({ item }) => {
    var meteor =item ;
    var bgImg,speed,size;
    if(meteor.threat_score<=30){
      bgImg=require("../assets/meteor_bg1.png");
      speed=require("../assets/meteor_speed1.gif");
      size=100;
    }
   else if(meteor.threat_score<=75){
      bgImg=require("../assets/meteor_bg2.png");
      speed=require("../assets/meteor_speed2.gif");
      size=150;
    }
    else{
      bgImg=require("../assets/meteor_bg3.png");
      speed=require("../assets/meteor_speed3.gif");
      size=200;
    }
    return(
      <View>
      <ImageBackground source={bgImg} style={styles.backgroundImage}>
      <View style={styles.mContainer}>
      <Image source={speed} style={{width:size,height:size,alignSelf:"center",marginTop:50,}}/>
      </View>
      <Text style={styles.title}>{item.name} </Text>
       <Text style={styles.dataText}>CLOSEST TO EARTH: {item.close_approach_data[0].close_approach_date_full} </Text>
         <Text style={styles.dataText}>MISSING EARTH BY (KM): {item.close_approach_data[0].miss_distance.kilometers} </Text>
          <Text style={styles.dataText}>RELATIVE VELOCITY (KM/HOUR): {item.close_approach_data[0].relative_velocity.kilometers_per_hour} </Text>
          <Text style={styles.dataText}>MINIMUM DIAMETER(KM): {item.estimated_diameter.kilometers.estimated_diameter_min} </Text>
          <Text style={styles.dataText}>MAXIMUM DIAMETER(KM): {item.estimated_diameter.kilometers.estimated_diameter_max} </Text>
      </ImageBackground>
      </View>
    )
  };
  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text>Loading..</Text>
        </View>
      );
    } else {
      var meteorArray = Object.keys(this.state.meteors).map((meteorDate) => {
        return this.state.meteors[meteorDate];
      });
      let meteors = [].concat.apply([], meteorArray);

      meteors.forEach(function (item) {
        let diameter =
          (item.estimated_diameter.kilometers.estimated_diameter_min +
            item.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / item.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        item.threat_score = threatScore;
      });
      meteors.sort(function (a, b) {
        return b.threat_score - a.threat_score;
      });
      meteors = meteors.slice(0, 5);
      return (
        <View
          style={{
            flex: 1,
          }}>
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            data={meteors}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    
  },
  mContainer:{
justifyContent:"center",
flex:1,

  },
  title:{
color :"white",
fontSize:20,
fontWeight:"bold",
marginTop:400,
fontFamily:"algerian"
  },
  dataText:{
    color :"white",
    fontWeight:"bold",
    fontFamily:"Palatino Linotype",
  }
});
