import React, {useState} from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';

interface WarningModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
const WarningModal = (address : string) => {
    const [visible,setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{width:'80%',backgroundColor:'red',height:'30%',borderRadius:16}}>
                <View style={{flex:1}}>
                    <View style={{flex:1/5, backgroundColor:'blue'}}>
                        <Text>Warning</Text>
                    </View>
                    <View style={{flex:3/5, backgroundColor:'gray'}}></View>

                    <View style={{flex:1/5, backgroundColor:'pink'}}>
                        <TouchableOpacity

                            onPress={() => {
                                hide();
                            }}

                            style={{
                                flex:1,
                                width: "20%",
                                height: "50%",
                                backgroundColor: "#0059BF",
                                alignSelf: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10
                            }}>
                            <Text style={{color: "white", fontSize: 18}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
}
export default WarningModal;
