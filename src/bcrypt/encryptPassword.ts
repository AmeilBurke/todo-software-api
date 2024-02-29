const bcrypt = require('bcrypt');

export const encryptPassword = async (unencryptedPassword: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(unencryptedPassword, saltOrRounds);
};
