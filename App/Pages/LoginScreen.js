import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../model/firebase';
import { useNavigation } from '@react-navigation/core';
import { logIn } from '../controler/loginController';

export function LoginScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
          if(user){
                navigation.replace("Toma una ruta")            
          }
    
        })
        return unsubscribe
      },[])
    
    const handleLogIn = () =>{
        let login = logIn(email, password)
        login .then(credentials => console.log(credentials.user.uid))
        .catch(err=>err.message)
    }
    return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo-temp.png')}/>
        <Text style={styles.title}>LOG IN NOW</Text>    
        <Text style={styles.subtext}>Ingresa tus datos para iniciar sesión.</Text>    
        <StatusBar style="auto"/>
        </View>
        <View style={styles.formContaier}>
            <Text>Email:</Text>
            <TextInput style={styles.input} placeholder="ejemplo@outlook.com" onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text>Contraseña:</Text>
            <TextInput style={styles.input} secureTextEntry placeholder="minimo 6 caracteres" onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        <View style={styles.account}>
            <TouchableOpacity style={styles.button} onPress={handleLogIn}><Text style={styles.buttonText}>Log in</Text></TouchableOpacity>
            <Text style={styles.subtext}>¿No tienes cuenta?</Text>
            <Text style={styles.register} onPress={()=>navigation.navigate("register")}>Registrate</Text>
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
        padding: 40,
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
    }
})
