import {Selector} from 'testcafe';

const loginButtonSubmit = Selector('#login_submit_button');
const emailInput = Selector('#email');
const passwordInput = Selector('#password');

// eslint-disable-next-line no-undef
fixture `test the login page`
  .page `http://localhost:3001/welcome`

test('log in the user', async t => {
  const loginButton = Selector('#login_button')
  await t
    // .setTestSpeed(1)
    .click(loginButton)
    // .useRole(regularUser)
    .typeText(emailInput, 'aa@aa.com')
    .typeText(passwordInput, '000000*/')
    .click(loginButtonSubmit)
  const coffeeTitle = Selector('#coffee_title')
  // await t.expect()
  await t.expect(coffeeTitle.exists).ok()
})

test('log in failed to the user', async t => {
  const loginButton = Selector('#login_button')
  const loginSubmitButton = Selector('#login_submit_button')
  await t
    .click(loginButton)
    .expect(loginSubmitButton.exists).ok()
    .typeText('#email', 'aa@aa.com')
    .typeText('#password', '0005500*/')
    // .expect(loginButtonSubmit.exists).ok()
    .click(loginSubmitButton)
    // .useRole(wrongUsername) // ROLES DOES NOT WORK HERE SINCE LOGIN IS BEING TESTED
    // .wait(5000) // PAUSING THE TEST
  const errorTitle = Selector('h2').withText('Authentication error')
  const errorMessage = Selector('#error_container_message')
  const errorButton = Selector('#error_submit_button')
  await t
    .expect(errorTitle.exists).ok()
    .expect(errorMessage.exists).ok()
    .expect(errorButton.innerText).contains('Got it!')
    .click(errorButton)
    .expect(errorTitle.exists).notOk()
    .expect(errorMessage.exists).notOk()
    .expect(errorButton.exists).notOk()
})