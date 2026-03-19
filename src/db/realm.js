import Realm from 'realm';

let realmInstance;

const ContactSchema = {
    name: 'Contact',
    properties: {
        _id: 'int',
        name: 'string',
        phone: 'string',
        email: 'string?',
        isSynced: {type: 'bool', default: false},
    },
    primaryKey: '_id',
};

export const openRealm = async () => {
    realmInstance = await Realm.open({
        path: 'contactsRealm.realm',
        schema: [ContactSchema],
    });
};

export const createContactRealm = newData => {
    let newId;
    realmInstance.write(() => {
        const maxId = realmInstance.objects('Contact').max('_id');
        newId = maxId ? maxId + 1 : 1;
        realmInstance.create('Contact', { ...newData, _id: newId, isSynced: false });
    });
    return newId;
};

export const readAllContacts = () => {
    const contacts = realmInstance.objects('Contact');
    return contacts.map(c => ({
        id: c._id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        isSynced: c.isSynced
    }));
};

export const updateContactRealm = (id, newData) => {
    realmInstance.write(() => {
        let contact = realmInstance.objectForPrimaryKey('Contact', id);
        if (contact) {
            contact.name = newData.name;
            contact.phone = newData.phone;
            contact.email = newData.email;
            contact.isSynced = newData.isSynced;
        }
    });
};

export const deleteContactRealm = id => {
    realmInstance.write(() => {
        let contact = realmInstance.objectForPrimaryKey('Contact', id);
        if (contact) {
            realmInstance.delete(contact);
        }
    });
};