// Bcrypt is designed to be a one-way hashing algorithm and doesn't support decryption.
import bcrypt from "bcrypt";

export const encryptData = async (
  data: string,
  saltRounds: number = 10
): Promise<string> => {
  return bcrypt.hash(data, saltRounds);
};

export const compareData = async (
  plainText: string,
  hashedText: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashedText);
};
