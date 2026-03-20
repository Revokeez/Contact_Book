import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Banner } from "react-native-paper";
import { useContactsContext } from "./context/ContactsContext";
import ContactListScreen from './screens/ContactListScreen';
import ContactFormScreen from './screens/ContactFormScreen';
import ContactViewScreen from './screens/ContactViewScreen';
import { ContactsProvider } from './context/ContactsContext';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();
function MainApp() {
  const { isOnline, isSyncing } = useContactsContext();

  return (
    <>
      <Banner visible={!isOnline} style={{ backgroundColor: "#ffcccc"}}>
        You are offline.
      </Banner>

      <Banner visible={isSyncing && isOnline}>
        Syncing contacts...
      </Banner>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="ContactList">
          <Stack.Screen
            name="ContactList"
            component={ContactListScreen}
            options={{ title: 'Contacts' }}
          />
          <Stack.Screen
            name="ContactView"
            component={ContactViewScreen}
            options={{ title: 'View Contact' }}
          />
          <Stack.Screen
            name="ContactForm"
            component={ContactFormScreen}
            options={{ title: 'Edit Contact' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <ContactsProvider>
        <MainApp />
      </ContactsProvider>
    </PaperProvider>
  );
}
