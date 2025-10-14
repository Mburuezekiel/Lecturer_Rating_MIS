export const demoAccounts = {
  admin: { email: "admin@mut.ac.ke", password: "Admin123", role: "admin", name: "System Admin" },
  dean: { email: "dean@mut.ac.ke", password: "Dean123", role: "dean", name: "Dean of Faculty" },
  hod: { email: "hod@mut.ac.ke", password: "Hod123", role: "hod", name: "HOD Computer Science" },
  lecturer: { email: "lecturer@mut.ac.ke", password: "Lecturer123", role: "lecturer", name: "Dr. Wanjiru" },
  student: { email: "student@mut.ac.ke", password: "Student123", role: "student", name: "Student User" },
};

export const departments = [
  "Computer Science",
  "Information Systems",
  "Networking",
  "Software Engineering",
];

export const lecturers = [
  {
    id: "L001",
    name: "Dr. Wanjiru",
    department: "Computer Science",
    courses: ["Programming I", "Data Structures"],
    email: "wanjiru@mut.ac.ke",
    avgRating: 4.7,
  },
  {
    id: "L002",
    name: "Mr. Kamau",
    department: "Information Systems",
    courses: ["MIS", "Systems Analysis"],
    email: "kamau@mut.ac.ke",
    avgRating: 3.8,
  },
  {
    id: "L003",
    name: "Ms. Naliaka",
    department: "Networking",
    courses: ["Data Communications", "Network Security"],
    email: "naliaka@mut.ac.ke",
    avgRating: 4.6,
  },
  {
    id: "L004",
    name: "Dr. Otieno",
    department: "Software Engineering",
    courses: ["Web Development", "Mobile Apps"],
    email: "otieno@mut.ac.ke",
    avgRating: 3.4,
  },
  {
    id: "L005",
    name: "Mr. Kibe",
    department: "Information Systems",
    courses: ["Database Management", "Data Mining"],
    email: "kibe@mut.ac.ke",
    avgRating: 4.8,
  },
];

export const students = Array.from({ length: 15 }, (_, i) => ({
  id: `S${(101 + i).toString()}`,
  name: `Student ${101 + i}`,
  email: `s${101 + i}@mut.ac.ke`,
  department: departments[i % departments.length],
}));

export const evaluations = [
  {
    studentId: "S101",
    lecturerId: "L001",
    lecturerName: "Dr. Wanjiru",
    course: "Programming I",
    punctuality: 5,
    clarity: 4,
    engagement: 5,
    fairness: 4,
    communication: 5,
    comment: "Excellent lecturer! Very clear explanations.",
    date: "2024-03-15",
  },
  {
    studentId: "S102",
    lecturerId: "L002",
    lecturerName: "Mr. Kamau",
    course: "MIS",
    punctuality: 4,
    clarity: 3,
    engagement: 4,
    fairness: 4,
    communication: 4,
    comment: "Good content but needs more student engagement.",
    date: "2024-03-15",
  },
  {
    studentId: "S103",
    lecturerId: "L003",
    lecturerName: "Ms. Naliaka",
    course: "Data Communications",
    punctuality: 5,
    clarity: 5,
    engagement: 4,
    fairness: 5,
    communication: 5,
    comment: "Very clear explanations with practical examples.",
    date: "2024-03-16",
  },
  {
    studentId: "S104",
    lecturerId: "L004",
    lecturerName: "Dr. Otieno",
    course: "Web Development",
    punctuality: 3,
    clarity: 3,
    engagement: 3,
    fairness: 4,
    communication: 3,
    comment: "Average performance. Could improve on time management.",
    date: "2024-03-16",
  },
  {
    studentId: "S105",
    lecturerId: "L005",
    lecturerName: "Mr. Kibe",
    course: "Database Management",
    punctuality: 5,
    clarity: 4,
    engagement: 5,
    fairness: 5,
    communication: 5,
    comment: "Great use of real-world examples. Very helpful!",
    date: "2024-03-17",
  },
  {
    studentId: "S106",
    lecturerId: "L001",
    lecturerName: "Dr. Wanjiru",
    course: "Programming I",
    punctuality: 5,
    clarity: 5,
    engagement: 5,
    fairness: 5,
    communication: 4,
    comment: "Best programming lecturer I've had.",
    date: "2024-03-17",
  },
  {
    studentId: "S107",
    lecturerId: "L002",
    lecturerName: "Mr. Kamau",
    course: "Systems Analysis",
    punctuality: 4,
    clarity: 4,
    engagement: 3,
    fairness: 4,
    communication: 4,
    comment: "Good theoretical knowledge.",
    date: "2024-03-18",
  },
  {
    studentId: "S108",
    lecturerId: "L003",
    lecturerName: "Ms. Naliaka",
    course: "Network Security",
    punctuality: 5,
    clarity: 4,
    engagement: 5,
    fairness: 4,
    communication: 5,
    comment: "Engaging lectures with hands-on labs.",
    date: "2024-03-18",
  },
  {
    studentId: "S109",
    lecturerId: "L004",
    lecturerName: "Dr. Otieno",
    course: "Mobile Apps",
    punctuality: 3,
    clarity: 4,
    engagement: 3,
    fairness: 3,
    communication: 4,
    comment: "Knows the subject but inconsistent attendance.",
    date: "2024-03-19",
  },
  {
    studentId: "S110",
    lecturerId: "L005",
    lecturerName: "Mr. Kibe",
    course: "Data Mining",
    punctuality: 5,
    clarity: 5,
    engagement: 5,
    fairness: 5,
    communication: 5,
    comment: "Outstanding! Makes complex topics easy to understand.",
    date: "2024-03-19",
  },
  {
    studentId: "S111",
    lecturerId: "L001",
    lecturerName: "Dr. Wanjiru",
    course: "Data Structures",
    punctuality: 4,
    clarity: 5,
    engagement: 4,
    fairness: 5,
    communication: 5,
    comment: "Very knowledgeable and approachable.",
    date: "2024-03-20",
  },
  {
    studentId: "S112",
    lecturerId: "L002",
    lecturerName: "Mr. Kamau",
    course: "MIS",
    punctuality: 3,
    clarity: 3,
    engagement: 4,
    fairness: 4,
    communication: 3,
    comment: "Sometimes rushes through important concepts.",
    date: "2024-03-20",
  },
  {
    studentId: "S113",
    lecturerId: "L003",
    lecturerName: "Ms. Naliaka",
    course: "Data Communications",
    punctuality: 5,
    clarity: 5,
    engagement: 5,
    fairness: 5,
    communication: 4,
    comment: "Excellent lecturer with great communication skills.",
    date: "2024-03-21",
  },
  {
    studentId: "S114",
    lecturerId: "L004",
    lecturerName: "Dr. Otieno",
    course: "Web Development",
    punctuality: 4,
    clarity: 3,
    engagement: 4,
    fairness: 4,
    communication: 3,
    comment: "Good practical sessions.",
    date: "2024-03-21",
  },
  {
    studentId: "S115",
    lecturerId: "L005",
    lecturerName: "Mr. Kibe",
    course: "Database Management",
    punctuality: 5,
    clarity: 4,
    engagement: 5,
    fairness: 5,
    communication: 5,
    comment: "Always prepared and enthusiastic about teaching.",
    date: "2024-03-22",
  },
];

export const calculateStats = () => {
  const criteria = ['punctuality', 'clarity', 'engagement', 'fairness', 'communication'];
  
  // Calculate averages per lecturer
  const lecturerStats = lecturers.map(lecturer => {
    const lecturerEvals = evaluations.filter(e => e.lecturerId === lecturer.id);
    if (lecturerEvals.length === 0) return { ...lecturer, avgRating: 0, totalEvaluations: 0 };
    
    const avg = lecturerEvals.reduce((sum, e) => {
      return sum + (e.punctuality + e.clarity + e.engagement + e.fairness + e.communication) / 5;
    }, 0) / lecturerEvals.length;
    
    return {
      ...lecturer,
      avgRating: Math.round(avg * 10) / 10,
      totalEvaluations: lecturerEvals.length,
    };
  });

  // Calculate department averages
  const departmentStats = departments.map(dept => {
    const deptLecturers = lecturerStats.filter(l => l.department === dept);
    const avg = deptLecturers.reduce((sum, l) => sum + l.avgRating, 0) / deptLecturers.length;
    return {
      department: dept,
      avgRating: Math.round(avg * 10) / 10,
      lecturers: deptLecturers.length,
    };
  });

  // Calculate criteria averages
  const criteriaStats = criteria.map(criterion => {
    const avg = evaluations.reduce((sum, e) => {
      const value = e[criterion as keyof typeof e];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0) / evaluations.length;
    return {
      criterion: criterion.charAt(0).toUpperCase() + criterion.slice(1),
      average: Math.round(avg * 10) / 10,
    };
  });

  // Performance categories
  const performanceCategories = {
    excellent: lecturerStats.filter(l => l.avgRating >= 4.5).length,
    good: lecturerStats.filter(l => l.avgRating >= 3.5 && l.avgRating < 4.5).length,
    average: lecturerStats.filter(l => l.avgRating >= 2.5 && l.avgRating < 3.5).length,
    poor: lecturerStats.filter(l => l.avgRating < 2.5).length,
  };

  const participationRate = Math.round((evaluations.length / (students.length * lecturers.length)) * 100);

  return {
    lecturerStats,
    departmentStats,
    criteriaStats,
    performanceCategories,
    participationRate,
    totalEvaluations: evaluations.length,
  };
};
