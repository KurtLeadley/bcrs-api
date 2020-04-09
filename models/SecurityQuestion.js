/**
 * Title: models/SecurityQuestions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const mongoose = require("mongoose");

const SecurityQuestionSchema = new mongoose.Schema({
  text: { type: String },
  isDisabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("SecurityQuestion", SecurityQuestionSchema);
