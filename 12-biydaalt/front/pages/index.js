import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "@/components";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response);

        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchPosts();
  }, []);

  // Post request
  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/add_user", {
        username,
        email,
        password,
      });

      setUsername("");
      setPassword("");
      setEmail("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <Sidebar />
    </div>
  );
}
