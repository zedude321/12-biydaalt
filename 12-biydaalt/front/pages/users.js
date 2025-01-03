import { Footer, Input, Modal, Sidebar, Table } from "@/components";
import { create, del, read, update } from "@/hooks";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    read("users", setUsers);
  };
  const handleEdit = (i) => {
    setId(users[i].user_id);
    setOpen(true);
    setUsername(users[i].username);
    setEmail(users[i].email);
    setPassword(users[i].password);
  };
  const handleUpdate = () => {
    update(
      "update_users",
      {
        username,
        email,
        password,
        user_id: id,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
  };
  const handleDelete = () => {
    del("delete_user", id, () => {
      setOpen(false);
      fetchPosts();
    });
  };
  const handleAdd = () => {
    create(
      "add_user",
      {
        username,
        email,
        password,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
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
        <Table 
          columns={['ID', 'Email', 'Username', 'Created Date']}
          rows={['user_id', 'email', 'username', 'created_at']}
          data={users}
          filter={filter}
          handleEdit={handleEdit}
        />
        <Footer />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update User" : "Add User"}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        id={id}
      >
        <Input label="Username" value={username} setValue={setUsername} />
        <Input label="Email" value={email} setValue={setEmail} />
        <Input
          type="password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
      </Modal>
    </div>
  );
}
