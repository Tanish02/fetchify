class fetchify {
  config = {
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  requestInterceptors = [];

  // interceptor chains start with config
  constructor(config) {
    this.config = this.mergeConfig(config);
    // console.log("config:", config);
  }

  // request interceptor
  async request(url, config) {
    const finalConfig = this.mergeConfig(config);

    let promise = promise.resolve({
      url,
      config: finalConfig,
    });

    const chain = [
      ...this.requestInterceptors,
      { successFn: this.dispatchRequest.bind(this) },
    ];
  }

  // dispatch interceptor
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

  addRequestInterceptor(successFn, failFn) {
    this.requestInterceptors.push({ successFn, failFn });
  }
}

function create(config) {
  return new fetchify(config);
  // throw new Error("Not implemented");
}

export default {
  create,
};

// end code

// Interceptor logic ->  start > request interceptor > dispatchRequest > response interceptor -> end
