import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa las pantallas necesarias
import SplashScreen from './src/screens/SplashScreen';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Index from './src/screens/Index';
import EditUser from './src/screens/EditUser';
import TabNavigator from './src/tabNavigator/TabNavigator';
import Recuperacion from './src/screens/Recuperacion';
import Historial from './src/screens/Historial';
import Detalle from './src/screens/Detalle';
import Productos from './src/screens/Productos';
import Codigo from './src/screens/Codigo';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Index'
          component={Index}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditUser'
          component={EditUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TabNavigator'
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Recuperacion'
          component={Recuperacion}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name='Historial'
          component={Historial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Detalle'
          component={Detalle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Productos'
          component={Productos}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name='Codigo'
          component={Codigo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
