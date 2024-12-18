import { Footer, Input, Modal, Sidebar } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [product_name, setProductName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
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
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  const handleEdit = (i) => {
    setId(products[i].product_id);
    setOpen(true);
    setProductName(products[i].product_name);
    setDescription(products[i].description);
    setPrice(products[i].price);
    setStock(products[i].stock);
  };
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:4000/update_products", {
        product_name,
        description,
        price,
        stock,
        product_id: id,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/delete_product", {
        data: { id },
      });
      console.log('wjat')
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:4000/add_product", {
        product_name,
        description,
        price,
        stock
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAddButton = () => {
    setId(null);
    setProductName("");
    setDescription("");
    setPrice(null);
    setStock(null);
    setOpen(true);
  };
  const filter = () => {
    if (!search) return products;
    return products.filter((e) => {
      return (
        e.product_name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.price.includes(search) ||
        e.stock.toString().includes(search) ||
        e.product_id.toString().includes(search)
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
            Add Product
          </button>
          <Input value={search} setValue={setSearch} label="Search" />
        </div>
        <table className="h-min w-full">
          <thead>
            <tr className="*:text-start *:p-4 *:whitespace-nowrap">
              <th>ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              filter().map((e, i) => (
                <tr
                  className="*:text-start *:p-4 odd:bg-gray-100 *:whitespace-nowrap"
                  key={i}
                >
                  <td>{e.product_id}</td>
                  <td>{e.product_name}</td>
                  <td className="max-w-36 truncate">{e.description}</td>
                  <td>{e.price}</td>
                  <td>{e.stock}</td>
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
        title={id ? "Update Product" : "Add Product"}
      >
        <Input
          label="Product Name"
          value={product_name}
          setValue={setProductName}
        />
        <Input
          label="Description"
          value={description}
          setValue={setDescription}
        />
        <Input label="Price" type="number" value={price} setValue={setPrice} />
        <Input label="Stock" type="number" value={stock} setValue={setStock} />
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
