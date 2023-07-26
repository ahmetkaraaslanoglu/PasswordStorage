import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/Pages/HomeScreen';
import NewAccountScreen from './src/Pages/NewAccountScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'My Accounts',
                        headerStyle: {
                            backgroundColor: 'white', // Header arka plan rengi
                            height: 54
                        },
                        headerTitle: props => <Image source={require('./src/Images/passwordstorage_headerText.png')} style={{width:220,height:48}} />, // Header resim
                    }}
                />
                <Stack.Screen name="NewAccount" component={NewAccountScreen} options={{title:'Add New Account'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
