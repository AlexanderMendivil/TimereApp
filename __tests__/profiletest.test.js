import "react-native"
import React from 'react';
import renderer from 'react-test-renderer';
import {Profile} from "../App/Pages/Profile"

it("Render test for Profile", ()=>{
  renderer.create(<Profile/>)
})
