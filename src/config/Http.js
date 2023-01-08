import axios from "axios";

const client = axios.create({
  baseURL: "https://swop.cx/rest/rates",
});

client.interceptors.request.use(
  (config) => {
    const accessToken =
      "ApiKey 2327e43d2161aa12f0fbf2e66dff166a0b4abd54a80d2d7c26e4d05acd02d1cb";

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 400:
        console.error(error.response?.data);
        break;
      case 500:
        console.error(error.response?.data);
        break;
      default:
        console.error(error.response?.data);
        break;
    }
    return Promise.reject(error);
  }
);

export default client;
