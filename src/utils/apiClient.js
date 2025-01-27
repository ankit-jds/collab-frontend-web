const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const apiClient = async (
  url,
  options = {},
  // baseURL = "http://127.0.0.1:8420/"
  baseURL = "http://192.168.1.24:8420/"
) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  };

  const response = await fetch(`${baseURL}${url}`, {
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
