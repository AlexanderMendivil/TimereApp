import React, {useState} from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../model/firebase';
import { useNavigation } from '@react-navigation/core';

export function RegisterScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()
    
    const handleSignUp = () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then(credentials =>{
            console.log(credentials.user.email)
            navigation.navigate("login")
        })
        .catch(err => alert(err.message))
    }
    return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo-temp.png')}/>
        <Text style={styles.title}>REGISTER NOW</Text>    
        <Text style={styles.subtext}>Ingresa tus datos de registro.</Text>    
        <StatusBar style="auto"/>
        </View>
        <View style={styles.formContaier}>
            <Text>Email:</Text>
            <TextInput style={styles.input} placeholder="ejemplo@outlook.com" onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text>Nombre:</Text>
            <TextInput style={styles.input} placeholder="Nombre"></TextInput>
            <Text>Contraseña:</Text>
            <TextInput style={styles.input} secureTextEntry placeholder="minimo 6 caracteres" onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        <View style={styles.account}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}><Text style={styles.buttonText}>Registrate</Text></TouchableOpacity>
            <View style={styles.login}>
            <Text style={styles.subtext}>¿Ya tienes cuenta?</Text>
            <Text style={styles.register} onPress={()=>navigation.navigate("login")}>Log in</Text>
            </View>
        </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    logoContainer:{
        alignItems: 'center',
    },
    logo:{
        width:200,
        height:200,
    },
    title:{
        fontSize:24,
        color:'#E51B23'
    },
    formContaier:{
        padding: 30,
        marginBottom: '40%',
        // height: 45,
    },
    subtext:{
        color: '#787272'
    },
    input:{
        borderColor:'#DBDBDB',
        width:300,
        height:40,
        margin:12,
        borderWidth:1,
        borderRadius: 5,
    },
    button:{
        backgroundColor:'#FF3131',
        height: 40,
        width:142,
        marginBottom:10,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#ffff',
    },
    account:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop: -170
    },
    register:{
        color:'#FF3131'
    },
    login:{
        flexDirection:'row'
    }
})
