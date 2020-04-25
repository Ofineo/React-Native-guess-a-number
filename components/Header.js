import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import color from '../constants/color';
import TitleText from '../components/TitleText';

const Header = props => {

    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerAndroid,
                android: styles.headerAndroid
            })
        }}
        >
            <TitleText style={styles.title}>
                {props.title}
            </TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'open-sans-bold',
    },
    headerOIS: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    headerAndroid: {
        backgroundColor: color.primary,
    },
    headerText: {
        color: 'black',
        fontSize: 18
    },
    title: {
        color: Platform.OS === 'ios' ? 1 : 0,
    },
});
export default Header;