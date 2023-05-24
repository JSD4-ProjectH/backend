import mongoose from "mongoose";
import Activity from "../models/activity-model.js";

export const getAllData = async (req, res, next) => {
  const gotData = await Activity.find({}).exec();
  return res.status(200).json(gotData);
};

export const deleteCard = async (req, res, next) => {
  Activity.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.error(err));
};

// vvvvvvvvvv Add by Bonn vvvvvvvvvvv
export const getUserData = async (req, res, next) => {
  const gotData = await Activity.find({ user: req.user.user_id }).exec();
  gotData.map(data => {
    let start = new Date(data.startTime).getTime()
    let end = new Date(data.finishTime).getTime()
    let diff = end - start
    let d = 0
    let h = '0' 
    let m = '0'
    let s = '0'
    if(diff/86400000 > 1){
      d = (Math.floor(diff/86400000)).toString()
      diff = diff % (d * 86400000)
    }
    if(diff/3600000 > 1){
      h = (Math.floor(diff / 3600000)).toString()
      diff = diff % (h * 3600000)
    }
    if(diff/60000 > 1){
      m = (Math.floor(diff / 60000)).toString()
      diff %= (m * 60000)
    }
    if(diff/1000 >= 1){
      s = (Math.floor(diff / 1000)).toString()
    }
    if(d === 0){
      data.duration = `${h} h ${m} m ${s} s`
    }else{
      data.duration = `${d} days ${h} h ${m} m ${s} s`
    }
      data.startTime = data.startTime.replace('T', ', ')
      data.finishTime = data.finishTime.replace('T', ', ')
  })
  return res.status(200).json(gotData);
};

export const createActivity = async (req, res) => {
  const data = req.body;
  const userId = req.user.user_id;
  const duration = ''
  try {
    const newActivity = await Activity.create({
      activityName: data.activityName,
      activityType: data.activityType,
      startTime: data.startTime,
      finishTime: data.finishTime,
      duration: duration,
      activityDetail: data.activityDetail,
      activityImage: data.activityImage,
      distance: data.distance,
      user: userId,
    });
    if (!createActivity) {
      return res.status(400).json({ message: "Cannot add new activity!" });
    }
    const newData = await newActivity.save();
    return (
      newData,
      res.status(200).json({ message: "New activity added successfully!" })
    );
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
};