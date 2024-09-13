const { Tank, Volume } = require("../models/index");
const asyncHandler = require("express-async-handler");

const getAllTanks = asyncHandler(async (req, res) => {
  const tanks = await Tank.find({}).select("-__v");
  return res.status(200).json(tanks);
});

const getTank = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundTank = await Tank.findById(id).populate("volumes", "-__v").select("-__v");
  return res.status(200).json(foundTank);
});

const addTank = asyncHandler(async (req, res) => {
  const { zone, tankName, height } = req.body;
  const newTank = await Tank.create({ zone, tankName, height });
  return res.status(200).json(newTank);
});

const updateTank = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedTank = await Tank.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(200).json(updatedTank);
});

const deleteTank = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tank = await Tank.findByIdAndDelete(id);
  return res.status(200).json(tank);
});

module.exports = {
  getAllTanks,
  getTank,
  addTank,
  updateTank,
  deleteTank,
};
