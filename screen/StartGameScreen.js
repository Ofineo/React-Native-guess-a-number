import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Modal } from 'react-native';
import Card from '../components/Card';
import color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [inputState, setInputState] = useState('');
    const [selectedNumberState, setSelectedNumberState] = useState();
    const [confirmed, setConfirmed] = useState(false);

    const inputValidation = (text) => {
        setInputState(text.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setInputState('');
        setConfirmed(false);

    };

    const confirmInputHandler = () => {
        const chosenNumber = +(inputState);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumberState(chosenNumber);
        setInputState('');
    }

    const startGame = () => {
        setConfirmed(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={styles.title}>
                    Start a new game
            </Text>
                <Card style={styles.inputContainer}>
                    <Text>
                        Select a number
                </Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={inputValidation}
                        value={inputState}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={width = 20}>
                            <Button title="CANCEL" color={color.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={width = 20}>
                            <Button title="ACCEPT" color={color.primary} onPress={confirmInputHandler} />
                        </View>
                    </View>

                </Card>

                <Modal visible={confirmed} animationType='slide'>
                    <View style={styles.modal}>
                        <Text>You selected :</Text>
                        <NumberContainer>
                            {selectedNumberState}
                        </NumberContainer>
                        <View style={width = 50}>
                            <Button title="CONFIRM" onPress={startGame} />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    input: {
        width: 100,
        textAlign: 'center'
    },
    modal: {
        height: '100%',
        width: '100%',
        alignContent: "center",
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'center'
    }
});

export default StartGameScreen;