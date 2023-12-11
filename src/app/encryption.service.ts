import * as bcrypt from 'bcrypt';

const NUMBER_OF_ROUNDS = 1;

export async function encryptPassword(raw: string): Promise<string> {
  return await bcrypt.hash(raw, NUMBER_OF_ROUNDS);
}

export async function verifyPassword(
  encrypted: string,
  raw: string,
): Promise<boolean> {
  return await bcrypt.compare(raw, encrypted);
}
