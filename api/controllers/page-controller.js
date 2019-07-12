import path from 'path';

/**
 * Generate main page.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function mainPageAction({ req, res, db }) {
  const file = path.resolve('build/index.html')
  return res.sendFile(file)
}