
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