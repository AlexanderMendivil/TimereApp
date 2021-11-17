import "react-native"
import React from 'react';
import renderer from 'react-test-renderer';
import {LoginScreen} from "../App/Pages/LoginScreen"
import {logIn} from "../App/controler/loginController"

jest.mock( "../App/Pages/LoginScreen")

it("Render test for login", ()=>{
  renderer.create(<LoginScreen/>)
})

test("Login test", ()=>{
  let email=""
  let password="asdfgh"
  expect(email).toBeDefined()
  expect(password).toBeGreaterThanOrEqual(6)
  expect(logIn( email, password )).toBeDefined()
  expect(logIn( email, password )).not.toBeUndefined()
  expect(logIn( email, password )).toBe(Promise)
})


