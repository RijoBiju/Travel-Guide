// lib/db.ts
export async function verifyUser(email: string, password: string) {
  // Replace with your actual database logic
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await comparePassword(password, user.password);

  return isPasswordValid ? user : null;
}
