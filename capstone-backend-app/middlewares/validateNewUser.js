const z = require("zod");

const validateNewUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all the required fields",
      });
    }
    // email validation using zod
    const emailSchema = z.string().email();
    const response = emailSchema.safeParse(email);
    if (!response.success) {
      return res.status(400).json({
        message: "Enter valid email address",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = validateNewUser;
