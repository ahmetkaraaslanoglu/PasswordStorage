import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {encryptData} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewAccountScreen = ({ navigation }) => {
    const [address,setAddress] = React.useState('');
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);

    React.useEffect(() => {
        const getStoredAccounts = async () => {
            const storedAccounts = await AsyncStorage.getItem('accounts');
            if (storedAccounts) {
                setAccounts(JSON.parse(storedAccounts));
            }
        };
        getStoredAccounts();
    }, []);



    const addAccount = async () => {
        const newAccount = {
            id: accounts.length + 1,
            address: encryptData(address, 'fhC67'),
            username: encryptData(username, 'fhC67'),
            password: encryptData(password, 'fhC67')
        };

        const updatedAccounts = [...accounts, newAccount];
        setAccounts(updatedAccounts);
        setPassword('');
        setUsername('');
        setAddress('');
        await AsyncStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        navigation.navigate('Home');
    }


    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

            <View style={{
                flexDirection: 'row',
                backgroundColor: "white",
                borderRadius: 15,
                paddingLeft: 10,
                width: "80%",
                alignSelf: "center",
                marginBottom: 30,
                alignItems: 'center',
            }}>
                <TextInput
                    style={{ flex: 1 }}
                    value={address}
                    placeholder={"Address..."}
                    onChangeText={(text) => setAddress(text)}
                />
                <Icon name={"globe"} size={20} color={"gray"} style={{marginRight:12}} />
            </View>

            <View style={{
                flexDirection: 'row',
                backgroundColor: "white",
                borderRadius: 15,
                paddingLeft: 10,
                width: "80%",
                alignSelf: "center",
                marginBottom: 30,
                alignItems: 'center',
            }}>
                <TextInput
                    style={{ flex: 1 }}
                    value={username}
                    placeholder={"Username..."}
                    onChangeText={(text) => setUsername(text)}
                />
                <Icon name={"user"} size={20} color={"gray"} style={{marginRight:12}} />
            </View>

            <View style={{
                flexDirection: 'row',
                backgroundColor: "white",
                borderRadius: 15,
                paddingLeft: 10,
                width: "80%",
                alignSelf: "center",
                marginBottom: 30,
                alignItems: 'center',
            }}>
                <TextInput
                    style={{ flex: 1 }}
                    value={password}
                    placeholder={"Password..."}
                    onChangeText={(text) => setPassword(text)}
                />
                <Icon name={"lock"} size={20} color={"gray"} style={{marginRight:12}} />
            </View>

            <TouchableOpacity
                onPress={addAccount}
                style={{
                    width: "60%",
                    height: 45,
                    backgroundColor: "#2fb081",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    marginBottom:30,
                }}>
                <Text style={{color: "white", fontSize: 18}}>Add Account</Text>
            </TouchableOpacity>

        </View>
    );
}
export default NewAccountScreen;
