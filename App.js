import { useFonts } from "expo-font";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import Colors from "./constants/colors";
import EndGame from "./screens/EndScreen";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";
// import { AppLoading } from "expo-app-loading";

export default function App() {
  const [num, setNum] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [round, setRound] = useState(null);
  const [fontsloaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // if (!fontsloaded) {
  //   return <AppLoading />;
  // }

  const setNumHandler = (value) => {
    setNum(value);
    setGameOver(false);
  };
  const gameOverHandler = (roundNum) => {
    setGameOver(true);
    setRound(roundNum);
  };
  const startNewGameHandler = () => {
    setNum(null);
    setRound(null);
    setGameOver(true);
  };

  let screen = <StartScreen onSetNum={setNumHandler} />;

  if (gameOver && num)
    screen = (
      <EndGame
        answer={num}
        onStartNewGame={startNewGameHandler}
        roundsNum={round}
      />
    );
  if (!gameOver && num)
    screen = <GameScreen answer={num} gameOver={gameOverHandler} />;
  return (
    <>
      <StatusBar style="auto" />

      <View style={styles.rootScreen}>
        <ImageBackground
          resizeMode="cover"
          source={require("./assets/images/background.png")}
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.flex}>{screen}</SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  rootScreen: { backgroundColor: Colors.second500, flex: 1 },
  backgroundImage: { opacity: 0.3 },
});

// import { useEffect, useState } from "react";
// import { StatusBar, StyleSheet, Text, View, Button } from "react-native";
// import NumBox from "./Components/NumBox";

// export default function App() {
//   const [num, setNum] = useState(null);
//   const [guess, setGuess] = useState(null);
//   const [maxVal, setMaxVal] = useState(100);
//   const [minVal, setMinVal] = useState(0);

//   const randNum = (a, b) => {
//     return Math.trunc(Math.random() * (+b - +a) + +a);
//   };

//   const setNumHandler = (value) => {
//     setNum(value);

//     setGuess(randNum(1, 100));
//   };
//   useEffect(() => {
//     console.log(".");
//     console.log(maxVal);
//     console.log(minVal);
//   }, [minVal, maxVal]);
//   useEffect(() => {
//     console.log(num, guess);
//     if (guess === num) console.log("You won");
//   }, [guess]);

//   const higherHandler = () => {
//     if (num > guess) {
//       if (guess > minVal) setMinVal(guess);
//       setGuess(randNum(guess, maxVal));
//     } else {
//       console.log("dont lie");
//     }
//   };
//   const lowerHandler = () => {
//     if (num < guess) {
//       if (guess < maxVal) setMaxVal(guess);
//       setGuess(randNum(minVal, guess));
//     } else {
//       console.log("dont lie");
//     }
//   };
//   return (
//     <>
//       <StatusBar style="light" />

//       {!num && (
//         <>
//           <View style={styles.titleView}>
//             <Text style={styles.titleText}>Guess My Number</Text>
//           </View>
//           <NumBox onSetNum={setNumHandler} />
//         </>
//       )}
//       {num && (
//         <>
//           <View style={styles.titleView}>
//             <Text style={styles.titleText}>Opponent's Guess</Text>
//           </View>
//           <View style={styles.guessView}>
//             <Text style={styles.guessText}>{guess}</Text>
//           </View>
//           <View style={styles.questionView}>
//             <Text style={styles.questiontext}>Higher or lower?</Text>
//             <View style={styles.actions}>
//               <View style={styles.btn}>
//                 <Button title="-" color="violet" onPress={lowerHandler} />
//               </View>
//               <View style={styles.btn}>
//                 <Button title="+" color="violet" onPress={higherHandler} />
//               </View>
//             </View>
//           </View>
//         </>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   titleView: { marginTop: 30, justifyContent: "center", alignItems: "center" },
//   titleText: {
//     borderWidth: 1,
//     padding: 16,
//     color: "white",
//     borderColor: "white",
//   },
//   guessView: { marginTop: 30, alignItems: "center" },
//   guessText: {
//     borderWidth: 1,
//     padding: 30,
//     paddingHorizontal: 60,
//     color: "yellow",
//     borderColor: "yellow",
//     fontSize: 40,
//   },
//   questionView: {
//     backgroundColor: "darkviolet",
//     padding: 16,
//     marginTop: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 50,
//     borderRadius: 10,
//   },
//   questiontext: { color: "yellow" },
//   actions: {
//     flexDirection: "row",
//     marginTop: 16,
//     marginHorizontal: 10,
//   },
//   btn: {
//     marginHorizontal: 8,
//     flex: 1,
//   },
// });
