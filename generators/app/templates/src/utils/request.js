import axios from "axios";
import { Message } from "element-ui";
import queryString from "query-string";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// axios.defaults.headers.withCredentials = true;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function normalizeContentyType(headers) {
  const contentType = headers && headers["Content-Type"];
  return contentType || "application/x-www-form-urlencoded";
}

axios.interceptors.request.use(
  config => {
    // const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO)) || {};
    // const token = loginInfo.token;
    // if (token) {
    //   config.headers.token = `${token}`;
    // } else {
    //   delete config.headers.token;
    // }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data;
    if (code !== 0) {
      response.config.showErr !== false &&
        Message({
          message: msg,
          type: "error"
        });
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, params, config) {
  config = Object.assign({}, config);
  return axios.get(url, { params }, config);
}

export function post(url, params, config) {
  config = Object.assign({}, config);
  const contentType = normalizeContentyType(config.headers);

  switch (contentType) {
    case "application/x-www-form-urlencoded":
      params = queryString.stringify(params);
      break;
    case "application/json":
      params = JSON.stringify(params);
      break;
    default:
      break;
  }

  return axios.post(url, params, config);
}

export function put(url, params = {}, config) {
  config = Object.assign({}, config);
  return axios.put(url, queryString.stringify(params), config);
}

export function download(url, params = {}) {
  axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: queryString.stringify(params),
    responseType: "blob"
  })
    .then(response => {
      if (!response.data) {
        return;
      }

      const header = response.headers["content-disposition"];
      const filename = /filename=(.+)$/.exec(header)[1];
      let url = window.URL.createObjectURL(new Blob([response.data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", decodeURIComponent(filename));

      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
