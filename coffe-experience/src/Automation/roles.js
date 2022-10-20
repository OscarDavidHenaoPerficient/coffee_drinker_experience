import {Selector, Role} from 'testcafe';

const loginButton = Selector('#login_submit_button');
const emailInput = Selector('#email');
const passwordInput = Selector('#password');

const regularUser = Role('http://localhost:3001/login', async t => {
  console.log('role used');
  await t 
  .typeText(emailInput, 'aa@aa.com')
  .typeText(passwordInput, '000000*/')
  .click(loginButton());
})

const wrongUsername = Role('http://localhost:3001/login', async t => {
  await t 
    .typeText(emailInput, 'aa@dddddaa.com', {paste: true})
    .typeText(passwordInput, '000000*/', {paste: true})
    .click(loginButton());
})

const wrongPassword = Role('http://localhost:3001/login', async t => {
  await t 
    .typeText(emailInput, 'aa@aa.com', {paste: true})
    .typeText(passwordInput, 'sss000000*/', {paste: true})
    .click(loginButton());
})

export { regularUser, wrongPassword, wrongUsername}