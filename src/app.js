import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.route.js";
import tutorialRouter from "./routes/tutorial.route.js";
import lessonsRouter from "./routes/lesson.route.js";
import vocabRouter from "./routes/vocab.route.js";

// routes declare
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tutorials", tutorialRouter);
app.use("/api/v1/lessons", lessonsRouter);
app.use("/api/v1/vocabs", vocabRouter);

export { app };
