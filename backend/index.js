const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbURL = process.env.ALTAS_DB_URL;
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");
const User = require("./models/user.model");
const Note = require("./models/note.model");
// App Use Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cors Config

app.use(
  cors({
    origin: "*",
  })
);

// Mongoose Connection
main()
  .then((res) => {
    console.log("Database is Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}

// Get User API

app.get("/get-user", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });
  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Create Account

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: true, message: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login  Account

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not Found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

// Get All Notes

app.get("/get-all-notes", authenticationToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: " All notes retrived successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Add Note

app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;
  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added Successfuly",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Note
app.post("edit-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No Changes Provided",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete Note

app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.body;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not Found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted Successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Interval Server Error",
    });
  }
});

// Pin Note API

app.put(
  "/update-note-pinned/:noteId",
  authenticationToken,
  async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (!isPinned) {
      return res.status(400).json({
        error: true,
        message: "No Changes Provided",
      });
    }

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        res.status(404).json({
          error: true,
          message: "Note not found",
        });
      }

      note.isPinned = isPinned || false;

      await note.save();

      return res.json({
        error: false,
        message: "Note Pinned Successfuly",
        note,
      });
    } catch (error) {}
  }
);

app.get("/", (req, res) => {
  res.json({ data: "Hello" });
});

app.listen(8000, () => {
  console.log("Applicatyion is live on portNO 8000");
});
