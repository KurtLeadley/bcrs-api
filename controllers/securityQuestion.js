/**
 * Title: controllers/SecurityQuestions.js
 * Author: Loren Wetzel
 * Description: bcrs-api
 */
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const SecurityQuestion = require("../models/SecurityQuestion");

/**
 * @desc        Get all security questions
 * @route       GET /api/v1/security-questions
 * @access      Private/admin
 */
exports.getSecQuestions = asyncHandler(async (req, res, next) => {
  const questiions = await SecurityQuestion.find({}, (err, questions) => {
    if (err) {
      return next(
        new ErrorResponse("Problem getting the security questions!", 500)
      );
    }

    res.status(200).json({
      success: true,
      data: questions,
    });
  });
});

/**
 * @desc        Get security question by id
 * @route       GET /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.getSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Create security question
 * @route       POST /api/v1/security-questions
 * @access      Private/admin
 */
exports.createSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.create(req.body);

  res.status(201).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Update security question by id
 * @route       PUT /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.updateSecQuestion = asyncHandler(async (req, res, next) => {
  const fieldToUpdate = {
    text: req.body.text,
  };

  const question = await SecurityQuestion.findByIdAndUpdate(
    req.params.id,
    fieldToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Delete security questions by id ** set isDisabled = true **
 * @route       PATCH /api/v1/security-questions/:id
 * @access      Private/admin
 */
exports.deleteSecQuestion = asyncHandler(async (req, res, next) => {
  const question = await SecurityQuestion.findById(req.params.id);

  if (question.disabled === false) {
    question.disable();
  } else {
    question.enable();
  }

  res.status(200).json({
    success: true,
    data: question,
  });
});

/**
 * @desc        Get an array of security questions by id's
 * @route       POST /api/v1/security-questions/get-by-ids
 * @access      Private/admin
 */
exports.findSecQuestionsByIds = asyncHandler(async (req, res, next) => {
  // get the 3 questions the user picked out
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const question3 = req.body.question3;

  //find the 3 questions using mongoDB "$or"
  const questions = await SecurityQuestion.find(
    {
      $or: [{ _id: question1 }, { _id: question2 }, { _id: question3 }],
    },
    // '_id text',
    function (err) {
      if (err) {
        return next(
          new ErrorResponse("Problem getting the security questions!", 500)
        );
      } //end if
    }
  ); //end of find

  /**
   * I believe this is complete. the sprint requirements say
   * 
   * FindSecurityQuestionsByIds: /api/security-questions/find-by-ids
   * This API will lookup security questions by security question Ids
   * Hint: you are passing-in three security question Ids (the ones that the user selected when they registered) and 
   *    returning an array of the security question documents
   * Hint: use the MongoDB 'or' or Mongoose 'where" aggregates to chain the security question Ids
   * 
   * This returns just that... an array of documents. The output is not in the order it was received but it does check if 
   *    the question id's are in the db. It outputs error if question id is not found. Does not output the specific
   *    question that was not found. The rest of this is done in the user model and Angular UI during registration.
   */

  /**  this needs more but as of right now it finds the 3 questions in the database
   * this will be where the moongoose schema for securityQuestions comes into play
   * Mongoose: Schema
   * securityQuestions
   * questionId: {type: String}
   * answer: {type: String}
   * probably an if/else but working on that
   */

  res.status(200).json({
    success: true,
    data: questions,
  });
});
