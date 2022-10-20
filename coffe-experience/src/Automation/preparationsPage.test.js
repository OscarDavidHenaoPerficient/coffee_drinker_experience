import {Selector} from 'testcafe'

const labelSearchBar = Selector('h2').withText('Busca tu preparación favorita:');
const searchBar = Selector('#search_bar');
const searchButton = Selector('#search_button');
const coffeeTitle = Selector('#coffee_title');
const detailsButton = Selector('button').withText('Details')
const detailsButtonClose = Selector('button').withText('Close')
const detailsDescription = Selector('p').withAttribute('data-testid', 'description')
const errorTitle = Selector('h2').withText('Error en busqueda')
const errorMessage = Selector('#error_container_message')
const errorButton = Selector('#error_submit_button')
  
// eslint-disable-next-line no-undef
fixture `testing preparations page`
  .page `http://localhost:3001/preparations`
  .skipJsErrors()

test('shows up the default search and button', async t => {
  await t
    .expect(labelSearchBar.exists).ok()
    .expect(searchBar.exists).ok()
    .expect(searchButton.exists).ok()
})

test('shows the preparation searched', async t => {
  await t 
    .typeText(searchBar, 'prensa')
    .click(searchButton)
    .expect(coffeeTitle.innerText).contains('Prensa Francesa')
    .click(detailsButton)
    .expect(detailsDescription.exists).ok()
    .click(detailsButtonClose)
    .expect(detailsDescription.exists).notOk()
})

test.only('shows error when no preparation is found', async t => {
  await t 
  .typeText(searchBar, 'blabla')
  .click(searchButton)
  await t
  .expect(errorTitle.exists).ok()
  .expect(errorMessage.exists).ok()
  .expect(errorButton.innerText).contains('Got it!')
  .click(errorButton)
  .expect(errorTitle.exists).notOk()
  .expect(errorMessage.exists).notOk()
  .expect(errorButton.exists).notOk()
})
