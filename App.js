import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllColors } from "./UI/AllColors";

import * as SplashScreen from "expo-splash-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { initSets, initCards } from "./store/database";
import SetOverviewScreen from "./screens/SetOverviewScreen";
import CardFormScreen from "./screens/CardFormScreen";
import CardListScreen from "./screens/CardListScreen";
import SetSettingsScreen from "./screens/SetSettingsScreen";
import MemorizeScreen from "./screens/MemorizeScreen";
import MemorzieSummary from "./screens/MemorizeSummary";
import MarketScreen from "./screens/MarketScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        await initSets();
        await initCards();
      } catch (error) {
        console.warn(error);
      } finally {
        setAppReady(true);
      }
    };
    init();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);
  const HomePage = () => {
    return (
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelPosition: "beside-icon",
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text style={{ color, marginLeft: 16 }}>
                {focused ? route.name : ""}
              </Text>
            );
          },
        })}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <BottomTab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="store" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  };

  if (!appReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: AllColors.primary400 },
            headerTintColor: "white",
            headerTitleStyle: "bold",
            contentStyle: { padding: 16 },
            // headerRight: () => <SettingIcon />,
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ contentStyle: { padding: 0 }, title: "Memor" }}
          />
          <Stack.Screen
            name="SetOverviewScreen"
            component={SetOverviewScreen}
            options={{ title: "Overview" }}
          />
          <Stack.Screen
            name="CardFormScreen"
            component={CardFormScreen}
            options={{ title: "Card edit" }}
          />
          <Stack.Screen
            name="CardListScreen"
            component={CardListScreen}
            options={{ title: "Card list" }}
          />
          <Stack.Screen
            name="SetSettingsScreen"
            component={SetSettingsScreen}
            options={{ title: "Set Settings" }}
          />
          <Stack.Screen
            name="MemorizeScreen"
            component={MemorizeScreen}
            options={{ title: "Memorize" }}
          />
          <Stack.Screen
            name="MemorizeSummary"
            component={MemorzieSummary}
            options={{ title: "Summary" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

