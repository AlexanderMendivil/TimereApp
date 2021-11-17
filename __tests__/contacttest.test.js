import "react-native"
import React from 'react';
import renderer from 'react-test-renderer';
import {Contacts} from "../App/Pages/Contacts"

it("Render test for Home", ()=>{
  renderer.create(<Contacts/>)
})
