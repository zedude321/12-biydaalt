import { Footer, Input, Modal, Sidebar, Table } from "@/components";
import { create, del, read, update } from "@/hooks";
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    read('products', setProducts);
  };
  const handleEdit = (i) => {
    setId(products[i].product_id);
    setOpen(true);
    setProductName(products[i].product_name);
    setDescription(products[i].description);
    setPrice(products[i].price);
    setStock(products[i].stock);
  };
  const handleUpdate = () => {
    update('update_products', {
      product_name,
      description,
      price,
      stock,
      product_id: id,
    }, () => {
      setOpen(false);
      fetchPosts();
    })
  };
  const handleDelete = () => {
    del('delete_product', id, () => {
      setOpen(false);
      fetchPosts();
    })
  };
  const handleAdd = () => {
    create('add_product', {
      product_name,
      description,
      price,
      stock
    }, () => {
      setOpen(false);
      fetchPosts();
    })
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
        <Table 
          columns={['ID', 'Product Name', 'Description', 'Price', 'Stock', 'Created Date']}
          rows={['product_id', 'product_name', 'description', 'price', 'stock', 'created_at']}
          data={products}
          handleEdit={handleEdit}
          filter={filter}
        />
        <Footer />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update Product" : "Add Product"}
        id={id}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
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
      </Modal>
    </div>
  );
}
