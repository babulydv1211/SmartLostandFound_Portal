
import express from "express";
import jwt from "jsonwebtoken";  // ✅ needed
import Match from "../models/Match.js";
import User from "../models/User.js";
import Item from "../models/Item.js";

const router = express.Router();

// Admin login route
router.post("/admin/login", async (req, res, next) => {
  try {
    const { id, password } = req.body;

    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

// Middleware to verify admin
const adminGuard = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes for users, lost-items, found-items, matches, delete item
router.get("/admin/users", adminGuard, async (req, res, next) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/admin/lost-items", adminGuard, async (req, res, next) => {
  try {
    const lostItems = await Item.find({ type: "lost" }).sort({ createdAt: -1 });
    res.json(lostItems);
  } catch (error) {
    next(error);
  }
});





router.get("/admin/found-items", adminGuard, async (req, res, next) => {
  try {
    const foundItems = await Item.find({ type: "found" }).sort({ createdAt: -1 });
    res.json(foundItems);
  } catch (error) {
    next(error);
  }
});

router.get("/admin/matches", adminGuard, async (req, res, next) => {
  try {
    const matches = await Match.find()
      .populate("lostItem")
      .populate("foundItem")
      .sort({ createdAt: -1 });
    res.json(matches);
  } catch (error) {
    next(error);
  }
});

router.delete("/admin/items/:id", adminGuard, async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    await Match.deleteMany({
      $or: [{ lostItem: req.params.id }, { foundItem: req.params.id }],
    });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
