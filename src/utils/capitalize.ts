export default (str?: string) => {
  return str ? str.charAt(0).toUpperCase().concat(str.slice(1)) : '';
};
