const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc     Get courses
//@route    GET/api/v1/courses
//@route    GET/api/v1/bootcamps/:bootcampId/courses
//access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc     Get a single course
//@route    GET/api/v1/courses/:id
//access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc     Add a course
//@route    POST/api/v1/bootcamps/:bootcampsId/courses
//access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.body.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`),
      404
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc     Update a course
//@route    PUT/api/v1/courses/:id
//access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Bootcamp.findById(req.params.Id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  //Make sure the user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to update this course`,
        401
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc     Delete a course
//@route    DELETE/api/v1/courses/:id
//access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Bootcamp.findById(req.params.Id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  //Make sure the user is bootcamp owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to delete this course`,
        401
      )
    );
  }

  await Course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
