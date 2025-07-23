import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
	baseURL: `${url}/api`, // port apne backend ke hisaab se
});

export default instance;
