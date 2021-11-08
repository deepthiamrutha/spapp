import * as React from 'react';
import {   View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity, } from 'react-native';
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
let customFonts = {
  "HandofKings": require("../assets/fonts/HandofKing.ttf")
};
export default class Profile extends React.Component {
  constructor(props){
    super(props);
  this.state = {
      fontsLoaded: false,
      profile_image: "",
      name: ""
    };
  }
   componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
 async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
      });
this.setState({
      name: name,
      profile_image: image
    });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
           styles.container

          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/rocket_icon.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  styles.appTitleText
                }
              >
              Space Tracker 
              </Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.profile_image }}
                style={styles.profileImage}
              ></Image>
              <Text
                style={
                  styles.nameText
                }
              >
                {this.state.name}
              </Text>
            </View>
            
            <View style={{ flex: 0.3 }} />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}



const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
 
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "HandofKings"
  },
 
  screenContainer: {
    flex: 0.85
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },

  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "HandofKings",
    marginTop: RFValue(10)
  },

   backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
