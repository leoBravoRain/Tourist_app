import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  PermissionsAndroid,
  NetInfo,
  ScrollView,
  Picker,
   // AppRegistry,
  PixelRatio,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { Button, Icon } from 'react-native-elements';
import { NavigationActions, withNavigation } from 'react-navigation';
import MapView from 'react-native-maps'

class Add_Place extends Component {

  // Initial state
  state = {
    avatarSource: null,
    videoSource: null,
  };

  // Options for header bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Informar peligro",
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

  //Constructor
  constructor(props) {

    super(props);

    this.state = {

      initialPosition: null,

    };

  }


  // Componente will mount
  componentWillMount(){

    // Get user position
    navigator.geolocation.getCurrentPosition(
        (position) => {

            // Position has altitude!!! Maybe we can add altitude to location on map for distinguis between floors in a factory
            this.setState({ initialPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude }})

        },
        (error) => console.log(new Date(), error),
        // {enableHighAccuracy: true, timeout: 100000}
        // If gps is not working, so uncomment next line
        {timeout: 10000, enableHighAccuracy: true}
    ); 

  }

  // manage click on button 
  manage_click(){

    // Variable for send danger to server
    var every_data_filled = true;

    // Message for user because there is a problem
    var message;

    // Add danger to server
    // Add video of place to server
    const url_server = "https://tourist-api.herokuapp.com/location/";

    // Add parameters to post request
  
    // If location is not defined
    if(this.state.initialPosition == null ){

      // Variable for send data to server
      every_data_filled = false;

      // Message for user
      message = "Tenemos problemas para obtener tu ubicación";

    }

    // If there is not a comment
    if(this.state.text == null){

      // Variable for send data to server
      every_data_filled = false;

      // Message for user
      message = "Debes agregar un comentario";

    }

    // It there are all data
    if(every_data_filled){

      // Add video of place to server
      fetch(url_server, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: this.state.initialPosition.latitude,
          longitude: this.state.initialPosition.longitude,
          name: this.state.text,
        }),
      })
      .catch((error) => {
        console.error(error);
      }); ;

      // Alert for response user
      Alert.alert(
        'Lugar agregado',
        'Acabas de agregar lugar al mapa',
        [
          {text: 'Ok', onPress: () => console.log('Ask me later pressed')},
        ],
        { cancelable: false }
      )

      // Back to home
      this.props.navigation.push("Home");

    }

    // IF there is a problem
    else{

      // Alert for user response
      Alert.alert(

        'Tuvimos un problema',
        message,

        [
          {text: 'Intentarlo de nuevo', onPress: () => console.log('Ask me later pressed')},
        ],

        { cancelable: false }

      )

    }

  }

  // Render method
  render() {

    return (

        <View style = {styles.container_flex}>

          {

            this.state.initialPosition === null 

            ?

            (<Text> Activa el GPS </Text>)

            :

            <MapView

              mapType = "satellite"
              initialRegion={{
                latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}

              // showUserLocation
              region = { this.state.initial_region }
              style = {{width: '100%', height: '60%'}}

            >

              <MapView.Marker
                draggable
                coordinate = {this.state.initialPosition}
                pinColor = {"#474744"}
                onDragEnd={(e) => this.setState({ initialPosition: e.nativeEvent.coordinate })}
              />

            </MapView>

          }

          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder = "Agregar nombre al lugar"
            style={{height: 100, width: "80%", borderColor: 'gray', borderWidth: 1, margin: 40}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            maxLength={2000}
          />

          <Button

            raised

            title = {"Agregar lugar"}

            onPress = {this.manage_click.bind(this)}

            buttonStyle={styles.buttonStyle}

          />

        </View>

    );

  }

}

const styles = StyleSheet.create({

  image_background: {

    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'

  },

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  buttonStyle: {
    backgroundColor: "#3f5fe0",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    // borderRadius: 5
  },

  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },

})

export default withNavigation(Add_Place);