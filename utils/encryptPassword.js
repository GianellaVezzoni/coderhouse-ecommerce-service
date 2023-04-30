import bcrypt from 'bcrypt';

export const encryptPassowrd = async(password) => {
  return await bcrypt.hash(password, 12);
}

export const comparePasswordAndHash = async(password, newPassword) => {
  return await bcrypt.compare(password, newPassword)
}
