import express from "express";
import { createActivity,getUserData, deleteCard } from "../controllers/activities-controller.js";
import { getActivity, updateActivity } from "../controllers/edit-activity-controller.js";
import {auth} from "../controllers/authenticate-service.js";


//controllers
const ActivityRoutes = express.Router();


ActivityRoutes.delete("/delete/:id", deleteCard);

ActivityRoutes.get('/getactivity/:id',auth, getActivity);
ActivityRoutes.put('/updateactivity/:id',auth, updateActivity);

ActivityRoutes.get("/userdata", auth,  getUserData);
ActivityRoutes.post("/add-activity", auth, createActivity);


export default ActivityRoutes;
