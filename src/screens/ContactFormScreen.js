import { View } from 'react-native';
import ContactForm from '../components/ContactForm';
import { useContactsContext } from '../context/ContactsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactFormScreen = ({navigation, route}) => {
    const insets = useSafeAreaInsets();
    const { addContact, editContact } = useContactsContext();
    const { contact } = route.params ?? {};
    const onSubmit = async ({name, phone, email}) => {
        if(contact.id !== undefined) {
            await editContact(contact.id, {name, phone, email});
        } else {
            await addContact({name, phone, email});
        }
        navigation.navigate('ContactList');
    };
    return (
        <View style={{ flex: 1, padding: 10, marginBottom: insets.bottom }}>
            <ContactForm contact={contact} onSubmit={onSubmit} />
        </View>
    );
};
export default ContactFormScreen;