import fetchify from "./fetchify.js";

// public API
const api = fetchify.create({
  baseURL: "https://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json", "x-api-key": "key" },
});

async function main() {
  const response = await api.get("/todos", {
    headers: {
      "Content-Type": "application/xml",
      "x-idempontency-key": "fdsjnckjsnc",
    },
  });
  const data = await response.json();
  console.log(data);
}

main();
