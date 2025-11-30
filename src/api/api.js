import axios from "axios";

export const api = axios.create({
    baseURL:"https://muhtshim.com/api/v1/",headers:{
        "Authorization":`Bearer 50|63r25lYmvHUfhjcmb5kFpE6FXS8OCyP91C5m9Oly01641b2b`
    }
})