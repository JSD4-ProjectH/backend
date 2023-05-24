import User from "../models/user-model.js";
import HttpError from "../models/http-error.js";
// import cloudinary from "../utils/cloudinary.js";

export const getProfileById = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const user = await User.findById(user_id).exec();
    const height = user.height[user.height.length - 1];
    const weight = user.weight[user.weight.length - 1];

    const userData = { ...user._doc, height, weight };

    return res
      .status(200)
      .json({ userData, msg: "fetch profile successfully!!" });
  } catch (err) {
    const error = new HttpError("Can't find this user, please try again", 500);
    return next(error);
  }
};

export const updateProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, height, weight, profileImage } = req.body;
    if (!firstname || !lastname || !height || !weight || !profileImage) {
      return new HttpError("Can't find this profile", 404);
    }

    const date = new Date();
    let [m, d, y] = date.toLocaleDateString().split("/");
    const lastUpdated = [`${y}-${m}-${d}`];

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        $push: { height, weight, updatedAt: lastUpdated },
        profileImage,
      },
      { new: true }
    ).exec();
    if (!updatedUser) {
      throw new HttpError("User Not Found", 404);
    }

    return res
      .status(200)
      .json({ updatedUser, msg: "Edit profile successfully!!" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not edit your profile!",
      500
    );
    return next(error);
  }
};

export const getBMI = async (req, res) =>{
  try {
    const { user_id } = req.user;
    const user = await User.findById(user_id).exec();
    return res.json({
      status: 200,
      user
    })
  }catch(err){

  }
}
