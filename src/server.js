import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoute from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import authRoute from './routes/auth.routes';

const app = express();
dotenv.config();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/auth', authRoute);

// middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Now Listening"));