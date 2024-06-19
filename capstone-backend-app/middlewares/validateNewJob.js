const z = require("zod");

const validateNewJob = (req, res, next) => {
  const {
    companyName,
    title,
    description,
    logoUrl,
    salary,
    location,
    duration,
    locationType,
    information,
    jobType,
    skills,
    refUserId, // we will be getting refUserId by jwt token not from body. for reference mentioned here
  } = req.body;

  const jobSchema = z.object({
    companyName: z.string().min(1, "Provide company name"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(20, "Job description required"),
    logoUrl: z.string().url("Invalid URL format"),
    salary: z.number("monthly salary must be number"),
    location: z.string().min(1, "Location required"),
    duration: z.string().min(1, "Duration required"),
    locationType: z.string().min(1, "Location type is required"),
    information: z.string().min(1, "Information required"),
    jobType: z.enum(["Full-Time", "Part-Time", "Internship"]),
    skills: z.string().array().min(1, "Provide atleast one required skills"),
  });

  try {
    const response = jobSchema.safeParse(req.body);
    // console.log(response);
    if (!response.success) {
      console.log(response.error);
      return res.status(400).json({
        message: "Please provide valid info",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

module.exports = validateNewJob;

//   try {
//     if (
//       !companyName ||
//       !logoUrl ||
//       !jobPosition ||
//       !monthlySalary ||
//       !jobType ||
//       !remote ||
//       !location ||
//       !jobDescription ||
//       !aboutCompany ||
//       !skillsRequired
//     ) {
//       return res.status(400).json({
//         message: "Please provide all the required fields",
//       });
//     }
//     const validJobPositions = ["Full-Time", "Part-Time", "Internship"];
//     //zod schema's
//     const urlSchema = z.string().url();
//     const salarySchema = z.number();
//     const remoteSchema = z.boolean();
//     const skillSchema = z.array(z.string());

//     const urlRes = urlSchema.safeParse(logoUrl);
//     const salaryRes = salarySchema.safeParse(monthlySalary);
//     const remoteRes = remoteSchema.safeParse(remote);
//     const skillRes = skillSchema.safeParse(skillsRequired);

//     const validJobPosition = validJobPositions.includes(jobPosition);

//     if (
//       !urlRes.success ||
//       !salaryRes.success ||
//       !remoteRes.success ||
//       !skillRes.success ||
//       !validJobPosition
//     ) {
//       return res.status(400).json({
//         message: "Please provide valid data's",
//       });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
