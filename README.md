# 📱 React Native Contacts App (Offline-First with Sync)

## 📖 Overview

This is a React Native Contacts application built with an **offline-first architecture** using Realm as the local database.

The app allows users to:

* Create contacts
* Edit contacts
* Delete contacts
* Work completely offline
* Automatically sync when internet connection is restored

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

Example:

```
schemaVersion: 1
```

---

## 📦 Dependencies

Main libraries used:

* React Native
* Realm
* React Navigation
* React Native Paper
* NetInfo

---

## 🎯 Key Concepts Demonstrated

* Offline-first architecture
* Local persistence with Realm
* Schema versioning and migrations
* Context API state management
* Network-aware synchronization
* Clean separation of concerns

---

## 🧠 Future Improvements

* Real backend API integration
* Conflict resolution strategy
* Soft delete implementation
* Sync queue system
* Pull-to-refresh sync
* Timestamp-based conflict handling

---
