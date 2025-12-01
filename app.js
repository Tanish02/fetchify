import fetchify from "./fetchify.js";

// public API
const api = fetchify.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json", "x-api-key": "key" },
});

api.addRequestInterceptors(
  function (config) {
    console.log("INtercepting the Request...", config);
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.addResponseInterceptors(
  function (response) {
    console.log("Response received...", response.sataus);
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

async function main() {
  const response = await api.get("/todos", { timeout: 500 });
  const data = await response.json();
  console.log(data);
}

main();
