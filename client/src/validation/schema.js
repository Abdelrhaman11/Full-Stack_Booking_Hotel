      import * as zod from "zod";
import { calcAge } from "../helps/data";

   
   
   export const regex = {
      emailRegex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passwordRegex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      phoneRegex: /^(?:\+?[1-9]\d{7,14}|0\d{9,14})$/
 }


   export const signUpSchema = zod.object({
      name:zod.string().nonempty("Name is required").min(3,"Name must be at least 3 characters long").max(20,"Name must be at most 20 characters long"),
      email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"Invalid email address"),
      password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
      confirmPassword: zod.string().nonempty("Confirm Password is required"),
      phone:zod.string().nonempty("Phone is required").regex(regex.phoneRegex,"Phone number is invalid"),
      dateOfBirth: zod.string().nonempty("Birth Date is required").refine((data) => calcAge(data) >= 18 , "You must be at least 18 years old"),
      gender:zod.string().nonempty("Gender is required").refine((value) => value === "male" || value === "female", "Gender must be either 'male' or 'female'"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


  export const loginSchema = zod.object({
   email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"Invalid email address"),
   password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
  })


  export const hotelSchema = zod.object({
  image:zod.any().refine((files) => files?.length > 0, "Hotel image is required"),

  title:zod.string().min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),

  content:zod.string().min(10, "Content must be at least 10 characters").max(1000, "Content must not exceed 1000 characters"),

  price:zod.coerce.number().positive("Price must be greater than 0"),

  bed:zod.coerce.number().int("Number of beds must be an integer").positive("Number of beds must be greater than 0"),

  location:zod.object({
  address:zod.string().nonempty("Location is required"),
  name:zod.string().optional(),
  lat:zod.number(),
  lng:zod.number(),
  city:zod.string().optional(),
  country:zod.string().optional(),
  countryCode:zod.string().optional(),
},{
    error: "Location is required",
  }
  ),

  fromDate: zod.string().nonempty("From date is required"),
  toDate: zod.string().nonempty("To date is required"),

}).refine(
    (data) => data.toDate >= data.fromDate,
    {
      message: "To date must be after or equal to from date",
      path: ["toDate"],
    }
  );

   
  export const updateHotelSchema = zod.object({
  image:zod.any().optional(),

  title:zod.string().min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),

  content:zod.string().min(10, "Content must be at least 10 characters").max(1000, "Content must not exceed 1000 characters"),

  price:zod.coerce.number().positive("Price must be greater than 0"),

  bed:zod.coerce.number().int("Number of beds must be an integer").positive("Number of beds must be greater than 0"),

  location:zod.object({
  address:zod.string().nonempty("Location is required"),
  name:zod.string().optional(),
  lat:zod.number().optional(),
  lng:zod.number().optional(),
  city:zod.string().optional(),
  country:zod.string().optional(),
  countryCode:zod.string().optional(),
},{
    error: "Location is required",
  }
  ),

  fromDate: zod.string().nonempty("From date is required"),
  toDate: zod.string().nonempty("To date is required"),

}).refine(
    (data) => data.toDate >= data.fromDate,
    {
      message: "To date must be after or equal to from date",
      path: ["toDate"],
    }
  );
   
