export type ContactProps = {
  id: string;
  fullName: string;
  email: string;
  school: string;
  country: string;
  schoolPage: string;
  phone: string;
  students: number;
  role: string;
  media: string;
  message: string;
  updatedAt: string;
  createdAt: string;
};

export type SchoolProps = {
  name: string;
  logo: string;
};

export type ClassCreateProps = {
  title: string;
};

export type StreamCreateProps = {
  title: string;
  classId: string;
};

export type Class = {
  id: string;
  title: string;
  slug: string;
  streams: StreamWithCount[];
  _count: {
    students: number;
  };
  createdAt: string;
  updatedAt: string;
};
export type Stream = {
  id: string;
  title: string;
  slug: string;
  classId: string;
  class: Class;
  createdAt: string;
  updatedAt: string;
};
export type ParentProps = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  NIN: string;
  gender: string;
  phone: string;
  address: string;
  nationality: string;
  whatsappNo: string;
  contactMethod: string;
  imageUrl: string;
  occupation: string;
  password: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
};
export type TeacherCreateProps = {
  title: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  NIN: string;
  gender: string;
  phone: string;
  address: string;
  nationality: string;
  whatsappNo: string;
  contactMethod: string;
  imageUrl: string;
  dateOfJoining: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  mainSubject: string;
  mainSubjectId: string;
  subjects: string[];
  classes: string[];
  classIds: string[];
  experience: number;
  occupation: string;
  password: string;
  dateOfBirth: string;
};

export type StudentProps = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  parentId: string;
  studentType: string;
  classId: string;
  streamId: string;
  parentName?: string;
  classTitle?: string;
  streamTitle?: string;
  phone: string;
  nationality?: string;
  dob: string;
  gender: string;
  state: string;
  BCN: string;
  religion: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  address: string;
  email: string;
  password: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

// export type StreamWithCount = {
//   id: string;
//   title: string;
//   slug: string;
//   classId: string;
//   _count: {
//     students: number;
//   };
//   createdAt: string;
//   updatedAt: string;
// };

export type StreamWithCount = Stream & {
  _count: {
    students: number;
  };
};

export type Teacher = {
  id: string;
  title: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  NIN: string;
  gender: string;
  phone: string;
  address: string;
  nationality: string;
  lastLogin: boolean | null;
  skills?: string[] | null;
  isActive: boolean;
  whatsappNo: string;
  contactMethod: string;
  imageUrl: string;
  dateOfJoining: string;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelation?: string | null;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  mainSubject: string;
  mainSubjectId: string;
  subjects: string[];
  classes: string[];
  classIds: string[];
  experience: number;
  occupation: string;
  password: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
};

export enum SubjectCategory {
  CORE = "CORE",
  ELECTIVE = "ELECTIVE",
  ADDITIONAL = "ADDITIONAL",
  VOCATIONAL = "VOCATIONAL",
  LANGUAGE = "LANGUAGE",
  EXTRA_CURRICULAR = "EXTRA_CURRICULAR",
  // Add other categories as needed
}

export enum SubjectType {
  THEORY = "THEORY",
  PRACTICAL = "PRACTICAL",
  BOTH = "BOTH",
}

export interface Subject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  code: string;
  shortName?: string;
  category: SubjectCategory;
  type: SubjectType;
  passingMarks?: number;
  totalMarks?: number;
  departmentId: string;
  departmentName: string;
  isActive: boolean;
  isOptional: boolean;
  hasTheory: boolean;
  hasPractical: boolean;
  labRequired: boolean;
}

export interface CreateSubjectData {
  name: string;
  code: string;
  shortName?: string;
  category: string;
  type: string;
  departmentId: string;
  departmentName: string;
}

export type Department = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  hodId?: string;
  hodName?: string;
  hodStartDate?: string;
  teachers: Teacher[];
  subjects: Subject[];
  budget?: number;
  budgetYear?: string;
};
export type DepartmentList = {
  id: string;
  name: string;
};
export type SubjectList = {
  id: string;
  name: string;
};
export type ClassList = {
  id: string;
  title: string;
};
export type User = {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
  createdAt: string;
  updatedAt: string;
  image?: string | null;
  phone?: string | null;
  schoolId?: string | null;
  schoolName?: string | null;
};
export interface UserSessionStore {
  user: User | null;
  setUser: (userData: User) => Promise<void>;
  clearSession: () => Promise<void>;
}
export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
}
