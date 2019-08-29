
/**
 *
 * @param {MySQL} db
 * @param {string} uuid
 * @param {Object} insertParams
 * @param {Object|?} [updateParams]
 * @returns {Promise}
 */
export const insertOrUpdate = async (db, uuid, insertParams, updateParams) => {
  insertParams = Object.assign({ uuid }, insertParams, updateParams)
  if (!updateParams || Object.keys(updateParams).length === 0) {
    updateParams = { updatedAt: new Date() }
  }
  return db.query(`INSERT INTO user SET ? ON DUPLICATE KEY UPDATE ?`, [ insertParams, updateParams ])
}

/**
 *
 * @param {MySQL} db
 * @param {string} uuid
 * @returns {Promise}
 */
export const getUserByUUID = (db, uuid) => {
  return db.findOne(`SELECT * FROM user WHERE uuid = ?`, [uuid])
}

/**
 *
 * @param {MySQL} db
 * @param {string} key
 * @returns {Promise}
 */
export const getUserByPublicKey = (db, key) => {
  return db.findOne(`SELECT * FROM user WHERE publicKey = ?`, [key])
}