// Importaciones necesarias desde React y React Native
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

// Componente MaskedInputDui que muestra un campo de entrada con máscara para el DUI
export default function MaskedInputDui({ dui, setDui }) {
    return (
        <TextInputMask
            style={styles.Input}
            placeholder="DUI:"
            placeholderTextColor="#623431"
            type={'custom'}
            options={{
                mask: '99999999-9'
            }}
            value={dui}
            onChangeText={setDui}
        />
    );
}

// Estilos para el componente MaskedInputDui
const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#FFF',
        color: "#623431",
        fontWeight: '500',
        width: 350,
        height: 45,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#623431', 
        padding: 10,
        marginVertical: 10
    },
});
