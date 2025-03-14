const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "finance_user2", // Замените на ваше имя пользователя PostgreSQL
  host: "localhost",
  database: "finance_app2", // Замените на ваше имя базы данных PostgreSQL
  password: "1234", // Замените на ваш пароль PostgreSQL
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Создание таблиц
const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        category VARCHAR(50),
        amount NUMERIC,
        date DATE
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        goal VARCHAR(255),
        amount NUMERIC
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        category VARCHAR(255),
        category_limit NUMERIC
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50),
        category VARCHAR(50),
        amount NUMERIC,
        date DATE,
        repeat BOOLEAN,
        completed BOOLEAN DEFAULT FALSE
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        reminder VARCHAR(255),
        date DATE
      );
    `);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables();

// CRUD операции для транзакций
app.post("/api/transactions", async (req, res) => {
  const { type, category, amount, date } = req.body;
  if (amount === "") {
    return res.status(400).json({ error: "Amount cannot be empty" });
  }
  console.log("Received request to add transaction:", req.body);
  try {
    const result = await pool.query(
      "INSERT INTO transactions (type, category, amount, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [type, category, amount, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting transaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/transactions", async (req, res) => {
  console.log("Received request to fetch transactions");
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE transactions SET type = $1, category = $2, amount = $3, date = $4 WHERE id = $5 RETURNING *",
      [type, category, amount, date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD операции для целей
app.post("/api/goals", async (req, res) => {
  const { goal, amount } = req.body;
  if (amount === "") {
    return res.status(400).json({ error: "Amount cannot be empty" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO goals (goal, amount) VALUES ($1, $2) RETURNING *",
      [goal, amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting goal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/goals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM goals");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/goals/:id", async (req, res) => {
  const { id } = req.params;
  const { goal, amount } = req.body;
  try {
    const result = await pool.query(
      "UPDATE goals SET goal = $1, amount = $2 WHERE id = $3 RETURNING *",
      [goal, amount, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/goals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM goals WHERE id = $1", [id]);
    res.json({ message: "Goal deleted" });
  } catch (err) {
    console.error("Error deleting goal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD операции для категорий
app.post("/api/categories", async (req, res) => {
  const { category, category_limit } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO categories (category, category_limit) VALUES ($1, $2) RETURNING *",
      [category, category_limit]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { category, category_limit } = req.body;
  try {
    const result = await pool.query(
      "UPDATE categories SET category = $1, category_limit = $2 WHERE id = $3 RETURNING *",
      [category, category_limit, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD операции для платежей
app.post("/api/payments", async (req, res) => {
  const { type, category, amount, date, repeat } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (type, category, amount, date, repeat) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [type, category, amount, date, repeat]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/payments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/payments/:id", async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, repeat, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE payments SET type = $1, category = $2, amount = $3, date = $4, repeat = $5, completed = $6 WHERE id = $7 RETURNING *",
      [type, category, amount, date, repeat, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/payments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM payments WHERE id = $1", [id]);
    res.json({ message: "Payment deleted" });
  } catch (err) {
    console.error("Error deleting payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD операции для напоминаний
app.post("/api/reminders", async (req, res) => {
  const { reminder, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO reminders (reminder, date) VALUES ($1, $2) RETURNING *",
      [reminder, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting reminder:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reminders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reminders");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching reminders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/reminders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM reminders WHERE id = $1", [id]);
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error("Error deleting reminder:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});