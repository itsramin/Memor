import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import MemorizeCards from "../components/MemorizeCards";

const StageModeScreen = ({ route, navigation }) => {
  const { cards, minStage, setId } = route.params;

  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === setId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${targetSet.name}`,
    });
  }, []);

  return <MemorizeCards cards={cards} setId={setId} minStage={minStage} />;
};

export default StageModeScreen;
const styles = StyleSheet.create({});
// const { cards, minStage, setId } = route.params;
//   const dispatch = useDispatch();
//   const allSets = useSelector((state) => state.sets.allSets);

//   const targetSet = allSets.find((item) => item.setId === setId);

//   const [cardNum, setCardNum] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [cardsOver, setCardsOver] = useState(false);

//   const [correctNum, setCorrectNum] = useState(0);
//   const [wrongNum, setWrongNum] = useState(0);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: `${targetSet.name} Memorize`,
//     });
//   }, []);

//   const qaBoxHandler = () => {
//     setShowAnswer((prev) => !prev);
//   };
//   const backHandler = () => {
//     navigation.goBack();
//   };

//   const card = cards[cardNum];
//   const btnHandler = (status) => {
//     status === "no"
//       ? setWrongNum((prev) => prev + 1)
//       : setCorrectNum((prev) => prev + 1);

//     // let daysCount = 2;
//     // if (status === "easy") daysCount = 4;
//     // if (status === "very easy") daysCount = 6;

//     if (status !== "no") {
//       // dispatch(
//       //   setsActions.changeDate({
//       //     days: daysCount,
//       //     setId: setId,
//       //     cardId: cards[cardNum].cardId,
//       //   })
//       // );
//       dispatch(
//         setsActions.changeStage({
//           setId: setId,
//           cardId: cards[cardNum].cardId,
//         })
//       );
//     }

//     if (cardNum === cards.length - 1) {
//       return setCardsOver(true);
//     }

//     setCardNum((prev) => prev + 1);
//   };

//   let content = (
//     <View style={styles.screen}>
//       <View>
//         <ProgressBar progress={(cardNum + 1) / cards.length} />
//         <Text style={styles.progressText}>
//           {cardNum + 1} of {cards.length}
//         </Text>
//       </View>
//       <Pressable style={styles.qaView} onPress={qaBoxHandler}>
//         {!showAnswer ? (
//           <Text style={styles.text}>{card.question}</Text>
//         ) : (
//           <Text style={styles.text}>{card.answer}</Text>
//         )}
//       </Pressable>

//       <View style={styles.actions}>
//         {/* <PrimaryButton
//         title="Easy"
//         onPress={btnHandler.bind(this, "easy")}
//         bgcolor={AllColors.green400}
//       />
//       <PrimaryButton
//         title="Normal"
//         onPress={btnHandler.bind(this, "normal")}
//         bgcolor={AllColors.green300}
//       /> */}
//         <PrimaryButton
//           title={
//             <MaterialIcons name="cancel" color={AllColors.red400} size={40} />
//           }
//           onPress={btnHandler.bind(this, "no")}
//           bgcolor="transparent"
//         />
//         <PrimaryButton
//           title={
//             <MaterialIcons
//               name="check-circle"
//               color={AllColors.green400}
//               size={40}
//             />
//           }
//           onPress={btnHandler.bind(this, "very easy")}
//           bgcolor="transparent"
//         />
//       </View>
//     </View>
//   );

//   if (cardsOver) {
//     content = (
//       <MemorizeSummary
//         correctNum={correctNum}
//         wrongNum={wrongNum}
//         onPress={backHandler}
//         stage={minStage}
//       />
//     );
//   }
//   return content;
// };

// export default MemorizeScreen;
// const styles = StyleSheet.create({
//   screen: { flex: 1, justifyContent: "space-between" },
//   qaView: {
//     padding: 16,
//     borderColor: AllColors.primary400,
//     backgroundColor: AllColors.primary100,
//     borderWidth: 2,
//     borderRadius: 6,
//     marginBottom: 16,
//     minHeight: 150,
//     justifyContent: "center",
//   },
//   text: {
//     color: AllColors.primary500,
//     textAlign: "center",
//     fontSize: 24,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//   },
//   progressText: {
//     textAlign: "center",
//   },
// });