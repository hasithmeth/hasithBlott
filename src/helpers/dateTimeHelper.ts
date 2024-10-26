import moment from 'moment';

const convertToDateString = (timestamp: number) => {
  const momentDate = moment(new Date(timestamp * 1000));
  return momentDate.format('DD MMM YYYY').toLocaleUpperCase();
};

export { convertToDateString };
