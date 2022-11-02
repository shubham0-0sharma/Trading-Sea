import axios, { AxiosError } from "axios";


const TOKEN = "cdgvc1qad3i2r375hgm0cdgvc1qad3i2r375hgmg";
export default axios.create({
    baseURL: "https://finnhub.io/api/v1/",
    params : {
        token:TOKEN
    }
});