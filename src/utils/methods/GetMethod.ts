export const getMethod = async (url: string) => {
  try {
    const fetchCall = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const response = await fetchCall.json();
    return response;
  } catch (error) {
    return error;
  }
};
