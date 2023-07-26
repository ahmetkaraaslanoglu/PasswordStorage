import { useState } from "react";
import { TextInput, TouchableOpacity, View ,Text, Alert} from "react-native";



const LoginScreen = ({navigation}) => {
    const [loginData,setLoginData] = useState('');

    const login = () => {
        if(loginData === '123'){
            navigation.navigate('Content')
        }
        else if (loginData === ''){
            Alert.alert("Hata","Geçerli bir parola giriniz");
        }
        else {
            Alert.alert("Hata","Parola Hatalı")
        }
    };

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: "white",
                paddingTop: 50,
                paddingBottom: 50,
                width: "80%",
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 15,
            }}>
                <Text style={{fontSize: 18, color: "black"}}>Şifreyi girin</Text>
                <TextInput
                    style={{
                        backgroundColor: "#eaeaea",
                        width: "75%",
                        margin: 15,
                        borderRadius: 10,
                        paddingLeft: 10
                    }}
                    value={loginData}
                    placeholder="Parola"
                    onChangeText={text => setLoginData(text)}
                    keyboardType='numeric'
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: "#0059BF",
                        width: "75%",
                        height: 35,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",

                    }}
                    onPress={() => {login()}}
                    activeOpacity={0.7}
                >
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                    }}>Giriş</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}
export default LoginScreen;
