import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";

const axiosStudy = axios.create({
	baseURL: REACT_APP_WEBPACK_CLIENT_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosAuth = axios.create({
	baseURL: REACT_APP_WEBPACK_AUTH_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosResource = axios.create({
	baseURL: REACT_APP_WEBPACK_RESOURCE_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

export { axiosStudy, axiosAuth, axiosResource };