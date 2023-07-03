import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import noteRoutes from "./noteRoutes.js";

const router = express.Router();

router.use("/:ticketId/notes", noteRoutes);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

export default router;
