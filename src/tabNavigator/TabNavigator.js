import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, View } from "react-native";

// Importa tus componentes de pantalla aquí
import Home from '../screens/Home';
import Productos from '../screens/Productos';
import Carrito from '../screens/Carrito';
import Historial from '../screens/Historial';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Oculta el header
        tabBarActiveTintColor: '#FFF', // Color de los íconos activos
        tabBarInactiveTintColor: '#FFF', // Color de los íconos inactivos
        tabBarStyle: {
          backgroundColor: '#312323',
          height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
          borderTopWidth: 0
        }, // Estilo de la barra de pestañas
        tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
          let iconName;
          if (route.name === 'Productos') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Historial') {
            iconName = focused ? 'time' : 'time-outline';
          }
          return (
            <View
              style={{
                width: 50, 
                height: 40, 
                borderRadius: 15, 
                backgroundColor: focused ? "#bc7a62" : "#312323", 
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name={iconName} color={color} size={size} />
            </View>
          );
        },
      })}
    >

      <Tab.Screen
        name="Productos"
        component={Productos}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: 'Carrito' }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{ title: 'Historial' }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Cuenta' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

