// models/user.sql.js

// signIn
export const insertUserSql = "INSERT INTO user (email, name, gender, birth_date, address, spec_address, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM user WHERE id = ?";

export const connectFoodCategory = "INSERT INTO user_food (food_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";

export const getPreferToUserID =
"SELECT uf.id, uf.food_id, uf.user_id, f.name "
+ "FROM user_food uf JOIN food f on uf.food_id = f.id "
+ "WHERE uf.user_id = ? ORDER BY uf.food_id ASC;";

// "SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
// + "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
// + "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";

// review

export const confirmStore = "SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore";

export const insertReviewSql = "INSERT INTO review (user_id, store_id, score, content, review_image_path) VALUES (?, ?, ?, ?, ?);";

export const getReviewID = "SELECT * FROM review WHERE id = ?";

// mission

export const confirmMission = 
"SELECT EXISTS (SELECT 1 FROM user_mission WHERE (user_id = ? AND mission_id = ? AND status = '진행 중')) as isExistMission;";

export const insertMissionSql = "INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?);";

export const getMissionID = "SELECT * FROM user_mission WHERE id = ?";



