// Importar Dependencias.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index({ navigation }) {

    // Navegación entre pantallas.
    const irRegistrar = async () => {
        navigation.navigate('SignUp');
    };

    const irInicio = async () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>BIENVENIDO</Text>
            <Image
                source={require('../img/logo_panaderia.png')}
                style={styles.logo}
            />
            <TouchableOpacity onPress={irRegistrar} style={styles.button}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={irInicio} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <View style={styles.container2}>
                <Image
                    source={require('../img/Pastel.png')}
                    style={styles.cakeImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.reposteriaTitle}>
                        Repostería
                    </Text>
                    <Text style={styles.reposteriaText}>
                        Realizado con los mejores materiales y por las mejores manos 100% salvadoreñas
                    </Text>
                </View>
            </View>
        </View>
    );
}

// Diseño de la pantalla.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        marginTop: 30,
        width: 300,
        flexDirection: 'row', // Cambiado a row para colocar imagen a la izquierda y texto a la derecha
        alignItems: 'center',
        backgroundColor: '#FDDEC2',
        padding: 10,
        borderRadius: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    logo: {
        marginBottom: 10,
        width: 200,
        height: 200,
    },
    welcomeText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#312323',
        height: 50,
        width: 167,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 19,
    },
    cakeImage: {
        width: 100,
        height: 100,
    },
    reposteriaTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    reposteriaText: {
        textAlign: 'center',
        fontSize: 14,
    },
});
