declare namespace Express {
    export interface Request {
      file: Express.Multer.File; // This adds the `file` property
    }
  }
  