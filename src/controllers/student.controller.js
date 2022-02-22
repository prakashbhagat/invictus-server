const db = require("../models");
const Student = db.student;
// Create and Save a new Student
exports.create = (req, res) => {
   // Validate request
   if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Student
  const student = new Student({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email
  });
  // Save Student in the database
  student
    .save(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student."
      });
    });
};
// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Student.find(email)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Students."
      });
    });
};
// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Student"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Student"});
    });
};
// Update a Student by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  const name=req.body.details.name;
  const mobile=req.body.details.mobile;
  const email=req.body.details.email;

  Student.findOneAndUpdate({_id:id},{name:name,mobile:mobile,email:email},{new:true} )
    .then(data =>{
      if (!data) {
        res.status(404).send({
          message: `Cannot update Student. Maybe Student was not found!`
        });
      } else res.send({ message: "Student was updated successfully."});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student"
      });
    });
};
// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Student.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Student. Maybe Student was not found!`
        });
      } else {
        res.send({
          message: "Student was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Student"
      });
    });
};
// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Student.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Students were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Students."
      });
    });
};
