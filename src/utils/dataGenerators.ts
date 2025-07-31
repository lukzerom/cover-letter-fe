import type { CVData, PersonalizationData, GenerationSettings } from "../types";

export const createMockCVData = (): CVData => ({
  personalInfo: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  },
  summary:
    "Experienced software developer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2021 - Present",
      description:
        "Led development of microservices architecture, improved system performance by 40%. Mentored junior developers and implemented CI/CD pipelines using Docker and AWS.",
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      duration: "2019 - 2021",
      description:
        "Developed React applications and Node.js APIs for e-commerce platform. Built responsive web applications serving 10,000+ daily active users.",
    },
    {
      title: "Junior Developer",
      company: "WebSolutions Inc",
      duration: "2018 - 2019",
      description:
        "Created dynamic websites using HTML, CSS, JavaScript, and PHP. Collaborated with design team to implement pixel-perfect user interfaces.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2018",
      description:
        "Focused on software engineering and algorithms. Graduated with honors (GPA: 3.8/4.0). Relevant coursework: Data Structures, Database Systems, Web Development, Machine Learning.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "REST APIs",
    "GraphQL",
  ],
  languages: [
    {
      language: "English",
      proficiency: "Native",
    },
    {
      language: "Spanish",
      proficiency: "Fluent",
    },
    {
      language: "French",
      proficiency: "Intermediate",
    },
  ],
});

export const getSampleJobDescription = (): string => {
  return `Senior Full Stack Developer - Remote

We are seeking a talented Senior Full Stack Developer to join our growing engineering team. This is a remote position open to candidates in the US and Canada.

About the Role:
You'll be responsible for building and maintaining scalable web applications using modern technologies. You'll work closely with our product and design teams to deliver exceptional user experiences.

Key Responsibilities:
• Develop and maintain web applications using React, Node.js, and TypeScript
• Design and implement RESTful APIs and GraphQL endpoints
• Work with cloud infrastructure on AWS including Lambda, S3, and RDS
• Collaborate with cross-functional teams in an Agile environment
• Mentor junior developers and conduct code reviews
• Participate in architectural decisions and technical planning

Required Qualifications:
• 5+ years of experience in full-stack web development
• Strong proficiency in JavaScript/TypeScript, React, and Node.js
• Experience with database design (PostgreSQL, MongoDB)
• Familiarity with cloud platforms (AWS preferred)
• Experience with Docker and containerization
• Strong understanding of software development best practices
• Excellent communication and collaboration skills

Preferred Qualifications:
• Experience with microservices architecture
• Knowledge of DevOps practices and CI/CD pipelines
• Previous experience in a startup or fast-paced environment
• Bachelor's degree in Computer Science or related field

What We Offer:
• Competitive salary ($120,000 - $150,000)
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching
• Flexible PTO policy
• Remote work with annual team meetups
• Professional development budget ($2,000/year)
• Latest MacBook Pro and home office setup allowance

Join us in building the future of digital experiences!`;
};

export interface CoverLetterGenerationParams {
  cvData: CVData;
  personalizationData: PersonalizationData;
  generationSettings: GenerationSettings;
}

export const generateCoverLetterContent = ({
  cvData,
  personalizationData,
  generationSettings,
}: CoverLetterGenerationParams): string => {
  const roleContext = generationSettings.careerChange
    ? "career transition"
    : `continued growth in ${generationSettings.roleLevel} positions`;

  let coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Full Stack Developer position at your company. With over 5 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am confident that I would be a valuable addition to your engineering team during this exciting time of ${roleContext}.

${
  personalizationData.motivation ? personalizationData.motivation + "\n\n" : ""
}In my current role as Senior Software Engineer at Tech Corp, I have successfully led the development of microservices architecture that improved system performance by 40%. My expertise in JavaScript, TypeScript, React, and Node.js aligns perfectly with your technical requirements. ${
    personalizationData.highlightExperience
      ? personalizationData.highlightExperience + " "
      : ""
  }Additionally, my experience with AWS cloud services, Docker containerization, and database design with PostgreSQL and MongoDB makes me well-suited for this role.

What particularly excites me about this opportunity is the emphasis on mentorship and collaborative development. Throughout my career, I have enjoyed mentoring junior developers and conducting code reviews, which has not only helped my colleagues grow but has also strengthened my own technical leadership skills. ${
    personalizationData.passionValues
      ? personalizationData.passionValues + " "
      : ""
  }My experience working in fast-paced startup environments has taught me the importance of agile development practices and cross-functional collaboration.

Your commitment to remote work flexibility and professional development resonates with my career goals. I am particularly drawn to the annual team meetups and the professional development budget, which demonstrates your investment in employee growth and team cohesion.

${
  generationSettings.length === "long"
    ? "I am excited about the possibility of contributing to your team's innovative projects and helping build the future of digital experiences. My multilingual abilities (fluent in Spanish and intermediate French) could also be valuable for any international expansion or diverse customer base considerations.\n\nI would welcome the opportunity to discuss specific projects I could contribute to immediately, including potential improvements to your current architecture and development processes. "
    : "I am excited about the possibility of contributing to your team's innovative projects and helping build the future of digital experiences. "
}

Thank you for considering my application. I would welcome the opportunity to discuss how my technical expertise and collaborative approach can contribute to your team's continued success.

Sincerely,
${cvData.personalInfo.name}`;

  // Adjust length based on settings
  if (generationSettings.length === "short") {
    coverLetter = coverLetter.split("\n\n").slice(0, 3).join("\n\n");
  }

  return coverLetter;
};
