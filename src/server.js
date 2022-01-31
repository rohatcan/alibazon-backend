import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorHandler } from './middleware/error.middleware.js';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import productRoute from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import authRoute from './routes/auth.routes.js';
import cartRoute from './routes/cart.routes.js';
import wishlistRoute from './routes/wishlist.routes.js';

import cors from "cors";
const app = express();
app.use(cors());
dotenv.config();
app.use(morgan("dev"));

// Sentry boilerplate
Sentry.init({
    dsn: "https://2abd338118f246e98c0a34e8c710d39e@o1130558.ingest.sentry.io/6174635",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.use(express.json());

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use("/api/products", productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/wishlist', wishlistRoute);
app.get("/api/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Now Listening"));