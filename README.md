# 📱 React Native Contacts App (Offline-First with Simulated Sync)

## 📖 Overview

This is a React Native Contacts application built with an **offline-first architecture** using Realm as the local database.

The app allows users to:

* Create contacts
* Edit contacts
* Delete contacts
* Work completely offline
* Simulate Automatically sync when internet connection is restored

This project demonstrates:

* Local database management
* Schema migrations
* Offline-first design
* Context-based state management
* Network state detection

---

## 🏗 Architecture

The project follows a clean layered architecture:

```
UI (Screens / Components)
        ↓
Context (Business Logic + Sync)
        ↓
Realm (Local Database)
```

### Folder Structure

```
React_Native01/
│
├── App.js
├── db/
│   └── realm.js
├── context/
│   └── ContactsContext.js
├── screens/
│   ├── ContactListScreen.js
│   ├── ContactFormScreen.js
│   └── ContactViewScreen.js
├── components/
│   ├── ContactCard.js
│   ├── ContactListItem.js
│   └── ContactForm.js
```

---

## 🗄 Database (Realm)

### Contact Schema

```
{
  _id: int (Primary Key)
  name: string
  phone: string
  email: string?
  isSynced: boolean
  updatedAt: date
}
```

### Sync Logic

* `isSynced = false` → Contact needs to be synced
* `isSynced = true` → Contact is synced with server

Whenever a contact is created or edited:

```
isSynced = false
```

When the device reconnects to the internet:

```
triggerSync() runs automatically
```

---

## 🌐 Offline-First Behavior

The app listens to network changes.

If offline:

* Changes are saved locally
* A banner notifies the user

When online:

* Unsynced contacts are automatically processed
* Sync status updates

---

# How to test Sync:
```
To test you need to put your phone in Airplane mode. It will show you a banner telling you that you are offline. When you turn off Aiplane mode it will show another banner saying "Syncing contacts...".
```

## 🚀 Installation

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Run Android

```
npx react-native run-android
```

### 3️⃣ Clear Database (If Needed)

Uninstall the app from your emulator/device to reset the Realm database.

---

## 🔄 Schema Migrations

When modifying the Realm schema:

1. Increase `schemaVersion`
2. Add migration logic inside `openRealm()`

## 📦 Dependencies

Main libraries used:

* React Native
* Realm(NoSQL)
* React Navigation
* React Native Paper
* NetInfo

---

# Some Important Notes!
* The project was tested only in android. 
* The sync is a simulation
* One of the buttons to go back to another screen dosent show. But you can allways use your phone default buttons in the bottom.