import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image,Text, TextInput, TouchableOpacity, Dimensions, FlatList} from "react-native"
import { StatusBar } from 'expo-status-bar';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import { useSelector, useDispatch } from 'react-redux';

import { uploadContact } from '../controler/contactController';
import { ContactsModel } from '../model/contacts';
import { getContactsPhoneNumbers } from '../actions/contacts_actions';
import { v4 as uuidv4 } from "uuid"


export function Contacts({navigation}) {

    const [contactName, setcontactName] = useState("")
    const [contactNumberText, setcontactNumber] = useState("")
    const [contactsNumber, setContacts] = useState([{}])

    const secondDispatch = useDispatch()

    const userId = useSelector(state => state.userRedux.userId)
    const phoneNumbers = useSelector(state => state.contactRedux.contactsPhone)
    const idContact = useSelector(state => state.contactRedux.contactId)
    const contactsNumberNew = (phoneNumber) => secondDispatch(getContactsPhoneNumbers(phoneNumber))
    // setContacts(phoneNumbers)
    
    useEffect(()=>{
        setContacts(phoneNumbers)
    },[])

    const submitContacts = (contacto) => {
        const finalContact = new ContactsModel(userId, contacto)
        const finalContactObject = JSON.parse(JSON.stringify(finalContact))

        const upContact = uploadContact(idContact, finalContactObject)
        upContact.then().catch(err=>console.log(err.message))
    }
    const addContact = () => {
        let temporaryContacts
        if(contactName !== "" && contactNumberText !== "" && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(contactNumberText)){
            temporaryContacts = [...contactsNumber, {key:uuidv4(), name: contactName, phoneNumber: contactNumberText}]
        }else{
            alert("El nombre o número de telefono son invalidos.")
            return
        }
        if(Object.keys(contactsNumber[0]).length === 0){
            temporaryContacts.shift()
            contactsNumberNew(temporaryContacts)
            submitContacts(temporaryContacts)
            return
        }
        contactsNumberNew(temporaryContacts)
        submitContacts(temporaryContacts)
        setContacts(temporaryContacts)
    } 
    const deleteContact = (key) => {
        
        let data = JSON.parse(JSON.stringify(contactsNumber))
        let phone = data.filter((contact) => contact.key !== key)
        if(phone.length === 0){
            setContacts([{}])
            contactsNumberNew([{}])
            submitContacts([{}])
            return
        }
        contactsNumberNew(phone)
        submitContacts(phone)
        setContacts(phone)
    }

    return (  
        <View 
        style={styles.container}>
            <Text style={styles.subtext}>Aquí puedes ver tus contactos de confianza.</Text>
            {
                contactsNumber !== null && Object.keys(contactsNumber[0]).length !== 0 ?

                <FlatList style={{width:"80%", height: "20%"}}
                    data={contactsNumber} 
                    renderItem={({item})=>(
                        <View style={styles.contactContainer}>
                            <TouchableOpacity onPress={()=>deleteContact(item.key)}>
                            <FontAwesome5 name="trash" color="#FF3131" size={20} iconStyle={{marginRight: 20}}/>
                            </TouchableOpacity>
                            <View style={styles.information}>
                                <Text style={styles.subtext}>{item.name}</Text>    
                                <Text style={styles.subtext}>{item.phoneNumber}</Text>    
                            </View>
                        </View>
                        )
                    }
                     keyExtractor={(item, index) =>item.key.toString()}
                />
        
        : <Text>No hay contactos.</Text>

    }
            <View style={styles.formContaier}>
                <Text>Nombre:</Text>
                <TextInput style={styles.input} onChangeText={(text)=>setcontactName(text)} placeholder="Maria Jose Gonzalez Vasquez"/>
                <Text>Numero:</Text>
                <TextInput style={styles.input} onChangeText={(text)=>setcontactNumber(text)} placeholder="+52 6624657587"/>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>addContact()}><Text style={styles.buttonText}>Agregar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>console.log("")}><Text style={styles.buttonText}>Guardar</Text></TouchableOpacity>
                </View>
                
            </View>
         
            <View style={styles.menu}>
                  <FontAwesome5 size={20} name="user" style={styles.icon} onPress={()=> navigation.navigate("Perfil")}/>
                  <FontAwesome5 size={20} name="home" style={styles.icon} onPress={()=> navigation.navigate("Toma una ruta")}/>
                  <FontAwesome5 size={20} name="address-book" style={styles.icon} onPress={()=> navigation.navigate("Contactos")}/>
            </View>
            <StatusBar style="auto"/>
        </View>
    );

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
        alignItems:'center'
    },
    contactContainer:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems: 'flex-end',
        justifyContent:"space-around",
        marginTop:10,
        borderBottomColor:'#787272',
        borderBottomWidth:1
    },
    information:{
        // flex:1,
        marginLeft:5,
    },
    contacto:{
        width:50,
        height:50,
        borderRadius:99
    },
    title:{
        fontSize:24,
        color:'#E51B23'
    },
    formContaier:{
        flex:1,
        padding: 40,
        marginBottom: '40%',
    },
    subtext:{
        color: '#787272',
        marginTop:5
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
        marginTop:10,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#ffff',
    },
    menu:{
        // flex:1,
        width:Dimensions.get("window").width,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'flex-end',
        marginBottom:20,
        borderTopColor:'#787272'
      },
      icon:{
        color: '#787272'
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      buttonContainer:{
          flexDirection: 'row',
          justifyContent: "space-evenly"
      }
})
