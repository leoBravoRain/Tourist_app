import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  // Button,
  Linking,
  ImageBackground,
  FlatList,
  ScrollView,
  TextInput
} from 'react-native';

import { 
  Badge,
  Button,
  Icon
} from 'react-native-elements';

import { WebView } from "react-native-webview";


// Home screen
export default class Add_Video extends Component {


  // Options for header bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Mapa",
      headerRight: (
        <Icon
          raised
          name='map'
          type='font-awesome'  
          onPress={() => navigation.navigate('Map')}
          color='#3f5fe0'
        />
      ),
      headerLeft: (
        <Icon
          raised 
          name='home'
          type='font-awesome'  
          onPress={() => navigation.navigate('Home')}
          color='#3f5fe0'
        />
      ),
    };
  };

  constructor(props) {

    super(props);

    this.state = {

      video: "",

    };

    // This binding is necessary to make `this` work in the callback
    this.add_video = this.add_video.bind(this);

  }


  // add video
  add_video(){

    // Take link
    video_link = this.state.text;

    // Add video of place to server
    fetch('https://tourist-api.herokuapp.com/videos_location/'+ this.props.navigation.state.params.marker.id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // location_id: this.props.navigation.state.params.marker.id,
        location: this.props.navigation.state.params.marker.id,
        link: this.state.text,
      }),
    })
    .catch((error) => {
      console.error(error);
    }); ;

    // go to back page
    // this.props.navigation.goBack();
    this.props.navigation.push("Location_Details", {marker: this.props.navigation.state.params.marker});

  }


  // Render method
  render() {

    return (

      <View style={styles.container}>

        <TextInput
          placeholder = "Pegar link de Youtube aquí"
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 40}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        
        <Button

          raised

          title="Agregar video"

          onPress = {this.add_video}

          buttonStyle = {{

            backgroundColor: "#3f5fe0",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            margin: 30,
            borderRadius: 25

          }}
        />
       

      </View>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  }
});