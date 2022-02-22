module.exports = mongoose => {
    const Student = mongoose.model(
      "student",
      mongoose.Schema(
        {
          name: String,
          mobile: String,
          email: String
        },
        { timestamps: true }
      )
    );
    return Student;
  };