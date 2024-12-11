import { User } from "../models/user.model.js";
// import { Token } from "../models/token.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log("email : ", email);
    console.log(req.body);

    if (
      [username, email, password, role].some((field) => field?.trim() === "")
    ) {
      // throw new ApiError(400, "all fields are required");
      res.send("all fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      // throw new ApiError(409, "User with email or username already exists");
      return res.status(400).json(new ApiResponse(400, [], "email exist"));
    }

    console.log(req.files);

    let photoLocalPath = "";
    if (req.files && req.files?.photo && req.files?.photo.length > 0) {
      photoLocalPath = req.files?.photo[0]?.path;
    }
    console.log(req.files);
    console.log(photoLocalPath);

    if (!photoLocalPath) {
      // throw new ApiError(400, "Photo file is required");
      return res.status(400).send({ message: "photo file required" });
    }

    let photo = await uploadOnCloudinary(photoLocalPath);
    if (!photo) {
      // throw new ApiError(400, "Photo file upload failed.");
      return res.status(400).send({
        message:
          "photo file upload failed || internal server error!! files unable to upload",
      });
    }

    const createdUser = await User.create({
      username,
      email,
      password,
      role,
      photo: photo?.url,
    });

    const userData = await User.findById(createdUser._id).select(
      "-password -refreshToken"
    );

    if (!userData) {
      // throw new ApiError(500, "Something wrong registering the User");
      return res
        .status(500)
        .send({ message: "Something wrong registering the User" });
    }

    return res
      .status(201)
      .json(new ApiResponse(200, userData, "User created successfully!!"));
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    // throw new ApiError(404, "User does not exists");
    return res
      .status(404)
      .json(new ApiResponse(404, [], "User does not exists"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    // throw new ApiError(400, "Invalid user credentials");
    return res
      .status(404)
      .json(new ApiResponse(404, [], "Invalid user credentials"));
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
      },
      "User logged in successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user_id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged Out successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  if (!users || users.length === 0) {
    throw new ApiError(404, "Users not found");
  }

  return res.status(200).json(new ApiResponse(200, users, "all users fetched"));
});

const singleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id not exists");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"));
});

const userUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id not exists");
  }

  const { role } = req.body;
  if (!role) {
    throw new ApiError(400, "role not given");
  }

  const user = await User.findById(id).select("-password");

  if (user.role === role) {
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User role already up-to-date"));
  }
  if (role) {
    user.role = role;
  }

  const updatedUser = await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Updated User successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  singleUser,
  userUpdate,
};
