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
  ProgressBarAndroid
} from 'react-native';

import { 
  Badge,
  Button,
  Icon
} from 'react-native-elements';

import { WebView } from "react-native-webview";

// Index for video
var index = 0;

// Home screen
export default class Location_Details extends Component {


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

      // video: videos_list[index],
      index: index,
      get_videos: false,

    };

    // This binding is necessary to make `this` work in the callback
    this.next_video = this.next_video.bind(this);
    this.add_video = this.add_video.bind(this);
    this.back_video = this.back_video.bind(this);

  }

  // Component will mount
  componentWillMount(){

    // Fetch data from server
    fetch('https://tourist-api.herokuapp.com/videos_location/' + this.props.navigation.state.params.marker.id)
          .then((response) => response.json())
          .then((responseJson) => {

            const videos_list = responseJson;

            this.setState({

              // Get list of json objects
              // Reverse for get the last video uploaded 
              // videos_list: videos_list.reverse(),
              videos_list: videos_list,
              // get_markers: true,
              video: videos_list[index],
              // videos_list_length : videos_list.lenght
              get_videos: true,

            });

          })
          .catch((error) => {
            console.error(error);
          }); 

  }


  //manage click
  next_video(){

    // Update index
    new_index = this.state.index + 1;


    // if video_index is less than max lenght
    if((new_index + 1) > this.state.videos_list.length){

      // restart index
      new_index = 0;

    }

    // Update info
    this.setState({ 

      index: new_index,
      video: this.state.videos_list[new_index]

    })

  }

  // back video
  back_video(){

    // Update index
    new_index = this.state.index - 1;

    // if video_index is less than 0
    if((new_index ) < 0 ){

      // restart index
      new_index = this.state.videos_list.length - 1;

    }

    // Update info
    this.setState({ 

      index: new_index,
      video: this.state.videos_list[new_index]

    })

  }

  // add video
  add_video(){

    // Next page
    this.props.navigation.push("Add_Video", {marker: this.props.navigation.state.params.marker});

  }


  // Render method
  render() {

    return (

      <View style={styles.container}>

        { this.state.get_videos ? 

          <WebView

            source={{ uri: this.state.video.link }}

            style={styles.video}
          />

          :

          <ProgressBarAndroid />

        }


          <Text>

            {this.props.navigation.state.params.marker.name}

          </Text>

          <Button

            raised

            title="Próximo video"

            onPress = {this.next_video}

            buttonStyle = {{

              backgroundColor: "#3f5fe0",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              margin: 30,
              // borderRadius: 5

            }}
          />

          <Button

            raised

            title="Video Anterior"

            onPress = {this.back_video}

            buttonStyle = {{

              backgroundColor: "#3f5fe0",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              margin: 30,
              // borderRadius: 5

            }}
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
              // borderRadius: 5

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