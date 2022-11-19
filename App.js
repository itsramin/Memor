import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllColors } from "./UI/AllColors";

import SettingIcon from "./UI/SettingIcon";

import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  const HomePage = () => {
    return (
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
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
        {/* <BottomTab.Screen
          name="Explore"
          component={MarketScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialIcons name="store" color={color} size={size} />
            ),
          }}
        /> */}
      </BottomTab.Navigator>
    );
  };

  return (
    <>
      <StatusBar style="light" />

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
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ contentStyle: { padding: 0 }, title: "Memor" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create();
