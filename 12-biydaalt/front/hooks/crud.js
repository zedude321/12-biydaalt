import axios from "axios";

export const update = async (url, body, onSuccess) => {
  try {
    await axios.patch("http://localhost:4000/" + url, body);
    onSuccess();
  } catch (err) {
    alert(err.response?.data?.error || "Error");
  }
}

export const del = async (url, id, onSuccess) => {
  try {
    await axios.delete("http://localhost:4000/" + url, {
      data: { id },
    });
    onSuccess();
  } catch (err) {
    alert(err.response?.data?.error || "Error");
  }
}

export const create = async (url, body, onSuccess) => {
  try {
    await axios.post("http://localhost:4000/" + url, body);
    onSuccess();
  } catch (err) {
    alert(err.response?.data?.error || "Error");
  }
};

export const read = async (url, setData) => {
  try {
    const response = await axios.get("http://localhost:4000/" + url);
    setData(response.data);
  } catch (err) {
    alert(err.response?.data?.error || "An error occurred");
  }
};