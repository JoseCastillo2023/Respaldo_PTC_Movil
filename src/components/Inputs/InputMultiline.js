import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

// Componente InputMultiline que recibe varias props para gestionar el valor y los cambios de texto
export default function InputMultiline({ placeHolder, valor, setTextChange }) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      onChangeText={setTextChange}
      placeholderTextColor={'#623431'}
      multiline={true}
      numberOfLines={4}
    />
  );
}

// Estilos para el componente InputMultiline
const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "#623431",
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#623431', 
    width: 350,
    height: 45,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10
  },
});
