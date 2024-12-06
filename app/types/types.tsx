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
  streams: Stream[];
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
