import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ListNotepadScreen } from "./src/screens/ListNotepadScreen";
import { ViewNotepadScreen } from "./src/screens/ViewNotepadScreen";
import { CreateNotepadScreen } from "./src/screens/CreateNotepadScreen";
import { EditNotepadScreen } from "./src/screens/EditNotepadScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import screens from "./src/screens.json";
import { LoadingOverlay } from "./src/components/LoadingOverlay";

const texts = {
  homeTitle: "Menu",
  viewTitle: "Visualizar Notepad",
  listTitle: "Lista de Notepads",
  editTitle: "Editar Notepad",
  createTitle: "Criar Notepad",
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <LoadingOverlay />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={screens.home}
          backBehavior="history"
        >
          <Drawer.Screen
            name={screens.home}
            component={HomeScreen}
            options={{
              headerTitle: texts.homeTitle,
              drawerLabel: "Menu",
              drawerIcon({ color, size }) {
                return <MaterialIcons name="home" size={size} color={color} />;
              },
            }}
          />
          <Drawer.Screen
            name={screens.viewNotepad}
            component={ViewNotepadScreen}
            options={{
              headerTitle: texts.viewTitle,
              drawerLabel: texts.viewTitle,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return (
                  <MaterialIcons name="preview" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.listNotepad}
            component={ListNotepadScreen}
            options={{
              headerTitle: texts.listTitle,
              drawerLabel: texts.listTitle,
              drawerIcon({ size, color }) {
                return (
                  <MaterialIcons
                    name="format-list-bulleted"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.createNotpad}
            component={CreateNotepadScreen}
            options={{
              headerTitle: texts.createTitle,
              drawerLabel: texts.createTitle,
              drawerIcon({ size, color }) {
                return (
                  <MaterialCommunityIcons
                    name="hammer-wrench"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.editNotepad}
            component={EditNotepadScreen}
            options={{
              headerTitle: texts.editTitle,
              drawerLabel: texts.editTitle,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return <FontAwesome name="edit" size={size} color={color} />;
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
