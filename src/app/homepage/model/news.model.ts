export class scholarship {
  id: number;
  code: string;
  datePost: string;
  dateUpdate: string;
  type: string;
  codeCategory: string;
  userId: number;
  title: string;
  shortContent: string;
  thumbnail: string;
  status: string;
  link: string;
  numLike: number;
  numDisLike: number;
  quantity: string;
  typeNews: string;
  level: string;
  major: string;
  location: string;
  introduction: string;
  requirement: string;
  benefit: string;
  contact: string;
  constructor(clone?: scholarship) {
    if (clone) {
      this.id = clone.id;
      this.code = clone.code;
      this.datePost = clone.datePost;
      this.dateUpdate = clone.dateUpdate;
      this.type = clone.type;
      this.codeCategory = clone.codeCategory;
      this.userId = clone.userId;
      this.title = clone.title;
      this.shortContent = clone.shortContent;
      this.thumbnail = clone.thumbnail;
      this.status = clone.status;
      this.link = clone.link;
      this.numLike = clone.numLike;
      this.numDisLike = clone.numDisLike;
      this.quantity = clone.quantity;
      this.typeNews = clone.typeNews;
      this.level = clone.level;
      this.major = clone.major;
      this.location = clone.location;
      this.introduction = clone.introduction;
      this.requirement = clone.requirement;
      this.benefit = clone.benefit;
      this.contact = clone.contact;
    } else {
      this.id = 0;
      this.code = '';
      this.datePost = '';
      this.dateUpdate = '';
      this.type = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.shortContent = '';
      this.thumbnail = '';
      this.status = '';
      this.link = '';
      this.numLike = 0;
      this.numDisLike = 0;
      this.quantity = '';
      this.typeNews = '';
      this.level = '';
      this.location = '';
      this.major = '';
      this.introduction = '';
      this.requirement = '';
      this.benefit = '';
      this.contact = '';
    }
  }
}
export class event {
  id: number;
  code: string;
  datePost: string;
  dateUpdate: string;
  type: string;
  codeCategory: string;
  userId: number;
  title: string;
  shortContent: string;
  thumbnail: string;
  status: string;
  link: string;
  numLike: number;
  numDisLike: number;
  typeNews: string;
  location: string;
  information: string;
  content: string;
  participation: string;
  contact: string;
  constructor(clone?: event) {
    if (clone) {
      this.id = clone.id;
      this.code = clone.code;
      this.datePost = clone.datePost;
      this.dateUpdate = clone.dateUpdate;
      this.type = clone.type;
      this.codeCategory = clone.codeCategory;
      this.userId = clone.userId;
      this.title = clone.title;
      this.shortContent = clone.shortContent;
      this.thumbnail = clone.thumbnail;
      this.status = clone.status;
      this.link = clone.link;
      this.numLike = clone.numLike;
      this.numDisLike = clone.numDisLike;
      this.typeNews = clone.typeNews;
      this.location = clone.location;
      this.information = clone.information;
      this.content = clone.content;
      this.participation = clone.participation;
      this.contact = clone.contact;
    } else {
      this.id = 0;
      this.code = '';
      this.datePost = '';
      this.dateUpdate = '';
      this.type = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.shortContent = '';
      this.thumbnail = '';
      this.status = '';
      this.link = '';
      this.numLike = 0;
      this.numDisLike = 0;
      this.typeNews = '';
      this.location = '';
      this.information = '';
      this.content = '';
      this.participation = '';
      this.contact = '';
    }
  }
}
export class competion {
  id: number;
  code: string;
  datePost: string;
  dateUpdate: string;
  type: string;
  codeCategory: string;
  userId: number;
  title: string;
  shortContent: string;
  thumbnail: string;
  status: string;
  link: string;
  numLike: number;
  numDisLike: number;
  typeNews: string;
  location: string;
  introduction: string;
  information: string;
  subject: string;
  prize: string;
  contact: string;
  constructor(clone?: competion) {
    if (clone) {
      this.id = clone.id;
      this.code = clone.code;
      this.datePost = clone.datePost;
      this.dateUpdate = clone.dateUpdate;
      this.type = clone.type;
      this.codeCategory = clone.codeCategory;
      this.userId = clone.userId;
      this.title = clone.title;
      this.shortContent = clone.shortContent;
      this.thumbnail = clone.thumbnail;
      this.status = clone.status;
      this.link = clone.link;
      this.numLike = clone.numLike;
      this.numDisLike = clone.numDisLike;
      this.typeNews = clone.typeNews;
      this.location = clone.location;
      this.introduction = clone.introduction;
      this.information = clone.information;
      this.subject = clone.subject;
      this.prize = clone.prize;
      this.contact = clone.contact;
    } else {
      this.id = 0;
      this.code = '';
      this.datePost = '';
      this.dateUpdate = '';
      this.type = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.shortContent = '';
      this.thumbnail = '';
      this.status = '';
      this.link = '';
      this.numLike = 0;
      this.numDisLike = 0;
      this.typeNews = '';
      this.location = '';
      this.introduction = '';
      this.information = '';
      this.subject = '';
      this.prize = '';
      this.contact = '';
    }
  }
}
export class user {
  email: string;
  name: string;
  password: string;
  avatar: string;
  isActive: string;
  background: string;
  birthDate: string;
  address: string;
  phone: string;
  gender: string;
  facebook: string;
  linkedin: string;
  intro: string;
  roleCodes: string[];
  constructor(clone?: user) {
    if (clone) {
      this.email = clone.email;
      this.name = clone.name;
      this.password = clone.password;
      this.avatar = clone.avatar;
      this.isActive = clone.isActive;
      this.background = clone.background;
      this.birthDate = clone.birthDate;
      this.address = clone.address;
      this.phone = clone.phone;
      this.gender = clone.gender;
      this.facebook = clone.facebook;
      this.linkedin = clone.linkedin;
      this.intro = clone.intro;
      this.roleCodes = [...clone.roleCodes];
    } else {
      this.email = '';
      this.name = '';
      this.password = '';
      this.avatar = '';
      this.isActive = '';
      this.background = '';
      this.birthDate = '';
      this.address = '';
      this.phone = '';
      this.gender = '';
      this.facebook = '';
      this.linkedin = '';
      this.intro = '';
      this.roleCodes = [];
    }
  }
}
export class Recruit {
  id: number;
  code: string;
  datePost: string;
  dateUpdate: string;
  type: string;
  codeCategory: string;
  userId: number;
  title: string;
  shortContent: string;
  thumbnail: string;
  status: string;
  link: string;
  numLike: number;
  numDisLike: number;
  companyCode: string;
  experience: string;
  salary: string;
  location: string;
  major: string;
  position: string;
  language: string;
  level: string;
  startTime: string;
  endTime: string;
  introduction: string;
  description: string;
  requirement: string;
  treatment: string;
  contact: string;
  constructor(clone?: Recruit) {
    if (clone) {
      this.id = clone.id;
      this.code = clone.code;
      this.datePost = clone.datePost;
      this.dateUpdate = clone.dateUpdate;
      this.type = clone.type;
      this.codeCategory = clone.codeCategory;
      this.userId = clone.userId;
      this.title = clone.title;
      this.shortContent = clone.shortContent;
      this.thumbnail = clone.thumbnail;
      this.status = clone.status;
      this.link = clone.link;
      this.numLike = clone.numLike;
      this.numDisLike = clone.numDisLike;
      this.companyCode = clone.companyCode;
      this.experience = clone.experience;
      this.salary = clone.salary;
      this.location = clone.location;
      this.major = clone.major;
      this.position = clone.position;
      this.language = clone.language;
      this.level = clone.level;
      this.startTime = clone.startTime;
      this.endTime = clone.endTime;
      this.introduction = clone.introduction;
      this.description = clone.description;
      this.requirement = clone.requirement;
      this.treatment = clone.treatment;
      this.contact = clone.contact;
    } else {
      this.id = 0;
      this.code = '';
      this.datePost = '';
      this.dateUpdate = '';
      this.type = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.codeCategory = '';
      this.userId = 0;
      this.title = '';
      this.shortContent = '';
      this.thumbnail = '';
      this.status = '';
      this.link = '';
      this.numLike = 0;
      this.numDisLike = 0;
      this.companyCode = '';
      this.experience = '';
      this.salary = '';
      this.location = '';
      this.major = '';
      this.position = '';
      this.language = '';
      this.level = '';
      this.startTime = '';
      this.endTime = '';
      this.introduction = '';
      this.description = '';
      this.requirement = '';
      this.treatment = '';
      this.contact = '';
    }
  }
}
export class Company {
  code: string;
  name: string;
  logo: string;
  background: string;
  link: string;
  address: string;
  email: string;
  intro: string;
  constructor(clone?: Company) {
    if (clone) {
      this.code = clone.code;
      this.name = clone.name;
      this.logo = clone.logo;
      this.background = clone.background;
      this.link = clone.link;
      this.address = clone.address;
      this.email = clone.email;
      this.intro = clone.intro;
    } else {
      this.code = '';
      this.name = '';
      this.logo = '';
      this.background = '';
      this.link = '';
      this.address = '';
      this.email = '';
      this.intro = '';
    }
  }
}
export class ResponseObject {
  errorCode = '';
  status: Number = new Number();
  message = '';
  data: any;
}
export class Otp {
  email: string;
  otp: string;
  constructor(clone?: Otp) {
    if (clone) {
      this.email = clone.email;
      this.otp = clone.otp;
    } else {
      this.email = '';
      this.otp = '';
    }
  }
}
