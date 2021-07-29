const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMIddleware");

// import {
//   getNoteById,
//   getNotes,
//   CreateNote,
//   DeleteNote,
//   UpdateNote,
// } from "../controllers/noteController.js";
const router = express.Router();
// import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote);

module.exports = router;
