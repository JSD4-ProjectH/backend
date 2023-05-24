//schema
import Activity from "../models/activity-model.js";

// export const createNewActivity = async (data) => {
//   const newActivity = await Activity.create({
//     activityTitle: "Jean-Luc Picard",
//   });
//   return newActivity;
// };

// export const createNewActivity = async (req,res) => {
//   try { 
//     const newActivity = await Activity.create({
//     activityName: req.body.activityName,
//     activityType: req.body.activityType,
//     startTime: req.body.startTime,
//     finishTime: req.body.finishTime,
//     activityDetail: req.body.activityDetail,
//     activityImage: req.body.activityImage,
//     distance: req.body.distance,
//   })
//   if (!createNewActivity) {
//     return res.status(400).json({ message: "Cannot add new activity!" });
//   }
//     const newData = await newActivity.save();
//     // data.push(...newData);
//     return newData, res.status(200).json({ message: "New activity added successfully!" });
// } catch (err) {
//   console.error(err);
//   return res.status(400).send(err);