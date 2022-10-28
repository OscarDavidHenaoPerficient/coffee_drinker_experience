# coffee_drinker_experience

Coffee drinker experience is a great application made by [@OscarDavidHenaoPerficient](https://github.com/OscarDavidHenaoPerficient/coffee_drinker_experience/commits?author=OscarDavidHenaoPerficient) under the scope of perficient React Training for the React Career Path.

This training it's based on reactjs and it's core ecosystem.

### **React Router** ✔

React Router is used to mount different components when the browser route changes in the scope of the application, with the React Router there's no need of redirecting to a new page each time. This is the core for a [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)

```js
//index.js
...
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
...
```

```jsx
//App.js
...
  <Routes>
    <Route path='/' element={<Navigate replace to='/welcome' />} />
    <Route path='/welcome' element={<Welcome />} />
    <Route path='/login' element={<Login />} />
    <Route path='/coffeeStyles' element={<CoffeeCards/>} />
    <Route path='/preparations' element={<PreparationsCard />} />
    <Route path='*' element={<ErrorPage/>} />
  </Routes>
...
```

```js
//package.json
...
"react-router-dom": "6.4.0", // react-router-dom version
...
```

[Read more](https://v5.reactrouter.com/web/guides/quick-start)

### **React Context** ✔

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

```jsx
//App.js
<AppContextProvider>
  <Layout>....</Layout>
</AppContextProvider>
```

```jsx
//app-context.js
<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
```

[Read more](https://reactjs.org/docs/context.html)

### **React useReducer and Redux basics** ✔

Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method.

```jsx
//app-context.js
<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
```

```jsx
//app-context.js
export const ACTIONS = Object.freeze({
  // App actions
})

//Store updates
export const setSelectedCoffee = (payload) => ({ ... });
export const setCoffeeInitialData = (payload) => ({ ... });
export const setPassword = (payload) => ({ ... });
export const setEmail = (payload) => ({ ... });
export const setIsLoggedIn = (payload) => ({ ... });
export const setErrorState = (payload) => ({ ... });
export const setPreparations = (payload) => ({ ... });

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.ACTIONS.SET_SELECTED_COFFEE:
      return { ... }
    case actions.ACTIONS.SET_COFFEE_INITIAL_DATA:
      return { ... }
    case actions.ACTIONS.SET_EMAIL:
      return { ... }
    case actions.ACTIONS.SET_PASSWORD:
      return { ... }
    case actions.ACTIONS.SET_IS_LOGGED_IN:
      return { ... }
    case actions.ACTIONS.SET_ERROR:
      return { ... }
    case actions.ACTIONS.SET_PREPARATIONS:
      return { ... }
    default:
      return;
  }
}

export default appReducer;
```

It's useful to understand how the application store looks like and keep it as a separate file ✔

```js
//app-models.js
const coffeeSelectedDataInitialState = { ... };
const initialState = Object.freeze({ ... });

export default initialState;
```

[Read more](https://reactjs.org/docs/hooks-reference.html#usereducer)

### **Prop-Types** ✔

Prop-types is useful to keep type validation for each react component and works as a known source of truth for the team involved in the development.

```js
//Card.js
...
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
```

Aditionally, there where multiple suggested topics that came up during sessions, those are:

- Undesrtanding how to handle multiple pages and what are side effects in the javascript ecosystem

  - [Read more about side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)#:~:text=In%20computer%20science%2C%20an%20operation,the%20invoker%20of%20the%20operation.>)
  - [Read more about SPA's](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/choose-between-traditional-web-and-single-page-apps)

- Read React documentation from library page, topics such as: hooks, contextAPI, components type, performance strategies, use of props and state, reconciliation, error boundaries, components lifecycle, HOC, Portals, etc.

  - [hooks](https://www.freecodecamp.org/news/react-hooks-fundamentals)
  - [context](https://reactjs.org/docs/context.html)
  - [class components vs functional components](https://www.geeksforgeeks.org/differences-between-functional-components-and-class-components-in-react/)
  - [performance strategies](https://www.codementor.io/blog/react-optimization-5wiwjnf9hj)
  - [props vs state](https://reactjs.org/docs/faq-state.html)
  - [reconcilliation](https://www.loginradius.com/blog/engineering/reacts-reconciliation-algorithm/#:~:text=Overview-,The%20%E2%80%9Creconciliation%E2%80%9D%20algorithm%20in%20React%20is%20how%20the%20decision%20to,performant%20is%20its%20reconciliation%20algorithm.)
  - [HOC](https://es.reactjs.org/docs/higher-order-components.html)
  - [React portals](https://reactjs.org/docs/portals.html)

- Understanding what is proptypes and why typescript is important for a react project

  - [why typescript](https://www.emizentech.com/blog/react-with-typescript-or-javascript.html)
  - [why typescript 2](https://blog.bitsrc.io/5-strong-reasons-to-use-typescript-with-react-bc987da5d907)
  - [prop-types](https://www.npmjs.com/package/prop-types)

- Accesibility introduction and technical aspects about HTML semantics

  - [HTML semantycs](https://www.w3schools.com/html/html5_semantic_elements.asp)
  - [why accesibility is important](https://www.siteimprove.com/glossary/accessibility-laws/)

- How to reach more users using multilanguage

  - [React internazionalization](https://www.youtube.com/watch?v=txHU6lrsa3o&t=3s)

- How to handle form validations in a react ecosystem

  - [formik](https://formik.org/)
  - [React final form](https://final-form.org/react/)

- Practice: which react hooks are available and how to create new custom hooks

  - [custom hook examples](https://betterprogramming.pub/react-custom-hooks-with-real-life-examples-c259139c3d71)
  - [custom hook theory](https://reactjs.org/docs/hooks-custom.html)

- How to create a react application and which alternatives are in the industry

  - [nextjs](https://nextjs.org/)
  - [remix](https://remix.run/)
  - [Gatsby](https://www.gatsbyjs.com/)
  - [classic create react app](https://create-react-app.dev/)

- How to extend basic create react app configuration using CRACO

  - [link here to see CRACO](https://www.npmjs.com/package/@craco/craco)

- Practice: mock a REST api to develop a local react application

- Read documentation of core and advance topics (memoization, IIFE, currying)
  - [currying](https://javascript.info/currying-partials)
  - [react memo and callback](https://www.developerway.com/posts/how-to-use-memo-use-callback)
    - [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
    - [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
- What is webpack and why is important

  - [webpack in a nutshell](https://yonatankra.com/how-to-use-htmlwebpackplugin-for-multiple-entries/)

- Why user experience is important and how to think outside the box

- Undesrtanding how to handle multiple pages and what are side effects in the javascript ecosystem
