/* import mongoose from "mongoose" */
import Activity from "../models/activity-model.js"


export const getActivity =  async(req, res, next) => {
    try {
        const {id} = req.params
        console.log(id);
        const showActivity = await Activity.findById({_id:id}).exec()
        return res.status(200).json(showActivity)
    } catch (error) {
        return res.json({ status : 500 , message : "error" })
    }
}


export const updateActivity = async(req, res, next) => {
    try {
        const {id} = req.params
        
        const showEditActivity = await Activity.findByIdAndUpdate({_id:id}, req.body , {new: true}).exec()
        return res.status(200).json(showEditActivity)
    } catch (error) {
        return res.json({ status : 500 , message : "error" })
    }
}