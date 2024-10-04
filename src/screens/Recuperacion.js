import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import { FontAwesome } from "@expo/vector-icons"; 
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Recuperacion({ navigation }) {
    const ip = Constantes.IP;
    const [clienteEmail, setEmail] = useState('');

    const volverInicio = async () => {
        navigation.navigate("SignIn");
      };

    const enviarCodigo = async () => {
        if (!clienteEmail.trim()) {
            Alert.alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('clienteEmail', clienteEmail.trim());

            const response = await fetch(`${ip}/PTC_2024/api/helpers/recup_correo.php`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.status) {
                Alert.alert('Código enviado', 'Revise su correo electrónico.');
                navigation.navigate('Codigo'); // Navega a la pantalla "Codigo"
            } else {
                Alert.alert('Error', result.message || 'No se pudo enviar el código.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al enviar el código.');
        }
    };

    return (
        <View style={styles.container}>
              <TouchableOpacity style={styles.ButtonVolver} onPress={volverInicio}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
            <Text style={styles.texto}>Recuperar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={clienteEmail}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            <TouchableOpacity style={styles.button} onPress={enviarCodigo}>
                <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#623431',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 20,
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: '#623431',
        borderWidth: 2,
        marginVertical: 10,
        width: '80%',
        paddingHorizontal: 10,
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#623431',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    ButtonVolver: {
        flexDirection: "row",
        marginRight: 310,
        marginTop: 10,
        backgroundColor: "#623431",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
      },
});
