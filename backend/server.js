import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import User from "./Schema/UserSchema.js"
dotenv.config()


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
})
.catch(err=>{
    console.log("Error connecting to MobgoDB",err);

})


const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Welcome to the Leaderboard API");
}
);

app.post("/register",(req,res)=>{
    const {username} = req.body;
    if(!username){
        return res.status(400).json({error: "Username is required"});
    }
    const newUser = new User({Name: username})
    newUser.save()
    .then(user=>{
        res.status(201).json({message: "User registered successfully", id: user._id, name: user.Name});
    })
    .catch(err=>{
        console.error("Error registering user:", err);
        res.status(500).json({error: "Internal server error"});
    })


})

app.post("/claim", async (req, res) => {
  let { userId, points } = req.body;

  if (!userId || points == null) {
    return res.status(400).json({ error: "User ID and points are required" });
  }

  points = Number(points);
  if (isNaN(points)) {
    return res.status(400).json({ error: "Points must be a number" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { Points: points } }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Points claimed successfully",
      user: {
        id: updatedUser._id,
        Name: updatedUser.Name,
        points: updatedUser.Points,
      },
    });
  } catch (err) {
    console.error("Error in /claim:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/users",(req,res)=>{
    User.find({}).select("Name _id Points").sort({Points: -1})
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        console.error("Error fetching users:", err);
        res.status(500).json({error: "Internal server error"});
    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})