import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, SafeAreaView, Image, Modal, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as Constantes from "../utils/constantes";
import Buttons from "../components/Buttons/Button";
import ProductoCard from "../components/Productos/ProductoCard";
import ModalCompra from "../components/Modales/ModalCompra";
import RNPickerSelect from "react-native-picker-select";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

export default function Productos({ navigation }) {
  const ip = Constantes.IP;
  const [dataProductos, setDataProductos] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoModal, setIdProductoModal] = useState("");
  const [nombreProductoModal, setNombreProductoModal] = useState("");

  const Detalle = (idProducto) => {
    navigation.navigate("Detalle", { idProducto });
  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdProductoModal(id);
    setNombreProductoModal(nombre);
  };

  //Metodo para obtener todos los productos
  const getProductos = async (idCategoriaSelect = 1) => {
    try {
      if (idCategoriaSelect <= 0) {
        return;
      }

      const formData = new FormData();
      formData.append("idCategoria", idCategoriaSelect);

      const response = await fetch(
        `${ip}/PTC_2024/api/services/public/producto.php?action=readProductosCategoria`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("data al obtener productos  \n", data);

      if (data.status) {
        const productosConCalificacion = await Promise.all(
          data.dataset.map(async (producto) => {
            const formDataCalificacion = new FormData();
            formDataCalificacion.append("idProducto", producto.id_producto);

            const responseCalificacion = await fetch(
              `${ip}/PTC_2024/api/services/public/producto.php?action=averageRating`,
              {
                method: "POST",
                body: formDataCalificacion,
              }
            );

            const dataCalificacion = await responseCalificacion.json();

            return {
              ...producto,
              calificacionPromedio: dataCalificacion.status
                ? dataCalificacion.dataset.promedio
                : 0,
            };
          })
        );

        setDataProductos(productosConCalificacion);
      } else {
        console.log("Data en el ELSE error productos", data);
        Alert.alert("Error productos", data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  const getCategorias = async () => {
    try {
      const response = await fetch(
        `${ip}/PTC_2024/api/services/public/categoria.php?action=readAll`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.status) {
        setDataCategorias(data.dataset);
      } else {
        console.log(data);
        Alert.alert("Error categorias", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar las categorias");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProductos();
      getCategorias();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => getProductos(value)}
              placeholder={{ label: "Selecciona una categoría...", value: null }}
              items={dataCategorias.map((categoria) => ({
                label: categoria.nombre,
                value: categoria.id_categoria,
              }))}
            />
          </View>
          {dataProductos.map((item) => (
            <ProductoCard
              key={item.id_producto}
              ip={ip}
              imagenProducto={item.imagen_producto}
              idProducto={item.id_producto}
              nombreProducto={item.nombre_producto}
              descripcionProducto={item.descripcion_producto}
              precioProducto={item.precio_producto}
              existenciasProducto={item.existencias_producto}
              calificacionPromedio={item.calificacionPromedio} // Añadir calificación promedio aquí
              accionBotonProducto={() =>
                handleCompra(item.nombre_producto, item.id_producto)
              }
              Detalle={() => Detalle(item.id_producto)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff0",
    paddingTop: Constants.statusBarHeight,
  },
  pickerWrapper: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#16537E",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 17,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#16537E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
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
  textDentro: {
    fontWeight: "400",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#FFF",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16537E",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 5,
    color: "#FFF",
  },
  pickerContainer: {
    alignItems: "center",
    borderColor: "#16537E",
    borderRadius: 20,
    backgroundColor: "#16537E",
    color: "#FFF",
  },
  picker: {
    color: "#FFF",
    borderRadius: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#16537E",
    color: "#FFF",
  },
  placeholder: {
    color: '#FFF',
    fontSize: 15,
  },
  viewContainer: {
    borderRadius: 20,
    backgroundColor: "#16537E",
    paddingHorizontal: 15,
    paddingVertical: 1,
  },
});
