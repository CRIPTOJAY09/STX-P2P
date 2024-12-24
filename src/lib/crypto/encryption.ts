/**
 * Browser-compatible encryption utilities using Web Crypto API
 */
export async function encrypt(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Convert to base64
  return btoa(String.fromCharCode(...new Uint8Array(data)));
}

export async function decrypt(encryptedText: string): Promise<string> {
  try {
    // Convert from base64
    const binary = atob(encryptedText);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
}