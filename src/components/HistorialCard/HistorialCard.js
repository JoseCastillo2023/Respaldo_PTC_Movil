// Importaciones necesarias desde React y React Native
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, Image} from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';
import { FontAwesome } from '@expo/vector-icons';


// Componente CarritoCard que recibe varias props para gestionar los elementos del carrito
const CarritoCard = ({item, imagenProducto, cargarCategorias, modalVisible, setModalVisible,
  cantidadProductoCarrito, setCantidadProductoCarrito, accionBotonDetalle, idDetalle, setIdDetalle,
  getDetalleCarrito, updateDataDetalleCarrito
  }) => {
  const ip = Constantes.IP;
  

  // Función para manejar la eliminación de un detalle del carrito
  const handleDeleteDetalleCarrito = async (idDetalle) => {
    try {
      // Mostrar un mensaje de confirmación antes de eliminar
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este elemento del carrito?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idDetalle', idDetalle);
              const response = await fetch(`${ip}/PTC_2024/api/services/public/order.php?action=deleteDetail`, {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                // Llamar a la función de actualización para actualizar la lista
                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
              } else {
                Alert.alert('Error al eliminar del carrito', data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar del carrito")
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/PTC_2024/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_producto}</Text>
      <Text style={styles.itemText}>Fecha de compra: {item.fecha_registro}</Text>
      <Text style={styles.itemText}>Direccion: {item.direccion_pedido}</Text>
      <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto)).toFixed(2)}</Text>
      <View style={styles.ratingContainer}>
          <Text style={styles.textTitle}>Calificación:</Text>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star-half-o" size={20} color="#FFD700" />
        </View>
    </View>
  );
};

export default CarritoCard;

// Estilos para el componente CarritoCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#bc7a62',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#bc7a62',
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: '#bc7a62',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '65%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8, fontWeight: '500'
  },
});
