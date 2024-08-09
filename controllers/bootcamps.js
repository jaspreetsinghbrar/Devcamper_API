//@desc     Get all Bootcamps
//@route    GET/api/v1/bootcamps
//access    Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, mesg: "Show all bootcamps" });
};

//@desc     Get a Bootcamp
//@route    GET/api/v1/bootcamps/:id
//access    Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mesg: `Show bootcamp with id ${req.params.id}` });
};

//@desc     Edit a Bootcamp
//@route    PUT/api/v1/bootcamps/:id
//access    Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, mesg: `Update bootcamp with id ${req.params.id}` });
};

//@desc     Create a Bootcamp
//@route    POST/api/v1/bootcamps
//access    Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, mesg: "Create a bootcamp" });
};

//@desc     Delete a Bootcamp
//@route    DELETE/api/v1/bootcamps/:id
//access    Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      mesg: `Delete a bootcamp with id ${req.params.id}`,
    });
};
