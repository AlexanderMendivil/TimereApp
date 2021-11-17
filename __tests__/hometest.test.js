import "react-native"
import React from 'react';
import renderer from 'react-test-renderer';
import {Home} from "../App/Pages/Home"

it("Render test for Home", ()=>{
  renderer.create(<Home/>)
})
