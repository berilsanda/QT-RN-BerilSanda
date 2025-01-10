/**
 *
 * @returns string
 *
 * Generate 6 char random id
 *
 * Only for samples not for real-world scenarios
 * since it most likely generates the same id
 *
 * Could use the uuid package but it has
 * a worse UX if it needs to be displayed
 */
export default function generateRandomId() {
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const randomId = [];

  for (let i = 0; i < 6; i++) {
    randomId.push(char[Math.floor(Math.random() * char.length)]);
  }

  return randomId.join('');
}
