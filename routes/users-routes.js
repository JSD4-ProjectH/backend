import express from "express";

//controller
import { createUser } from "../controllers/users-register-controller.js";
import { login } from "../controllers/user-login-controller.js";
import {
  getProfileById,
  updateProfileById,
  getBMI
} from "../controllers/users-update-controller.js";
import { auth } from "../controllers/authenticate-service.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", createUser);
UserRoutes.post("/login", login);

UserRoutes.get('/getBMI', auth, getBMI)
UserRoutes.get("/getprofile", auth, getProfileById);
UserRoutes.put("/editprofile/:id", auth, updateProfileById);

export default UserRoutes;
