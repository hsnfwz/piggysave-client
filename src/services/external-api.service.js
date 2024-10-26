const callExternalApi = async (options) => {
  try {
    const response = await fetch(options.url, options);
    const { data } = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }
};

export { callExternalApi };
