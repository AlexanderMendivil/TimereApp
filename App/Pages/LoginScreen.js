import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Alert} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { auth } from '../model/firebase';
import { useNavigation } from '@react-navigation/core';

import {useDispatch} from "react-redux"

import {getUser, useUser, getUserImage} from '../actions/user_actions'
import { getContactsId, getContactsPhoneNumbers } from '../actions/contacts_actions';

import { getActualUser } from '../controler/profileController';
import { getContacts } from '../controler/contactController';
import { logIn } from '../controler/loginController';

import { storageFirebase } from '../model/firebase';

export function LoginScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const secondDispatch = useDispatch()
    const thirdDispatch = useDispatch()
    const fourthDispatch = useDispatch()

    const getContactIdRedux = (contactId) => thirdDispatch(getContactsId(contactId))
    const getPhoneNumbersContacts = (phoneNumber) => dispatch(getContactsPhoneNumbers(phoneNumber))
    const getUserId = (userId) => dispatch(getUser(userId))
    const getCompleteUser = (user) => secondDispatch(useUser(user))
    const getImageUser = (image) => fourthDispatch(getUserImage(image))

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
        login.then(credentials => {
            getUserId(credentials.user.uid)

            storageFirebase.ref().child(`/Users/${credentials.user.uid}.jpg`).getDownloadURL().then(url=>{
                getImageUser(url)
                
                })
                .catch(err=>getImageUser(null))

            let user = getActualUser(credentials.user.uid)
            user.then(user => getCompleteUser(user.data()))

            let contacts = getContacts(credentials.user.uid)
            contacts.then(contact => { 
                contact.forEach((doc)=>{
                    getPhoneNumbersContacts(doc.data()["contact"])
                    getContactIdRedux(doc.id)
            })
            
        }).catch(err=>console.log(err))

        })
        .catch(()=>Alert.alert("??Cuidado!","Usuario o contrase??a incorrectos"))
    }
    return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo-temp.png')}/>
        <Text style={styles.title}>LOG IN NOW</Text>    
        <Text style={styles.subtext}>Ingresa tus datos para iniciar sesi??n.</Text>    
        <StatusBar style="auto"/>
        </View>
        <View style={styles.formContaier}>
            <Text>Email:</Text>
            <TextInput style={styles.input} keyboardType='email-address' autoComplete='email' placeholder="ejemplo@outlook.com" onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text>Contrase??a:</Text>
            <TextInput style={styles.input} secureTextEntry placeholder="minimo 6 caracteres" onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        <View style={styles.account}>
            <TouchableOpacity style={styles.button} onPress={handleLogIn}><Text style={styles.buttonText}>Log in</Text></TouchableOpacity>
            <Text style={styles.subtext}>??No tienes cuenta?</Text>
            <Text style={styles.register} onPress={()=>navigation.navigate("register")}>Registrate</Text>
        </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
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