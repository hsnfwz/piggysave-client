const callExternalApi = async (options: any) => {
  try {
    const response = await fetch(options.url, options);
    const { data } = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }
};

export { callExternalApi };
