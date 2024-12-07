const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

app.use(express.json());

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database: ", err);
  } else {
    console.log("Connected to Aiven MySQL Server");
  }
});

app.get("/subcategories", (req, res) => {
  connection.query("SELECT * FROM SubCategories", (err, results) => {
    if (err) {
      console.error("Error fetching subcategories: ", err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});

app.post("/subcategories", (req, res) => {
  const { id, categoryName, subCategoryName } = req.body;

  connection.query(
    "INSERT INTO SubCategories (id, categoryName, subCategoryName) VALUES (?, ?, ?)",
    [id, categoryName, subCategoryName],
    (err, results) => {
      if (err) {
        console.error("Error adding subcategory: ", err);
        res.status(500).send("Server error");
      } else {
        res.status(201).send("Sub-category added successfully");
      }
    }
  );
});

app.get("/menuitems", (req, res) => {
  connection.query("SELECT * FROM MenuItems", (err, results) => {
    if (err) {
      console.error("Error fetching menu items: ", err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});

app.post("/menuitems", (req, res) => {
  const { label, parentId, icon } = req.body;

  connection.query(
    "INSERT INTO MenuItems (label, parentId, icon) VALUES (?, ?, ?)",
    [label, parentId, icon],
    (err, results) => {
      if (err) {
        console.error("Error adding menu item: ", err);
        res.status(500).send("Server error");
      } else {
        res.status(201).send("Menu item added successfully");
      }
    }
  );
});
app.delete("/subcategories/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM SubCategories WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error deleting subcategory: ", err);
        res.status(500).send("Server error");
      } else if (results.affectedRows === 0) {
        res.status(404).send("Sub-category not found");
      } else {
        res.status(200).send("Sub-category deleted successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
