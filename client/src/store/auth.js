import {
    reactive,
    toRefs
} from "vue";
import axios from 'axios';
import router from '@/router'

const state = reactive({
    user_token: sessionStorage.getItem('auth') | null,
    chat_user_id: '',
    is_logged_in: sessionStorage.getItem('auth')? true : false //if get a defined token
});

const userState = reactive({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
})

export default function useUsers() {
    const SERVER_URL =  process.env.VUE_APP_SERVER_URL;
    const login = () => {
        axios.post(`${SERVER_URL}/api/auth/login`, {
            username: userState.username,
            password: userState.password,
        })
            .then((res) => {
                state.user_token = res.data.token;
                state.chat_user_id = res.data.user_id;
                state.is_logged_in = true;
                sessionStorage.setItem('auth', state.user_token);
                router.push({name: "JoinRoom"});
            })
            .catch(() => {
                alert('Login failed')
            })
       
    }

    const register = () => {
        axios.post(`${SERVER_URL}/api/auth/register`, {
                username: userState.username,
                password: userState.password,
                firstName: userState.firstName,
                lastName: userState.lastName
            })
            .then(() => {
                router.push({name: "Login"})
            })
            .catch((err) => {
                alert(err)
            })
    }

    const logout = () => {
        state.is_logged_in = false;
        state.user_token = null;
        router.push({name: "Login"})
    }

    return {
        ...toRefs(state),
        logout,
        userState,
        register,
        login
    }
}