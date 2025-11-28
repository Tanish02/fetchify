import fetchify from "./fetchify.js";

// public API
const api = fetchify.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const response = await api.get("/todos");
