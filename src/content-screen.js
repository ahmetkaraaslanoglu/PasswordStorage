import React, {useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Modal,
    Alert,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';



const ContentScreen = ({navigation}) => {
    const [account,setAccount] = useState([]);
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [address,setAddress] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [secureTextVisible,setSecureTextVisible] = useState(true);

    React.useEffect(() => {
        getTodosFromUserDevice();
    }, []);

    React.useEffect(() => {
        saveTodoToUserDevice(account);
    }, [account]);

    const saveTodoToUserDevice = async account => {
        try {
            const stringifyTodos = JSON.stringify(account);
            await AsyncStorage.setItem('account', stringifyTodos);
        } catch (error) {
            console.log(error);
        }
    };

    const getTodosFromUserDevice = async () => {
        try {
            const account = await AsyncStorage.getItem('account');
            if (account != null) {
                setAccount(JSON.parse(account));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAccount=(dataId)=>{
        const newAccountItem = account.filter(item=>item.id !== dataId)
        Alert.alert('Hesap Kaldır', 'Bu hesabı kaldırmak istediğinden emin misin ?', [
            {
                text: 'Evet, sil',
                onPress: () => setAccount(newAccountItem),
            },
            {
                text: 'Hayır, kalsın',
            },
        ]);
    };

    const addAccount=()=>{
        if(username === ''){
            Alert.alert('Hata','Kullanıcı adı boş bırakılamaz...');
        }
        else if (password === ''){
            Alert.alert('Hata','Parola boş bırakılamaz...');
        }
        else if (address === ''){
            Alert.alert('Hata','Adres boş bırakılamaz...');
        }
        else{
            const newAccount = {
                id:Math.random(),
                username: username,
                password: password,
                adress: address,
                isHide: false,
            };
            setAccount([...account,newAccount]);
            setAddress('');
            setPassword('');
            setUserName('');
        }
    };


    const ListItem = ({data}) => {
        return(
            <Pressable style={{
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                margin: 10,
                marginBottom: 1,
                marginTop: 15
            }}
                       onLongPress={() => {deleteAccount(data.id)}}>

                <View style= {{
                    padding:10,
                    flexDirection:'row',
                    alignItems:'center',
                }}>

                    <View style={{
                        flex:1,
                        padding: 15
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color:'black', padding: 5}}>
                            {data?.adress}  :
                        </Text>
                        <Text style={{fontSize: 15, color:'black',marginLeft:20}}>
                            {<Text style={{fontWeight: "500"}}>Kullanıcı Adı: </Text>}{data?.username}
                        </Text>
                        <Text style={{fontSize: 15, color:'black',marginLeft:20}}>
                            {<Text style={{fontWeight: "500"}}>Şifre: </Text>}{data?.password}
                        </Text>

                    </View>

                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Pressable
                            style={{
                                paddingLeft: 10
                            }}
                            onPress={() => {showAccount(account.id)}}
                        >
                            <Icon name={"eye"} size={25} color={"#0059BF"}/>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        );

    };

    return(
        <View style={{flex:1}}>
            <Modal
                animationType={'slide'}
                style={{flex:1}}
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    console.log('Modal Kapandı');
                }}
            >
                <Pressable
                    onPress={() => {setShowModal(false)}}
                    style={{
                        height: "50%",
                        backgroundColor: "transparent",
                        flex:1
                    }}
                />
                <KeyboardAvoidingView style={{
                    backgroundColor:'#c5c5c5',
                    padding:10,
                    flex:1,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15
                }}>

                        <Text style={{alignSelf: "center", marginBottom: 10}}>Yeni hesap ekle</Text>

                        <View style={{width: "100%"}}>
                            <Text style={{width: "80%", alignSelf: "center", color: "black"}}>Adres:</Text>
                            <TextInput
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    paddingLeft: 10,
                                    marginTop: 5,
                                    width: "80%",
                                    alignSelf: "center",
                                    marginBottom: 15
                                }}
                                value={address}
                                placeholder={"Adres.."}
                                onChangeText={text => setAddress(text)}
                            />

                            <Text style={{width: "80%", alignSelf: "center", color: "black"}}>Kullanıcı Adı: </Text>
                            <TextInput
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    paddingLeft: 10,
                                    marginTop: 5,
                                    width: "80%",
                                    alignSelf: "center",
                                    marginBottom: 15
                                }}
                                value={username}
                                placeholder="Kullanıcı Adı"
                                onChangeText={text => setUserName(text)}
                            />

                            <Text style={{width: "80%", alignSelf: "center", color: "black"}}>Parola: </Text>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: 15,
                                    paddingLeft: 10,
                                    marginTop: 5,
                                    width: "80%",
                                    alignSelf: "center",
                                    marginBottom: 15,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-between'
                                }}>
                                <TextInput
                                    style={{width:'80%'}}
                                    value={password}
                                    placeholder="Parola"
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={secureTextVisible}
                                />
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {setSecureTextVisible(!secureTextVisible)}}>
                                    <Icon style={{padding:10,paddingRight:20}} name="eye" size={24}/>
                                </TouchableOpacity>
                            </View>
                        </View>


                    <TouchableOpacity
                        onPress={() => {
                            addAccount()
                            setShowModal(!showModal)
                        }}
                        style={{
                            width: "75%",
                            height: 45,
                            backgroundColor: "#0059BF",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10
                        }}>
                        <Text style={{color: "white", fontSize: 20}}>Ekle</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Modal>

            {/* İçerik View */}
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={account}
                    renderItem={({item})=> <ListItem data={item}/>}
                />
            </View>



            <View style={{flex:1, alignItems:'flex-end', justifyContent: "flex-end", padding: 10}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowModal(!showModal)}
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:60,
                        height:60,
                        backgroundColor:'#D61C4E',
                        borderRadius:50
                    }}>
                    <Icon name={"add"} size={25} color={"white"}/>
                </TouchableOpacity>
            </View>


        </View>
    );
}
export default ContentScreen;
