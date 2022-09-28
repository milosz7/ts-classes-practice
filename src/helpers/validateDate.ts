const validateDate = (date: string) => {
  return new Date(date).toString() !== 'Invalid Date';
};

export default validateDate;
