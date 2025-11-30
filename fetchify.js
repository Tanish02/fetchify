class fetchify {
  config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(config) {
    this.config = this.mergeConfig(config);
    // console.log("config:", config);
  }

  async get(url, config) {
    // console.log("config:", this.config, config);
    const finalConfig = this.mergeConfig(config);
    // console.log("final:", finalConfig);
    return fetch(`${this.config.baseURL}${url}`, finalConfig);
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
