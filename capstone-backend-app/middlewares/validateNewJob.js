const z = require("zod");

const validateNewJob = (req, res, next) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  } = req.body;

  const jobSchema = z.object({
    companyName: z.string().min(1, "Provide company name"),
    logoUrl: z.string().url("Invalid URL format"),
    jobPosition: z.string().min(1, "provide position of the job"),
    monthlySalary: z.number("monthly salary must be number"),
    jobType: z.enum(["Full-Time", "Part-Time", "Iternship"]),
    remote: z.boolean("remote must be boolean"),
    location: z.string().min(1, "Location required"),
    jobDescription: z.string().min(1, "Job description required"),
    aboutCompany: z.string().min(1, "about company required"),
    skillsRequired: z
      .string()
      .array()
      .min(1, "Provide atleast one required skills"),
    additionalInformation: z.string().optional(),
    author: z.string().min(1, "Author is required"),
  });

  try {
    const response = jobSchema.safeParse(req.body);
    // console.log(response);
    if (!response.success) {
      //   console.log(response.error);
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
