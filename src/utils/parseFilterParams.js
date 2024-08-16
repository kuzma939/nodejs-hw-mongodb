
const parseGender = (gender) => {
    const isString = typeof gender === 'string';
    if (!isString) return;
    const isGender = (gender) => ['male', 'female', 'other'].includes(gender);
  
    if (isGender(gender)) return gender;
  };
  
  const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;
  
    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return;
    }
  
    return parsedNumber;
  };
  export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
  
    const parsedContactType = parseGender(contactType);
    const parsedIsFavourite = parseNumber(isFavourite);
    return {
      contactType: parsedContactType,
      isFavourite: parsedIsFavourite,
    };
  };