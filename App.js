import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { registerRootComponent } from "expo";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import History from "./components/History";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator,createAppContainer } from '@react-navigation/stack';
import EntryDetail from './components/EntryDetails'
import Constants from "expo-constants";
import Lives from "./components/Live"
import { setLocalNotification } from './utils/helpers'


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs =
    Platform.OS === "ios"
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();


const TabNav = () => (
    <Tabs.Navigator
        initialRouteName="AddEntry"
        screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                let icon;
                if (route.name === "Add Entry") {
                    icon = (
                        <FontAwesome name="plus-square" size={size} color={color}/>
                    );
                } else if (route.name === "History") {
                    icon = (
                        <Ionicons name="ios-bookmarks" size={size} color={color}/>
                    );
                } else if(route.name === "Live"){
                  icon= (
                    <Ionicons name="ios-speedometer" size={size} color={color} />
                  )
                }
                return icon;
            }
        })}
        tabBarOptions={{
            header: null,
            activeTintColor: Platform.OS === "ios" ? purple : white,
            showIcon: true,
            style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }}
    >
        <Tabs.Screen name="Add Entry" component={AddEntry}/>
        <Tabs.Screen name="History" component={History}/>
        <Tabs.Screen name="Live" component={Lives}  />
    </Tabs.Navigator>
);


const Stack = createStackNavigator();
const MainNav = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Home"
            component={TabNav}
            options={{headerShown: false}}/>
        <Stack.Screen
            name="EntryDetail"
            component={EntryDetail}
            options={{
                headerTintColor: white, headerStyle: {
                    backgroundColor: purple,
                }
            }}/>
    </Stack.Navigator>
);


export default class App extends React.Component {
  
  componentDidMount() {
    setLocalNotification();
  }


    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                        <MainNav/>
                    </NavigationContainer>
                </View>
            </Provider>

        );
    }
}

// const RouteConfigs = {
//   History: {
//     name: "History",
//     component: History,
//     options: {
//       tabBarIcon: ({ tintColor }) => (
//         <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
//       ),
//       title: "History",
//     },
//   },
//   AddEntry: {
//     component: AddEntry,
//     name: "Add Entry",
//     options: {
//       tabBarIcon: ({ tintColor }) => (
//         <FontAwesome name="plus-square" size={30} color={tintColor} />
//       ),
//       title: "Add Entry",
//     },
//   },
// };

// const TabNavigatorConfig = {
//   navigationOptions: {
//     header: null,
//   },
//   tabBarOptions: {
//     activeTintColor: Platform.OS === "ios" ? purple : white,
//     style: {
//       height: 56,
//       backgroundColor: Platform.OS === "ios" ? white : purple,
//       shadowColor: "rgba(0, 0, 0, 0.24)",
//       shadowOffset: {
//         width: 0,
//         height: 3,
//       },
//       shadowRadius: 6,
//       shadowOpacity: 1,
//     },
//   },
// };

// const Tab =
//   Platform.OS === "ios"
//     ? createBottomTabNavigator()
//     : createMaterialTopTabNavigator();

// const MainNavigator = createStackNavigator({
//     home: {
//       screen: Tab,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     EntryDetail: {
//       screen: EntryDetail,
//       navigationOptions: ({ navigation }) => ({
//         headerTintColor: white,
//         headerStyle: {
//           backgroundColor: purple,
//         },
//       }),
//     },
//   });

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={createStore(reducer)}>
//         <View style={{ flex: 1 }}>
//           <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />

//           <NavigationContainer>
//             <Tab.Navigator {...TabNavigatorConfig}>
//               <Tab.Screen {...RouteConfigs["History"]} />
//               <Tab.Screen {...RouteConfigs["AddEntry"]} />
//             </Tab.Navigator>
//             <MainNavigator />
//           </NavigationContainer>
//         </View>
//       </Provider>
//     );
//   }
// }
// registerRootComponent(App);
