export interface Programme {
  name: string;
  code: string;
}

export interface TransferStatus {
  universityCourse: string;
  universityCode: string;
  status: string;
}

export interface Course {
  name: string;
  code: string;
  programmes: Programme[];
  years: number[];
  transferStatus: TransferStatus;
}

export interface School {
  name: string;
  courses: Course[];
}

export interface JSONData {
  schools: School[];
}
