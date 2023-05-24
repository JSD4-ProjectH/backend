import mongoose from "mongoose";

const { Schema } = mongoose;

const ActivitySchema = new Schema({
  activityName: { 
    type: String, 
    required: [true, 'activity name is required'] 
  },
  activityType: { 
    type: String, 
    required: [true, 'activity type is required']  
  },
  startTime: { 
    type: String, 
    required: [true, 'start time is required']  
  },
  finishTime: { 
    type: String, 
    required: [true, 'finish time is required']  
  },
  duration: {
    type: String
  },
  activityDetail: { 
    type: String,
    required: [true, 'activity detail is required']
   },
  activityImage: { 
    type: String,
    // optional 
  },
  distance: {
    type : String,
    // optional
  },
  user: {
    type: String, 
    required: [true, 'user is required'], 
  },
});

const Activity = mongoose.model("Activity", ActivitySchema, "activities");

export default Activity;