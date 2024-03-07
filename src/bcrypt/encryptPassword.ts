const bcrypt = require('bcrypt');

export const encryptPassword = async (unencryptedPassword: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(unencryptedPassword, saltOrRounds);
};
