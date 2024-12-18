export const fetchPosts = async (setData, url, setError) => {
  try {
    const response = await axios.get("http://localhost:4000/" + url);
    setData(response.data);
    setError(null);
  } catch (err) {
    setError(err.response?.data?.error || "An error occurred");
  }
}