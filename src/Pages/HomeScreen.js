import React, {useCallback, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View, Text, StatusBar} from 'react-native';
import AccountCard from '../Components/AccountCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decryptData} from '../helpers';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const [datas, setDatas] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const isFocused = useIsFocused();

    const fetchAccounts = useCallback(async () => {
        const storedAccounts = await AsyncStorage.getItem('accounts');
        if (storedAccounts) {
            const accounts = JSON.parse(storedAccounts);
            const decryptedAccounts = accounts.map(account => ({
                id: account.id,
                address: JSON.parse(decryptData(account.address)),
                username: JSON.parse(decryptData(account.username)),
                password: JSON.parse(decryptData(account.password)),
            }));
            setDatas(decryptedAccounts);
        } else {
            setDatas([]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchAccounts();
        }
    }, [isFocused, fetchAccounts]);

    if (loading){
        return (
            <View style={{flex:1,backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20}}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{flex:1}}>
                {datas.length > 0 ? (
                    <ScrollView contentContainerStyle={{paddingBottom:10}}>
                        {datas.map((item,index) => {
                            return (
                                <AccountCard
                                    key={index}
                                    id={item.id}
                                    address={item.address}
                                    username={item.username}
                                    password={item.password}
                                    navigation={navigation}
                                    onAccountDeleted={fetchAccounts}
                                />
                            );
                        })}
                    </ScrollView>
                ) : (
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:20}}>Henüz hiç hesap eklenmedi.</Text>
                    </View>
                )}
            </View>

            <View style={{ position: 'absolute', right: 20, bottom: 20 , backgroundColor:'#2fb081', width:54 , height: 54, borderRadius:50}}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('NewAccount');
                    }}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                >
                    <Icon name="plus" size={20} color="white"/>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default HomeScreen;
