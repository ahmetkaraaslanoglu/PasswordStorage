import React, {useState} from 'react';
import {Modal, Pressable, Text, View, TouchableOpacity} from 'react-native';
import {deleteAccount} from '../helpers';


interface AccountCardProps {
    id: number;
    address: string;
    username: string;
    password: string;
    onAccountDeleted: () => void;
}

const AccountCard = ({id,address,username,password,onAccountDeleted}: AccountCardProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Pressable
                style={{
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
                onLongPress={() => {
                    setModalVisible(true);
                }}
            >
                <View style= {{
                    padding: 4,
                    flexDirection:'row',
                    alignItems:'center',
                }}>

                    <View style={{
                        flex:1,
                        padding: 15
                    }}>

                        <Text style={{fontWeight: 'bold', fontSize: 17, color:'black', padding: 5}}>
                            {address}  :
                        </Text>

                        <Text style={{fontSize: 15, color:'black',marginLeft:20}}>
                            {<Text style={{fontWeight: "500"}}>Kullanıcı Adı: </Text>}{username}
                        </Text>

                        <Text style={{fontSize: 15, color:'black',marginLeft:20}}>
                            {<Text style={{fontWeight: "500"}}>Şifre: </Text>}{password}
                        </Text>

                    </View>
                </View>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}>

                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 10,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        width: '80%',
                        height: '18%',
                        justifyContent: 'space-between',
                    }}>

                        {/* Header */}
                        <Text style={{padding:8, fontWeight: '600', fontSize: 17, color:'black'}}>
                            Are you sure for delete {address} ?
                        </Text>

                        {/* Footer */}
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            padding:8,
                            justifyContent: 'flex-end',
                        }}>

                            <TouchableOpacity
                                style={{backgroundColor: '#0059BF', padding: 10, marginRight:8, marginVertical: 5, elevation: 2,borderRadius:10}}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 14,}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{backgroundColor: '#FF0000', padding: 10, marginVertical: 5, elevation: 2, marginRight:8, borderRadius:10}}
                                onPress={async () => {
                                    await deleteAccount(id);
                                    onAccountDeleted();
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 14,}}>
                                    Delete
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default AccountCard;
