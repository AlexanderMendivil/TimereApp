import "react-native"
import React from 'react';
import renderer from 'react-test-renderer';
import {RegisterScreen} from "../App/Pages/RegisterScreen"
import {SignUp} from "../App/controler/registerController"

it("Render test for Register", ()=>{
  renderer.create(<RegisterScreen/>)
})

test("Register test", ()=>{
  let email=""
  let password="asdfgh"
  expect(email).toBeDefined()
  expect(password).toBeGreaterThanOrEqual(6)
  expect(SignUp( email, password )).toBeDefined()
  expect(SignUp( email, password )).not.toBeUndefined()
  expect(SignUp( email, password )).toBe(Promise)
})
