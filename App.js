import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screen/StartGameScreen';
import GameScreen from './screen/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  console.log(userNumber);

  const startGameHandler = selectedNumber => {
    console.log(selectedNumber);
    setUserNumber(selectedNumber);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Guess a number"
      />
      {userNumber ? <GameScreen userChoice={userNumber} /> : <StartGameScreen onStartGame={(n)=>startGameHandler(n)}/>}

    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
