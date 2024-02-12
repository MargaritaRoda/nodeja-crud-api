import { User } from "../types";
import { v4 as uuidv4 } from "uuid";

export const users: User[] = [
  { id: uuidv4(), username: "Marta", age: 19, hobbies: ["chess"] },
  { id: uuidv4(), username: "Irina", age: 22, hobbies: ["swimming"] },
  { id: uuidv4(), username: "Olga", age: 20, hobbies: ["racing"] },
  { id: uuidv4(), username: "Nataly", age: 23, hobbies: ["dance"] },
  { id: uuidv4(), username: "Marina", age: 21, hobbies: ["shopping"] },
];
