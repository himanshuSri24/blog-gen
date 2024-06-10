// global.d.ts

import { type Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

// To make this file a module and avoid TypeScript errors
export {};
