const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const apiClient = async (
  url,
  options = {},
  // baseURL = "http://127.0.0.1:8420/"
  baseURL = "http://192.168.1.16:8420/"
) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  };
  let queryString = "";

  if (options?.params) {
    queryString = new URLSearchParams(options?.params).toString();
  }
  let fullUrl = queryString
    ? `${baseURL}${url}?${queryString}`
    : `${baseURL}${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};

export default apiClient;
