import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store/store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
// const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#0c266d" },
              headerTintColor: "white",
              headerTitleStyle: "bold",
              contentStyle: { backgroundColor: "#163a9e" },
            }}
          >
            {/* <Stack.Screen
              name="home"
              component={HomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new"
              component={AddExpenseScreen}
              options={{ title: "New Expense" }}
            />
            <Stack.Screen
              name="edit"
              component={ExpenseDetailScreen}
              options={{ title: "Edit" }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create();
