import React, {useState} from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Alert} from "react-native"
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { createUser, SignUp } from '../controler/registerController';
import { User } from '../model/user';
import {useDispatch} from "react-redux"
import {getUser, useUser, getUserImage} from '../actions/user_actions'
import { createContacts } from '../controler/contactController';
import { getActualUser } from '../controler/profileController';
import { ContactsModel } from '../model/contacts';

import { getContactsPhoneNumbers, getContactsId } from '../actions/contacts_actions';

export function RegisterScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const secondDispatch = useDispatch()
    const thirdDispatch = useDispatch()
    const fourthDispatch = useDispatch()
    const fifthDispatch = useDispatch()

    const getUserId = (userId) => dispatch(getUser(userId))
    const getCompleteUser = (user) => secondDispatch(useUser(user))
    const getPhoneNumbersContacts = (phoneNumber) => thirdDispatch(getContactsPhoneNumbers(phoneNumber))
    const getContactIdRedux = (contactId) => fourthDispatch(getContactsId(contactId))
    const getImageUser = (image) => fifthDispatch(getUserImage(image))

    const createInstanceUser = (email, id, name, phoneNumber) =>{
        const myUser = new User(email, id, name, phoneNumber)
        return myUser

    }
    const handleSignUp = () =>{
        getImageUser(null)
        let register = SignUp (email, password)
        register.then(credentials =>{
            
            getUserId(credentials.user.uid)
            const myUser = createInstanceUser(email,credentials.user.uid,name,"")
            const myUserObject = JSON.parse(JSON.stringify(myUser))
            createUser(credentials.user.uid, myUserObject )
            let user = getActualUser(credentials.user.uid)
            user.then(user => getCompleteUser(user.data()))

            const myContacts = new ContactsModel(credentials.user.uid, [{}])
            createContacts(JSON.parse(JSON.stringify(myContacts)))
            .then((doc)=>{
                getContactIdRedux(doc.id)
            })
            .catch(err=>console.log(err.message))
            
            getPhoneNumbersContacts([{}])
            
            navigation.navigate("login")
        })
        .catch((e) =>
         Alert.alert("¡Cuidado!","Algún campo es incorrecto o está vacio.")
        )
    
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
            <TextInput style={styles.input} autoComplete='email' keyboardType='email-address' placeholder="ejemplo@outlook.com" onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text>Nombre:</Text>
            <TextInput style={styles.input} maxLength={30} onChangeText={(text)=>setName(text)} placeholder="Nombre"></TextInput>
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
