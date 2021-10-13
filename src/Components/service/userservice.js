import axios from 'axios'

export const signup = async function (obj) {
    console.log(obj)
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', obj)
    console.log(response)
    localStorage.setItem('fundooToken', response.data.id)
    return response
}

export const logIn = async (obj) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/login', obj)
    console.log(response)
    localStorage.setItem('fundooToken', response.data.id)
    return response
}
