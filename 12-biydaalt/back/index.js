const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json()); // Middleware

const pool = mysql.createPool({
  host: "Zezaluus-macbook.local",
  user: "root",
  password: process.env.PASSWORD,
  database: "e_commerse",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
  connection.release();
});

app.get("/users", (_req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.get("/products", (_req, res) => {
  pool.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.get("/orders", (_req, res) => {
  pool.query("SELECT * FROM orders", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.get("/order_items", (_req, res) => {
  pool.query("SELECT * FROM order_items", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.get("/reviews", (_req, res) => {
  pool.query("SELECT * FROM reviews", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.get("/categories", (_req, res) => {
  pool.query("SELECT * FROM categories", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.patch("/update_users", (req, res) => {
  const { username, email, password, user_id } = req.body;
  const sql = `UPDATE users set username = ?, email = ?, password = ? where user_id=?`;

  pool.query(sql, [username, email, password, user_id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.patch("/update_reviews", (req, res) => {
  const { user_id, product_id, rating, review_text, review_id } = req.body;
  const sql = `UPDATE reviews set user_id=?, product_id=?, rating=?, review_text=? where review_id=?`;

  pool.query(
    sql,
    [user_id, product_id, rating, review_text, review_id],
    (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows);
    }
  );
});
app.patch("/update_products", (req, res) => {
  const { product_name, description, price, stock, product_id } = req.body;
  const sql = `UPDATE products SET product_name=?, description=?, price=?, stock=? WHERE product_id=?`;

  pool.query(
    sql,
    [product_name, description, price, stock, product_id],
    (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows);
    }
  );
});
app.post("/add_user", (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  pool.query(sql, [username, email, password], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.post("/add_review", (req, res) => {
  const { user_id, product_id, rating, review_text } = req.body;
  const sql = `INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?)`;

  pool.query(sql, [user_id, product_id, rating, review_text], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.post("/add_product", (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const sql = `INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)`;

  pool.query(sql, [product_name, description, price, stock], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.post("/add_multiple_products", (req, res) => {
  const { items } = req.body;
  const sql = `INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)`;

  items.forEach((e) => {
    pool.query(
      sql,
      [e.product_name, e.descjription, e.price, e.stock],
      (err, rows) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error fetching data from database");
          return;
        }
        res.json(rows);
      }
    );
  });
});
app.post("/add_order", (req, res) => {
  const { user_id, total_amount, status } = req.body;
  const sql = `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)`;

  pool.query(sql, [user_id, total_amount, status], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.post("/add_order_items", (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  const sql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`;

  pool.query(sql, [order_id, product_id, quantity, price], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.patch("/update_orders", (req, res) => {
  const { user_id, total_amount, status, order_id } = req.body;
  const sql = `UPDATE orders SET user_id=?, total_amount=?, status=? WHERE order_id=?`;

  pool.query(sql, [user_id, total_amount, status, order_id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.patch("/update_order_items", (req, res) => {
  const { order_id, product_id, quantity, price, order_item_id } = req.body;
  const sql = `UPDATE order_items SET order_id=?, product_id=?, quantity=?, price=? WHERE order_item_id=?`;

  pool.query(
    sql,
    [order_id, product_id, quantity, price, order_item_id],
    (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows);
    }
  );
});
app.patch("/update_multiple_users", (req, res) => {
  const { items } = req.body;
  const sql = `UPDATE users SET username=?, email=?, password=? WHERE user_id=?`;

  items.forEach((e) => {
    pool.query(
      sql,
      [e.username, e.email, e.password, e.user_id],
      (err, rows) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error fetching data from database");
          return;
        }
        res.json(rows);
      }
    );
  });
});
app.delete("/delete_order", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM orders WHERE order_id=?`;

  pool.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.delete("/delete_review", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM reviews WHERE review_id=?`;

  pool.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.delete("/delete_multiple_users", (req, res) => {
  const { items } = req.body;
  const sql = `DELETE FROM users WHERE user_id = ?`;

  items.forEach((e) => {
    pool.query(sql, [e.user_id], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows);
    });
  });
});
app.delete("/delete_user", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM users WHERE user_id = ?";
  console.log(req.body);

  pool.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.delete("/delete_product", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM products WHERE product_id = ?";
  console.log(req.body);

  pool.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});
app.delete("/delete_order_item", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM order_items WHERE order_item_id = ?";
  console.log(req.body);

  pool.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows);
  });
});



