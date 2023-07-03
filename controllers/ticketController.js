import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";

export const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user._id });
  res.status(200).json(tickets);
});

export const getTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  res.status(200).json(ticket);
});

export const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add product or description");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
    status: "new",
  });

  res.status(201).json(ticket);
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  await Ticket.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Ticket removed" });
});

export const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});
