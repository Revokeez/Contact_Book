import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import ContactListItem from '../components/ContactListItem';
import {useContactsContext}  from "../context/ContactsContext"
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const ContactListScreen = ({navigation}) => {
    const insets = useSafeAreaInsets()
    const { contacts } = useContactsContext();
    const renderItem = ({ item }) => (
        <ContactListItem
            contact={item}
            onPress={() => navigation.navigate('ContactView', { contact: item })}
        />
    );

    return (
        <View style={{ flex: 1, marginBottom: insets.bottom }}>
            {/* FlatList to render all contacts */}
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            {/* FAB to add a new contact */}
            <FAB
                icon="plus"
                style={{ position: 'absolute', bottom: 16, right: 16 }}
                onPress={() => navigation.navigate('ContactForm', { contact: {} })}
            />
        </View>
    );
};
export default ContactListScreen;