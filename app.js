import fetchify from "./fetchify.js";

// public API
const api = fetchify.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json", "x-api-key": "key" },
});

api.addRequestInterceptors(
  function (config) {
    console.log("Intercepting the Request...", config);
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.addResponseInterceptors(
  function (response) {
    console.log("Response received...", response.status);
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

async function main() {
  const response = await api.get("/todos", { token: "" });
  const data = await response.json();
  console.log("response:", response);
  console.log("data:", data);
}

main();
