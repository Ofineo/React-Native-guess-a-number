import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

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

const renderListItems = (value, roundNum) => (
    <View style={styles.listItem} key={value}>
        <BodyText>#{roundNum}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);



const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setpastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const { userChoice, onGameOver } = props;

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
        }
    }, [currentGuess, onGameOver, userChoice]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know that this is wrong', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        } else if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setpastGuesses(currentpastGuesses => [nextNumber, ...currentpastGuesses]);
    };

    if (availableDeviceHeight < 400) {
        return (
            <View style={styles.screen}>
                <Text>Computer's Guess</Text>

                <View style={styles.controls}>
                    <MainButton onPress={() => nextGuessHandler('lower')}>
                        <Ionicons name='md-remove' size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={() => nextGuessHandler('greater')}>
                        <Ionicons name='md-add' size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>


            </View>
        )
    } else {
        return (
            <View style={styles.screen}>
                <Text>Computer's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={() => nextGuessHandler('lower')}>
                        <Ionicons name='md-remove' size={24} color="white" />
                    </MainButton>
                    <MainButton onPress={() => nextGuessHandler('greater')}>
                        <Ionicons name='md-add' size={24} color="white" />
                    </MainButton>
                </Card>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>


            </View>
        )
    }



};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
        justifyContent: 'space-around',
        width: 400,
        maxWidth: '90%',
        paddingHorizontal: 15,
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
});

export default GameScreen;