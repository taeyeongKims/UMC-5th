// models/store.sql.js

export const insertStoreSql = "INSERT INTO store (name, address, spec_address) VALUES (?, ?, ?);";

export const getStoreID = "SELECT * FROM store WHERE id = ?";

// mission Ãß°¡

export const insertMissionSql = "INSERT INTO mission (store_id, reward, deadline, content) VALUES (?, ?, ?, ?);";

export const getMissionID = "SELECT * FROM mission WHERE id = ?";