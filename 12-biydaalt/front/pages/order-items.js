import { Footer, Input, Modal, Sidebar, Table } from "@/components";
import { create, del, read, update } from "@/hooks";
import { useEffect, useState } from "react";

export default function OrderItems() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [order_id, setOrderId] = useState();
  const [product_id, setProductId] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    read("order_items", setData);
  };
  const handleEdit = (i) => {
    setId(data[i].order_item_id);
    setOpen(true);
    setOrderId(data[i].order_id);
    setProductId(data[i].product_id);
    setQuantity(data[i].quantity);
    setPrice(data[i].price);
  };
  const handleUpdate = () => {
    update(
      "update_order_items",
      {
        order_id,
        product_id,
        quantity,
        price,
        order_item_id: id,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
  };
  const handleDelete = () => {
    del("delete_order_item", id, () => {
      setOpen(false);
      fetchPosts();
    });
  };
  const handleAdd = () => {
    create(
      "add_order_items",
      {
        order_id,
        product_id,
        quantity,
        price,
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
    setOrderId(null);
    setProductId(null);
    setQuantity(null);
    setPrice(null);
  };
  const filter = () => {
    if (!search) return data;
    return data.filter((e) => {
      return (
        e.order_item_id.toString().includes(search.toLowerCase()) ||
        e.order_id.toString().includes(search) ||
        e.quantity.toString().includes(search) ||
        e.price.toString().includes(search) ||
        e.product_id.toString().includes(search)
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
            Add Order Item
          </button>
          <Input value={search} setValue={setSearch} label="Search" />
        </div>
        <Table
          columns={["ID", "Price", "Quantity", "Product ID", "Order ID"]}
          rows={[
            "order_item_id",
            "price",
            "quantity",
            "product_id",
            "order_id",
          ]}
          data={data}
          filter={filter}
          handleEdit={handleEdit}
        />
        <Footer />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update Order Item" : "Add Order Item"}
        id={id}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      >
        <Input label="Price" value={price} type="number" setValue={setPrice} />
        <Input
          label="Quantity"
          value={quantity}
          type="number"
          setValue={setQuantity}
        />
        <Input
          label="Product ID"
          type="number"
          value={product_id}
          setValue={setProductId}
        />
        <Input
          label="Order ID"
          type="number"
          value={order_id}
          setValue={setOrderId}
        />
      </Modal>
    </div>
  );
}
