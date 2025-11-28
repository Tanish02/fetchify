class fetchify {
    config = {
        Headers: {
            'Content-Type': 'application/json',
        },
    };


  constructor(config) {
    this.config = config;
  }
}

function create(config) {
  return new fetchify(config);
  // throw new Error("Not implemented");
}

export default {
  create,
};
