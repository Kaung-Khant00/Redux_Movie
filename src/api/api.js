import axios from "axios";
export const api_key = "402147b1598d2957747cffcddc284dc0"

export const api = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: api_key,
        },
    }
)