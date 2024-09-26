import { StyleSheet, TextInput } from "react-native";
import React from "react";

// Componente InputMultiline que recibe varias props para gestionar el valor, el texto y si es seguro
export default function Input({ placeHolder, valor, contra, setTextChange }) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      onChangeText={setTextChange}
      secureTextEntry={contra} // Controla si se debe ocultar el texto
      placeholderTextColor="#16537E"
    />
  );
}

// Estilos para el componente InputMultiline
const styles = StyleSheet.create({
  Input: {
    backgroundColor: "#FFF",
    color: "#16537E",
    fontWeight: "500",
    width: 320,
    height: 45,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#16537E",
  },
});
