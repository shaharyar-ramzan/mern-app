const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")
// @desc    Get Goals
// @route   get /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  //res.status(200).json({ message: "Get Goals" })
  res.status(200).json(goals)
})

// @desc    Set Goal
// @route   Post /api/goals
// @access  private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    //.json({ message: "Please add a text field" });
    throw new Error("Please add a text field")
  }
  const goal = await Goal.create({
    text: req.body.text,
  })

  //res.status(200).json({ message: "Set Goal" })
  res.status(200).json(goal)
})

// @desc    Update Goal
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error(`${req.params.id} Goal not found.`)
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateGoal)
})

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error(`${req.params.id} Goal not found.`)
  }
  await goal.remove()

  res.status(200).json({ message: `${req.params.id} Goal Deleted` })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
