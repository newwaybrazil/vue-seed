/* vue-seed services
This is the main vue-seed's service file. All the root variables to call this service should be declared here
*/

// Packages to be imported
import axios from 'axios'
import store from '../store'

export default () => {
    // Vuex variable that holds the access token
    const token = store.getters.token

    // vue-seed's URL
    axios.defaults.baseURL = process.env.API_ENDPOINT

    // CORS-related boolean variable
    axios.defaults.withCredentials = false

    // Request headers
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    return axios
}
