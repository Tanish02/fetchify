class fetchify {
  config = {
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(config) {
    this.config = this.mergeConfig(config);
    // console.log("config:", config);
  }

  dispatchRequest({ url, config }) {
    // console.log("config:", this.config, config);
    const finalConfig = this.mergeConfig(config);
    // console.log("final:", finalConfig);
    return fetch(`${this.config.baseURL}${url}`, finalConfig);
  }

  async get(url, config) {
    return this.dispatchRequest({
      url,
      config: { ...config, method: "GET" },
    });
  }
  async post(url, data, config) {
    return this.dispatchRequest({
      url,
      config: { ...config, method: "POST" },
    });
  }

  mergeConfig(config) {
    return {
      ...this.config,
      ...config,
      headers: {
        ...(this.config.headers || {}),
        ...(config?.headers || {}),
      },
    };
  }
}

function create(config) {
  return new fetchify(config);
  // throw new Error("Not implemented");
}

export default {
  create,
};
