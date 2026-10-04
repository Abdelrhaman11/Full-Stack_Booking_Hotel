
export function calcAge(birthdateStr) {

const birthdate = new Date(birthdateStr);
 
const today = new Date();
let age = today.getFullYear() - birthdate.getFullYear();


const m = today.getMonth() > birthdate.getMonth() ||
(today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());


if (!m) {
age--;
}


return age;

    
}

   export const regex = {
      emailRegex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passwordRegex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      phoneRegex: /^(?:\+?[1-9]\d{7,14}|0\d{9,14})$/
   }