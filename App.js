import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import AccountScreen from './src/screens/AccountScreen';
import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';
import ImageScreen from './src/components/ImageScreen';
import { APP_GREEN_COLOR } from './src/contansts/constants';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const stack = createStackNavigator();
const tab = createBottomTabNavigator();

const mainFlow = ()=>{
  return(
    <tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <FontAwesome5
                name={
                  focused
                    ? 'indent'
                    : 'indent'
                }
                size={size}
                color={color}
              />
            );
          } 
          else if (route.name === 'Account') {
            return (
              <MaterialCommunityIcons 
                name= {focused ? 'account' : 'account'} 
                size={size} 
                color= {color} />
            );
          }
        },
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: APP_GREEN_COLOR,
      })}
    >
      <tab.Screen
        name = "Home"
        component = {HomeScreen}
        options = {{
          title: "Home",
          headerStyle:{
            backgroundColor: APP_GREEN_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
      <tab.Screen
        name = "Account"
        component = {AccountScreen}
        options = {{
          title: "Account",
          headerStyle:{
            backgroundColor: APP_GREEN_COLOR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
        }}
      />
    </tab.Navigator>
  )
}


const App =  ()=>{
  return(
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name = "Signin"
          component = {SigninScreen}
          options={{
            headerShown: false
          }}
        />

        <stack.Screen
          name = "Signup"
          component  = {SignupScreen}
          options = {{
            headerShown: false
          }}
        />
        <stack.Screen
          name = "mainFlow"
          component  = {mainFlow}
          options = {{
            headerShown: false
          }}
        />
        <stack.Screen
          name = "Result"
          component  = {ResultScreen}
          options = {{
            headerShown: false
          }}
        />

        <stack.Screen
          name = "Image"
          component  = {ImageScreen}
          options = {{
            headerShown: false
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default ()=>{
  return(
    <App/>
  );
};

