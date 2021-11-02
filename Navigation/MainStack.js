import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import {LoginScreen} from '../App/Pages/LoginScreen';
import {Home} from '../App/Pages/Home';
import { RegisterScreen } from '../App/Pages/RegisterScreen';
import { Profile } from '../App/Pages/Profile';
import { Contacts } from '../App/Pages/Contacts';


const Stack = createNativeStackNavigator()
function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="register" component={RegisterScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Toma una ruta" component={Home}/>
                <Stack.Screen name="Perfil" component={Profile}/>
                <Stack.Screen name="Contactos" component={Contacts}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStack;