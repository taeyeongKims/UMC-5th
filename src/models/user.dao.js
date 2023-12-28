// models/user.dao.js

import { pool } from "file:///C:/UMC-Node.js/test_folder/config/db.config.js";
import { BaseError } from "file:///C:/UMC-Node.js/test_folder/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test_folder/config/response.status.js";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID, confirmStore, insertReviewSql, getReviewID, 
    confirmMission, insertMissionSql, getMissionID, getReviewByReviewIdAtFirst, getReviewByReviewId, getMissionByMissionIdAtFirst, getMissionByMissionId,
    getProgressingMissionByMissionIdAtFirst, getProgressingMissionByMissionId, missionComplete, missionStatus } from "file:///C:/UMC-Node.js/test_folder/src/models/user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmEmail, data.email);

        if(confirm[0].isExistEmail){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();
        
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();
        
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);

    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// User review 데이터 삽입
export const addReview = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmStore, data.store_id); // 가게 확인

        if(!confirm[0].isExistStore){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertReviewSql, [data.user_id, data.store_id, data.score, data.content, data.review_image_path]);
        console.log(10);
        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 리뷰 정보 얻기
export const getReview = async (reviewId) => {
    try {
        const conn = await pool.getConnection();
        const [review] = await pool.query(getReviewID, reviewId);

        console.log(review);

        if(review.length == 0){
            return -1;
        }

        conn.release();
        return review;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// User mission 데이터 삽입
export const addMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmMission, [data.user_id, data.mission_id]); // 가게 확인

        if(confirm[0].isExistMission){
            conn.release();
            return -1;
        }

        const result = await pool.query(insertMissionSql, [data.user_id, data.mission_id, data.status]);
        console.log(10);
        conn.release();
        return result[0].insertId;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 미션 정보 얻기
export const getMission = async (missionId) => {
    try {
        const conn = await pool.getConnection();
        const [mission] = await pool.query(getMissionID, missionId);

        console.log(mission);

        if(mission.length == 0){
            return -1;
        }

        conn.release();
        return mission;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


//리뷰 보기
export const getPreviewReview = async (cursorId, size, userId) => {
    try {
        const conn = await pool.getConnection();
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(userId), parseInt(size)]);
            conn.release();
            return reviews;
        }else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 특정 가게 미션 보기
export const getPreviewMission = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [missions] = await pool.query(getMissionByMissionIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return missions;
        }else{
            const [missions] = await pool.query(getMissionByMissionId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return missions;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 진행 중인 미션 보기
export const getPreviewProgressingMission = async (cursorId, size, userId) => {
    try {
        const conn = await pool.getConnection();
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [progressing_missions] = await pool.query(getProgressingMissionByMissionIdAtFirst, [parseInt(userId), parseInt(size)]);
            conn.release();
            return progressing_missions;
        }else{
            const [progressing_missions] = await pool.query(getProgressingMissionByMissionId, [parseInt(userId), parseInt(cursorId), parseInt(size)]);
            conn.release();
            return progressing_missions;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// 미션 상태 변경
export const completeMission = async (userId, missionId) => {
    try {
        const conn = await pool.getConnection();
        await conn.query(missionComplete, [parseInt(userId), parseInt(missionId)]);
        const mission_status = await conn.query(missionStatus, [parseInt(userId), parseInt(missionId)]);
        conn.release();
        return mission_status;    
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}