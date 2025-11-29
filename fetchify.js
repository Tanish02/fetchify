class fetchify {
  config = {
    Headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(config) {
    this.config = config;
  }

  async get(url) {
    return fetch("${this.config.baseURL}${url}");
  }
}

function create(config) {
  return new fetchify(config);
  // throw new Error("Not implemented");
}

export default {
  create,
};
