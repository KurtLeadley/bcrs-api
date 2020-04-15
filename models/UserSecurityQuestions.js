/**
 * Title: models/UserSecurityQuestions.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const mongoose = require('mongoose');

const UserSecurityQuestionsSchema = mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  'UserSecurityQuestion',
  UserSecurityQuestionsSchema
);
