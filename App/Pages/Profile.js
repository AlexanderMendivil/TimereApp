import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Dimensions} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';

import { auth } from '../model/firebase';
import { useSelector, useDispatch } from 'react-redux';
import {getActualUser, updateUser } from "../controler/profileController"
import { User } from '../model/user';
import {useUser} from '../actions/user_actions'

import * as ImagePicker from "expo-image-picker"

export function Profile() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image, setImage] = useState({})

    const navigation = useNavigation()
    const userId = useSelector(state => state.userRedux.userId)
    const user = useSelector(state => state.userRedux.user)
    const dispatch = useDispatch()
    const upUser = (user) => dispatch(useUser(user))

    useEffect(()=>{
        getUser()
    },[])

    const openImagePicker = async () =>{
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync()

        if(permissionResult.granted == false){
            alert("Permission was denied")
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()
        
        if(pickerResult.cancelled === true){
            return
        }

        setImage({localUri: pickerResult.uri})
    }    

    const getUser = () =>{
         setEmail(user.email)
         setName(user.name)
         setPhoneNumber(user.phoneNumber)
    }
     
    const updateCurrentUser = () =>{
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            const myUser = new User(email,userId,name,phoneNumber)
            let updatedUser = updateUser(userId, JSON.parse(JSON.stringify(myUser)), email)
            updatedUser.then(()=>{alert("Perfil actualizado!")}).catch(err=>console.log(err))
            upUser(JSON.parse(JSON.stringify(myUser)))
        }else{
            alert("Tú email es invalido.")

        }
    }
    const logOut = () =>{
        auth.signOut()
        .then(()=>{
            navigation.reset({
                index:0,
                routes: [{name:"login"}]
            })
        })
        .catch(err => alert(err.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtext}>Aquí puedes ver y modificar la información de tu perfil.</Text>    
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={
                    image.localUri == null ? require("../assets/foto_perfil.jpeg") : {uri: image.localUri}}/>
                <FontAwesome5 name="camera" color="#FF3131" size={30} iconStyle={{marginRight: 20}} onPress={openImagePicker}/>
                <StatusBar style="auto"/>
            </View>
            <View style={styles.formContaier}>
                <Text>Nombre:</Text>
                <TextInput style={styles.input} maxLength={30} placeholder="Nombre" value={name} onChangeText={(text)=>setName(text)}/>
                <Text>Email:</Text>
                <TextInput style={styles.input} autoComplete='email' keyboardType='email-address' placeholder="ejemplo@outlook.com" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Text>Numero de telefono:</Text>
                <TextInput style={styles.input}  value={phoneNumber} onChangeText={(text)=>setPhoneNumber(text)}/>
            </View>
            <View style={styles.account}>
                <TouchableOpacity style={styles.button} onPress={updateCurrentUser}>
                    <Text style={styles.buttonText}>Guardar</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={logOut}>
                    <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.menu}>
                <FontAwesome5 size={20} name="user" style={styles.icon} onPress={()=> navigation.navigate("Perfil")}/>
                <FontAwesome5 size={20} name="home" style={styles.icon} onPress={()=> navigation.navigate("Toma una ruta")}/>
                <FontAwesome5 size={20} name="address-book" style={styles.icon} onPress={()=> navigation.navigate("Contactos")}/>
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
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent:'center',
        marginTop:10
    },
    logo:{
        width:200,
        height:200,
        borderRadius:99
    },
    title:{
        fontSize:24,
        color:'#E51B23'
    },
    formContaier:{
        padding: 40,
        marginBottom: '40%',
    },
    subtext:{
        color: '#787272',
        marginTop:20
    },
    input:{
        borderColor:'#DBDBDB',
        width:300,
        height:40,
        marginTop:5,
        borderWidth:1,
        borderRadius: 5,
    },
    button:{
        backgroundColor:'#FF3131',
        height: 40,
        width:115,
        marginBottom:10,
        marginLeft: 35,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#ffff',
    },
    account:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems: 'center',
        marginTop: -170
    },
    register:{
        color:'#FF3131'
    },
    menu:{
        flex:1,
        width:Dimensions.get("window").width,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'flex-end',
        marginBottom:20,
        borderTopColor:'#787272'
      },
      icon:{
        color: '#787272'
      }
})
