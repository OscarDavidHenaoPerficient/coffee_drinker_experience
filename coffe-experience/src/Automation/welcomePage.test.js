import {fixture, Selector} from 'testcafe';

fixture `Test Welcome page`
  .page `localhost:3001/welcome`

test.skip('shows welcome message', async t => {
  const welcomeMessage = Selector('#welcome_message').innerText;
  await t.expect(welcomeMessage).contains('hello welcome to coffee Styles')
  // console.log(welcomeMessage);
})

test.skip('shows title', async t => {
  await t.expect(Selector('#title_website').innerText).contains('Coffee Styles')
})

test.skip('redirects to login page', async t => {
  const loginButton = Selector('#login_button')
  await t.click(loginButton)
  const loginForm = Selector('#login_form')
  await t.expect(loginButton.exists).ok()
    .expect(loginForm.exists).ok()
    .expect(Selector('#login_invitation').innerText).contains('Por favor ingrese sus credenciales')
})