import axios from 'axios';

export const fetchDataCoffee = () => {
  return async () => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/coffee_types');
      if (!response.ok) {
        throw new Error('data fetch failed')
      }
      const data = await response.json();
      return data
    }
    try {
      const dataCoffee = await fetchData()
      return dataCoffee
    } catch (error) {
      console.log(error);
    } 
  }
};

export const fetchDataSecond = async () => {
  try {
    const response = await fetch('http://localhost:3000/coffee_types');
    if (!response.ok) {
      throw new Error('fetching failed');
    }
    const data =  response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

export const getCoffeeList = async () => {
  try {
    const response = await axios('http://localhost:3000/coffee_types')
    return response.data;
  } catch (error) {
    console.log(error)
  }
  // let responseData
  
  // .then(function (response) {
  //     console.log('in fetchers', response.data);
  //     responseData = response.data;
  //     // return JSON.stringify(response.data)
  //     return Promise.resolve(responseData)
  //   }).catch((error) => {
  //     console.log(error);
  //     responseData = error;
  //   });
  // return new Promise((resolve, reject) => responseData)
}
