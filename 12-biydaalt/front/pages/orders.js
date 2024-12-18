import { Footer, Input, Modal, Sidebar, Table } from "@/components";
import { create, del, read, update } from "@/hooks";
import { useEffect, useState } from "react";

export default function Orders() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [total_amount, setTotalAmount] = useState();
  const [status, setStatus] = useState();
  const [user_id, setUserId] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    read("orders", setData);
  };
  const handleEdit = (i) => {
    setId(data[i].order_id);
    setOpen(true);
    setTotalAmount(data[i].total_amount);
    setStatus(data[i].status);
    setUserId(data[i].user_id);
  };
  const handleUpdate = () => {
    update(
      "update_orders",
      {
        user_id,
        total_amount,
        status,
        order_id: id,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
  };
  const handleDelete = () => {
    del("delete_order", id, () => {
      setOpen(false);
      fetchPosts();
    });
  };
  const handleAdd = () => {
    create(
      "add_order",
      {
        user_id,
        total_amount,
        status,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
  };
  const handleAddButton = () => {
    setId(null);
    setOpen(true);
    setTotalAmount(null);
    setStatus(null);
    setUserId(null);
  };
  const filter = () => {
    if (!search) return data;
    return data.filter((e) => {
      return (
        e.status.includes(search.toLowerCase()) ||
        e.total_amount.toString().includes(search.toLowerCase()) ||
        e.order_id.toString().includes(search) ||
        e.user_id.toString().includes(search)
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
            Add Order
          </button>
          <Input value={search} setValue={setSearch} label="Search" />
        </div>
        <Table 
          columns={['ID', 'Status', 'Total Amount', 'User ID']}
          rows={['order_id', 'status', 'total_amount', 'user_id']}
          data={data}
          filter={filter}
          handleEdit={handleEdit}
        />
        <Footer />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update Order" : "Add Order"}
        id={id}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      >
        <Input
          label="Status"
          value={status}
          setValue={setStatus}
        />
        <Input
          label="Total Amount"
          value={total_amount}
          type="number"
          setValue={setTotalAmount}
        />
        <Input label="User ID" type="number" value={user_id} setValue={setUserId} />
      </Modal>
    </div>
  );
}
