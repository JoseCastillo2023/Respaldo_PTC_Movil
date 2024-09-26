// Importaciones necesarias desde React y React Native
import React from "react";
import { StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

// Componente MaskedInputDui que muestra un campo de entrada con máscara para el DUI
export default function MaskedInputDui({ dui, setDui }) {
  return (
    <TextInputMask
      style={styles.Input}
      placeholder="Dui"
      placeholderTextColor="#16537E"
      type={"custom"}
      options={{
        mask: "99999999-9",
      }}
      value={dui}
      onChangeText={setDui}
    />
  );
}

// Estilos para el componente MaskedInputDui
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
