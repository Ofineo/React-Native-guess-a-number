import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const { userChoice, onGameOver} = props;

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds)
        }
    },[currentGuess, onGameOver, userChoice]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know that this is wrong', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        } else if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currentRounds => currentRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
                <Button title="GREATER" onPress={() => nextGuessHandler('greater')} />
            </Card>

        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%',
        paddingHorizontal: 15,
    },
});

export default GameScreen;