import {ClientFunction, Selector} from 'testcafe';
import { regularUser } from './roles';

// const localStorageSet = ClientFunction((key, value) => localStorage.setItem(key, value));
const pageUrl = `http://localhost:3001/coffeeStyles`
const coffeeTitle = Selector('#coffee_title')
const dropdown = Selector('select').withAttribute('data-testid', 'selection_drawer')
const drodownOption = dropdown.find('option')
const detailsButton = Selector('button').withText('Details')
const detailsButtonClose = Selector('button').withText('Close')
const detailsDescription = Selector('p').withAttribute('data-testid', 'description')
// eslint-disable-next-line no-undef
fixture `coffee Styles page`
  .page(pageUrl)
  // .beforeEach(async t => {
  //   await localStorageSet('userLoggedIn', 'true');
  //   await t.navigateTo(pageUrl);
  // });
  // .useRole(regularUser)
test('shows  the proper nav bar', async t => {
  await t.expect(coffeeTitle.exists).ok()
  // await t.useRole(regularUser)
  // await t.wait(15000)
  
  // const preparationsLink = Selector('a').withText('Preparations')
  // const coffeeStylesLink = Selector('a').withText('Coffee Styles')
  // const shopLink = Selector('a').withText('Shop')
  // await t
  //   .expect(preparationsLink.exists).ok()
  //   .expect(coffeeStylesLink.exists).ok()
  //   .expect(shopLink.exists).ok()
})

test('shows style selection', async t => {
  await t
    .click(dropdown)
    .click(drodownOption.withText('Cappuccino'))
    .expect(coffeeTitle.innerText).contains('Cappuccino')
})

test('opens details of style selection', async t => {
  await t
    .click(dropdown)
    .click(drodownOption.withText('Espresso'))
    .expect(coffeeTitle.innerText).contains('Espresso')
    .click(detailsButton)
    .expect(detailsDescription.exists).ok()
    .click(detailsButtonClose)
    .expect(detailsDescription.exists).notOk()
})