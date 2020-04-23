import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import color from '../constants/color';

const InputContainer = props => {

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: color.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number:{
        color: color.accent,
        fontSize: 22
    }

});

export default InputContainer;