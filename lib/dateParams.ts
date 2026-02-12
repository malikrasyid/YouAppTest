export const calculateAge = (birthdayString: string | undefined): number | string => {
  if (!birthdayString) return "";
  
  const today = new Date();
  const birthDate = new Date(birthdayString);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};