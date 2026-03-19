import { Appbar } from 'react-native-paper';
const MyAppBar = ({ navigation, back, title }) => (
    <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={title} />
        {!back && (
            <Appbar.Action icon="dots-vertical" onPress={() => {/* maybe open options*/}} />
        )}
    </Appbar.Header>
);

export default MyAppBar;