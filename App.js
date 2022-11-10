import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllColors } from "./UI/AllColors";
import SetOverviewScreen from "./screens/SetOverviewScreen";
import ViewScreen from "./screens/ViewScreen";
import MemorizeScreen from "./screens/MemorizeScreen";
import CardFormScreen from "./screens/CardFormScreen";
import SettingIcon from "./UI/SettingIcon";
import SettingsScreen from "./screens/SettingsScreem";

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
              headerStyle: { backgroundColor: AllColors.primary400 },
              headerTintColor: "white",
              headerTitleStyle: "bold",
              contentStyle: { padding: 16 },
              headerRight: () => <SettingIcon />,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="setOverview" component={SetOverviewScreen} />
            <Stack.Screen name="viewCards" component={ViewScreen} />
            <Stack.Screen name="memorizeScreen" component={MemorizeScreen} />
            <Stack.Screen name="cardFormScreen" component={CardFormScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create();
