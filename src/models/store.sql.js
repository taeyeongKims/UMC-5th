// models/store.sql.js

export const insertStoreSql = "INSERT INTO store (name, address, spec_address) VALUES (?, ?, ?);";

export const getStoreID = "SELECT * FROM store WHERE id = ?";

// mission Ãß°¡

export const insertMissionSql = "INSERT INTO mission (store_id, reward, deadline, content) VALUES (?, ?, ?, ?);";

export const getMissionID = "SELECT * FROM mission WHERE id = ?";

// ?? ?? sql

export const getReviewByReviewId = 
"SELECT u.name, r.id, r.score, r.content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.id "
+ "WHERE r.store_id = 1 AND r.id < 5 "
+ "ORDER BY r.id DESC LIMIT 3 ;"

export const getReviewByReviewIdAtFirst = 
"SELECT u.name, r.id, r.score, r.content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.id "
+ "WHERE r.store_id = ? "
+ "ORDER BY r.id DESC LIMIT ? ;"