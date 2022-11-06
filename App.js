import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import LastExpenses from "./screens/LastExpenses";
import { Provider } from "react-redux";
import store from "./store/store";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import ExpenseDetailScreen from "./screens/ExpenseDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddNewExpenseBtn from "./components/AddNewExpenseBtn";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  const HomePage = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0c266d" },
          headerTintColor: "white",
          headerTitleStyle: "bold",
          tabBarStyle: {
            backgroundColor: "#0c266d",
            borderTopColor: "white",
            borderTopWidth: 0,
          },
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#3055b8",
          headerRight: () => {
            return <AddNewExpenseBtn />;
          },
        }}
        sceneContainerStyle={{
          backgroundColor: "#163a9e",
        }}
      >
        <BottomTab.Screen
          name="all"
          component={HomeScreen}
          options={{
            title: "All Expenses",
            tabBarIcon: () => {
              return <Ionicons name="apps" size={24} color="white" />;
            },
          }}
        />
        <BottomTab.Screen
          name="last"
          component={LastExpenses}
          options={{
            title: "Last 7 days",
            tabBarIcon: () => {
              return <Ionicons name="calendar" size={24} color="white" />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  };
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
            <Stack.Screen
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
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create();
