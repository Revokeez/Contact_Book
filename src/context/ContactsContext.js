import React, {useContext, useState, useEffect, createContext} from 'react';
import NetInfo from "@react-native-community/netinfo"
import { openRealm, createContactRealm, readAllContacts, updateContactRealm,
deleteContactRealm } from '../db/realm';

export const ContactsContext = createContext();
export const ContactsProvider = ({children}) => {
    const [contacts, setContacts] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);


    useEffect(() => {
        const initRealm = async () => {
            await openRealm();
            const allContacts = readAllContacts();
            setContacts(allContacts);
        };
        initRealm();
    }, []);

    const triggerSync = async () => {
        if (!isOnline) return;

        setIsSyncing(true);

        const unsynced = readAllContacts().filter(c => !c.isSynced);

        for (let contact of unsynced) {
            try {

                // Simulating delay of Syncing 
                await new Promise(res => setTimeout(res, 1000));

                updateContactRealm(contact.id, {
                    name: contact.name,
                    phone: contact.phone,
                    email: contact.email
                });

            } catch (err) {
                console.log("Synced wasnt successfull for: ", contact.name);
            }
        }

        setContacts(readAllContacts());
        setIsSyncing(false);
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const online = !!state.isConnected;
            setIsOnline(online);

            if (online) {
                triggerSync();
            }
        });
        return () => unsubscribe();
    }, []);


    const addContact = async contact => {
        const newId = createContactRealm(contact);
        setContacts(prev => [...prev, {...contact, id: newId, isSynced: isOnline}]);
    };

    const editContact = async (id, newData) => {
        const updatedContact = {
            ...newData,
            isSynced: isOnline
        }
        updateContactRealm(id, updatedContact);
        setContacts(prev => prev.map(c => (c.id === id ? {...c, ...newData} : c)));
    };
    const removeContact = async id => {
        deleteContactRealm(id);
        setContacts(prev => prev.filter(c => c.id !== id));
    };
    const value = {
        contacts,
        isOnline,
        isSyncing,
        setContacts,
        addContact, 
        editContact, 
        removeContact
    };
        return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};
export const useContactsContext = () => {return useContext(ContactsContext)}