import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";

const axiosStudy = axios.create({
	baseURL: "http://localhost:8081/study",
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosAuth = axios.create({
	baseURL: "http://localhost:8082/studyoauthserver",
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosResource = axios.create({
	baseURL: "http://localhost:8083/studyresourceserver",
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

export { axiosStudy, axiosAuth, axiosResource };