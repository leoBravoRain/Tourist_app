import React from 'react';
import { 
  Text, 
  View
} from 'react-native';
import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';

import Home from "./screens/home_screen.js"
import Add_Video from "./screens/add_video_screen.js"
import Main_Map from "./screens/map.js"
import Location_Details from "./screens/location_details.js"
import Add_Place from "./screens/add_place_screen.js"

const AppStackNavigator = createStackNavigator(

  {

    Home: Home,
    Add_Video: Add_Video,
    Map: Main_Map,
    Location_Details: Location_Details,
    Add_Place: Add_Place,

  },

  { 
    headerMode: 'screen' 
  },

  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      //  headerStyle: {
      //   backgroundColor: '#3f5fe0',
      // },
      // headerTintColor: '#3f5fe0',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      headerStyle: { backgroundColor: 'red' },
      headerTitleStyle: { color: 'green' },
    }
  },


);


const App = createAppContainer(AppStackNavigator);

export default App;