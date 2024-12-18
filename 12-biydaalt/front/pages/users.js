import { Footer, Input, Modal, Sidebar } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  const handleEdit = (i) => {
    setId(users[i].user_id);
    setOpen(true);
    setUsername(users[i].username);
    setEmail(users[i].email);
    setPassword(users[i].password);
  };
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:4000/update_users", {
        username,
        email,
        password,
        user_id: id,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/delete_user", {
        data: { id: id },
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:4000/add_user", {
        username,
        email,
        password,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAddButton = () => {
    setId(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setOpen(true);
  };
  const filter = () => {
    if (!search) return users;
    return users.filter((e) => {
      return (
        e.username.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.user_id.toString().includes(search.toLowerCase())
      );
    });
  };

  if (error) <div>{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-scroll">
        <div className="flex px-6 items-center gap-6 sticky top-0 bg-white h-20">
          <button
            className="p-3 border-blue-400 border whitespace-nowrap px-6 rounded-lg h-min bg-blue-400"
            onClick={handleAddButton}
          >
            Add User
          </button>
          <Input value={search} setValue={setSearch} label="Search" />
        </div>
        <table className="h-min w-full">
          <thead>
            <tr className="*:text-start *:p-6 *:whitespace-nowrap">
              <th>ID</th>
              <th className="w-1/2">Email</th>
              <th className="w-1/2">Username</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              filter().map((e, i) => (
                <tr
                  className="*:text-start *:p-6 odd:bg-gray-100 *:whitespace-nowrap"
                  key={i}
                >
                  <td>{e.user_id}</td>
                  <td>{e.email}</td>
                  <td>{e.username}</td>
                  <td>
                    {new Date(e.created_at).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </td>
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      handleEdit(i);
                    }}
                  >
                    Edit
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Footer />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update User" : "Add User"}
      >
        <Input label="Username" value={username} setValue={setUsername} />
        <Input label="Email" value={email} setValue={setEmail} />
        <Input
          type="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        {id ? (
          <div className="flex justify-between">
            <button
              className="p-2 px-6 rounded-lg bg-green-400"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
            <button
              className="p-2 px-6 rounded-lg bg-red-400"
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        ) : (
          <button
            className="p-2 px-6 rounded-lg bg-blue-400"
            onClick={handleAdd}
          >
            ADD
          </button>
        )}
      </Modal>
    </div>
  );
}
