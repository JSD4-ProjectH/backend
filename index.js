import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//config
import { PORT, MONGODB_URI } from "./db.config.js";

//router
import UserRoutes from "./routes/users-routes.js";
import ActivityRoutes from "./routes/activities-routes.js";
// import { auth } from "./controllers/authenticate-service.js";

const app = express();

const acceptedOrigin = {
  origin: "https://everlasting-projecth.vercel.app",
  optionsSuccessStatus: 200,
};
app.use(cors(acceptedOrigin));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//routes
app.use("/user", UserRoutes);
app.use("/activity", ActivityRoutes);

// routes connot found
app.use("/", (req, res) => {
  return res.json({
    status: 200,
    message: "Everlasting API V1.0.0",
  });
});

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });
    console.log("mongoDB has been connected");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();

//https://everlasting.vercel.app
//https://everlasting-gkyr.onrender.com
