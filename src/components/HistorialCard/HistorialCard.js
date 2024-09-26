// Importaciones necesarias desde React y React Native
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as Constantes from "../../utils/constantes";
import { FontAwesome } from "@expo/vector-icons";

// Componente HistorialCard que recibe varias props para gestionar los elementos del Historial
const HistorialCard = ({
  item,
  imagenProducto,
  cargarCategorias,
  modalVisible,
  setModalVisible,
  cantidadProductoHistorial,
  setCantidadProductoHistorial,
  accionBotonDetalle,
  idDetalle,
  setIdDetalle,
  getDetalleHistorial,
  updateDataDetalleHistorial,
}) => {
  const ip = Constantes.IP;

  // Función para manejar la eliminación de un detalle del Historial
  const handleDeleteDetalleHistorial = async (idDetalle) => {
    try {
      // Mostrar un mensaje de confirmación antes de eliminar
      Alert.alert(
        "Confirmación",
        "¿Estás seguro de que deseas eliminar este elemento del Historial?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: async () => {
              const formData = new FormData();
              formData.append("idDetalle", idDetalle);
              const response = await fetch(
                `${ip}/PTC_2024/api/services/public/order.php?action=deleteDetail`,
                {
                  method: "POST",
                  body: formData,
                }
              );
              const data = await response.json();
              if (data.status) {
                Alert.alert("Datos eliminados correctamente del Historial");
                // Llamar a la función de actualización para actualizar la lista
                updateDataDetalleHistorial((prevData) =>
                  prevData.filter((item) => item.id_detalle !== idDetalle)
                );
              } else {
                Alert.alert("Error al eliminar del Historial", data.error);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar del Historial");
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${ip}/PTC_2024/api/images/productos/${imagenProducto}`,
          }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_producto}</Text>
      <Text style={styles.itemText}>
        Fecha de compra: {item.fecha_registro}
      </Text>
      <Text style={styles.itemText}>Direccion: {item.direccion_pedido}</Text>
      <Text style={styles.itemText}>
        SubTotal: $
        {(
          parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto)
        ).toFixed(2)}
      </Text>
    </View>
  );
};

export default HistorialCard;

// Estilos para el componente HistorialCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#5C3D2E",
  },
  itemContainer: {
    width: "92%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    marginVertical: 12,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#000000",
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: "#16537E",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#16537E",
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#000000",
    marginVertical: 4,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: "#16537E",
    padding: 16,
    borderRadius: 20,
    marginVertical: 8,
  },
  finalButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  containerButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "65%",
    height: 150,
    borderRadius: 20,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
});
