import { useState } from "react";
import { Button, FlatList, StatusBar, StyleSheet, View } from "react-native";
import GoalInput from "./Components/GoalInput";
import GoalItem from "./Components/GoalItem";

export default function App() {
  const [goalList, setGoalList] = useState([]);
  const [modalIsVisible, setModalIsVisibel] = useState(false);

  const showModal = () => {
    setModalIsVisibel(true);
  };
  const hideModal = () => {
    setModalIsVisibel(false);
  };

  const addGoalHandler = (enteredText) => {
    setGoalList((prev) => [
      ...prev,
      { text: enteredText, id: Math.random().toString() },
    ]);
    setModalIsVisibel(false);
  };

  const deleteGoalHandler = (id) => {
    setGoalList((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#a065ec" onPress={showModal} />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onHide={hideModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goalList}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  deleteGoal={deleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
