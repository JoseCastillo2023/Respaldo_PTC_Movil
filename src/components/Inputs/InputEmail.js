// Importaciones necesarias desde React Native
import { StyleSheet, TextInput, Platform } from 'react-native';

// Componente InputEmail que recibe varias props para gestionar el valor y los cambios de texto
export default function InputEmail({ placeHolder, valor, setTextChange }) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      placeholderTextColor={'#623431'}
      onChangeText={setTextChange}
      keyboardType="email-address"
    />
  );
}

// Estilos para el componente InputEmail
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#623431',
    backgroundColor: '#FFF',
    color: "#623431",
    fontWeight: '500',
    width: 350,
    height: 45,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10
  },
});
