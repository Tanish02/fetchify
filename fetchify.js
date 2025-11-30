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

  async dispatchRequest({ url, config }) {
    const finalConfig = this.mergeConfig(config);
    console.log("final:", finalConfig);
    const abortController = new AbortController();
    const timeout = finalConfig.timeout || 0;

    let timeoutId;
    if (timeout) {
      console.log("timeout:", timeout);
      timeoutId = setTimeout(() => abortController.abort(), timeout);
    }

    // console.log("final:", finalConfig);
    try {
      const response = await fetch(`${this.config.baseURL}${url}`, {
        ...finalConfig,
        signal: abortController.signal,
      });
      return response;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
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
