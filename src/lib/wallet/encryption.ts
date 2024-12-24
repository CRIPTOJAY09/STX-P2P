import { encrypt, decrypt } from '../crypto/encryption';

export async function encryptPrivateKey(privateKey: string): Promise<string> {
  return encrypt(privateKey);
}

export async function decryptPrivateKey(encryptedKey: string): Promise<string> {
  return decrypt(encryptedKey);
}