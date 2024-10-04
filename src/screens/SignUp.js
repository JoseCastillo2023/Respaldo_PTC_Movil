import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
//Import de componentes

import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import { useFocusEffect } from '@react-navigation/native';

export default function SignUp({ navigation }) {
    const ip = Constantes.IP;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    // Estado para controlar la visibilidad de la contraseña
    const [isContra, setIsContra] = useState(true);
    // Estados para almacenar el usuario y la contraseña
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        // Convertir la fecha al formato año-mes-dia
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // Efecto para validar la sesión al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        React.useCallback(() => {
            validarSesion(); // Llama a la función validarSesion

            // Limpia los campos cuando se desenfoca la pantalla
            return () => {
                setUsuario('');
                setContrasenia('');
            };
        }, [])
    );
    // Función para validar la sesión del usuario
    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/PTC_2024/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                // Si hay una sesión activa, navegar a la pantalla TabNavigator
                navigation.navigate('TabNavigator');
                console.log("Se ingresa con la sesión activa");
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    const handleLogout = async () => {
        navigation.navigate('SignIn');
    };

    const handleCreate = async () => {
        try {
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
                !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            } else if (!duiRegex.test(dui)) {
                Alert.alert("El DUI debe tener el formato correcto (########-#)");
                return;
            } else if (!telefonoRegex.test(telefono)) {
                Alert.alert("El teléfono debe tener el formato correcto (####-####)");
                return;
            } else if (new Date(date) > fechaMinima) {
                Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
                return;
            }

            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('nacimientoCliente', fechaNacimiento);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/PTC_2024/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('SignIn');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <View style={styles.offscroll}></View>
                <Text style={styles.texto}>Registrar Usuario</Text>
                <Image source={require('../img/logo_panaderia.png')} style={styles.image} />

                <Input
                    placeHolder='Nombre:'
                    setValor={nombre}
                    setTextChange={setNombre}
                />
                <Input
                    placeHolder='Apellido:'
                    setValor={apellido}
                    setTextChange={setApellido}
                />
                <InputEmail
                    placeHolder='Correo electrónico:'
                    setValor={email}
                    setTextChange={setEmail} />
                <InputMultiline
                    placeHolder='Dirección:'
                    setValor={setDireccion}
                    valor={direccion}
                    setTextChange={setDireccion} />
                <MaskedInputDui
                    dui={dui}
                    setDui={setDui} />
                <View style={styles.contenedorFecha}>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.fecha}>{fechaNacimiento || 'Fecha de nacimiento:'}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())}
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                    )}
                </View>

                <MaskedInputTelefono
                    telefono={telefono}
                    setTelefono={setTelefono} />
                <Input
                    placeHolder='Contraseña:'
                    contra={!isPasswordVisible} // Si es verdadero, se oculta la contraseña
                    valor={clave}
                    setTextChange={setClave}
                    onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)} // Alternar visibilidad
                />

                <Input
                    placeHolder='Confirmar contraseña:'
                    contra={!isConfirmPasswordVisible} // Si es verdadero, se oculta la contraseña
                    valor={confirmarClave}
                    setTextChange={setConfirmarClave}
                    onToggleVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} // Alternar visibilidad
                />
                <Buttons
                    textoBoton='Registrar usuario'
                    accionBoton={handleCreate}
                />

                <Buttons
                    textoBoton='Ir al inicio de sesión'
                    accionBoton={handleLogout}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollViewStyle: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 15,
    },
    texto: {
        color: '#623431', fontWeight: '500',
        fontSize: 25,
        padding: 15,
    },
    textRegistrar: {
        color: '#623431', fontWeight: '500',
        fontSize: 25
    },
    fecha: {
        fontWeight: '500',
        color: '#623431'
    },
    contenedorFecha: {
        backgroundColor: '#FFF',
        color: "#623431", fontWeight: '500',
        borderWidth: 1,
        borderColor: '#623431',
        width: 350,
        height: 50,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 1
    },
});
