export default function ({ $axios, store }) {
    $axios.setHeader('Content-Type', 'application/json');
    $axios.setToken(store.state.api_token, 'Bearer')
}