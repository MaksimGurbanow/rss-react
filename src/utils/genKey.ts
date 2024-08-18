const genKey = () => {
  const result = [];
  const letters = 'abcdefghigklmnopqrstuvwxy1234567890+_!@#$%^&*';
  for (let i = 0; i < 16; i++) {
    result.push(letters.at(Math.floor(Math.random() * letters.length)));
  }

  return result.join('');
};

export default genKey;
