import CustomError from './custom-error';

const throwInvalidDataError = () => {
  throw new CustomError(400, 'Provided data is invalid');
};

export default throwInvalidDataError;
