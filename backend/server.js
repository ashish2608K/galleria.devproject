const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Galleria API is running"
    });
});

// Get products
app.get("/api/products", async (req, res) => {
    try {
        const [products] = await db.query(
            "SELECT * FROM products ORDER BY created_at DESC"
        );

        res.json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get products"
        });
    }
});

// Create order
app.post("/api/orders", async (req, res) => {
    try {
        const {
            customer_name,
            email,
            phone,
            address,
            payment_method,
            total_amount,
            items
        } = req.body;

        if (
            !customer_name ||
            !email ||
            !phone ||
            !address ||
            !payment_method ||
            !total_amount ||
            !items ||
            !items.length
        ) {
            return res.status(400).json({
                message: "Missing required order information"
            });
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [orderResult] = await connection.query(
                `INSERT INTO orders
                (
                    customer_name,
                    email,
                    phone,
                    address,
                    payment_method,
                    total_amount
                )
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    customer_name,
                    email,
                    phone,
                    address,
                    payment_method,
                    total_amount
                ]
            );

            const orderId = orderResult.insertId;

            for (const item of items) {
                await connection.query(
                    `INSERT INTO order_items
                    (
                        order_id,
                        product_id,
                        quantity,
                        price
                    )
                    VALUES (?, ?, ?, ?)`,
                    [
                        orderId,
                        item.product_id,
                        item.quantity,
                        item.price
                    ]
                );
            }

            await connection.commit();

            res.status(201).json({
                success: true,
                message: "Order placed successfully",
                order_id: orderId
            });

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on http://localhost:${process.env.PORT}`
    );
});