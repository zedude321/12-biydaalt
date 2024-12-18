import { Footer, Input, Modal, Sidebar, Table } from "@/components";
import { create, del, read, update } from "@/hooks";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [product_id, setProductId] = useState();
  const [user_id, setUserId] = useState();
  const [rating, setRating] = useState();
  const [review_text, setReviewText] = useState();
  const [created_at, setCreatedAt] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    read("reviews", setData);
  };
  const handleEdit = (i) => {
    setId(data[i].review_id);
    setOpen(true);
    setUserId(data[i].user_id);
    setRating(data[i].rating);
    setReviewText(data[i].review_text);
    setProductId(data[i].product_id);
  };
  const handleUpdate = () => {
    update(
      "update_reviews",
      {
        user_id,
        product_id,
        rating,
        review_text,
        review_id: id,
      },
      () => {
        setOpen(false);
        fetchPosts();
      }
    );
  };
  const handleDelete = () => {
    del("delete_review", id, () => {
      setOpen(false);
      fetchPosts();
    });
  };
  const handleAdd = () => {
    create(
      "add_review",
      {
        user_id,
        product_id,
        rating,
        review_text,
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
    setUserId(null);
    setProductId(null);
    setRating(null);
    setReviewText(null);
  };
  const filter = () => {
    if (!search) return data;
    return data.filter((e) => {
      return (
        e.review_id.toString().includes(search) ||
        e.user_id.toString().includes(search) ||
        e.product_id.toString().includes(search) ||
        e.rating.toString().includes(search) ||
        e.review_text.toLowerCase().includes(search.toLowerCase())
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
            Add Review
          </button>
          <Input value={search} setValue={setSearch} label="Search" />
        </div>
        <Table
          columns={["ID", "User ID", "Product ID", "Rating", "Review Text"]}
          rows={[
            "review_id",
            "user_id",
            "product_id",
            "rating",
            "review_text",
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
        <Input label="User ID" value={user_id} type="number" setValue={setUserId} />
        <Input
          label="Product ID"
          value={product_id}
          type="number"
          setValue={setProductId}
        />
        <Input
          label="Rating"
          type="number"
          value={rating}
          setValue={setRating}
        />
        <Input
          label="Review Text"
          value={review_text}
          setValue={setReviewText}
        />
      </Modal>
    </div>
  );
}
