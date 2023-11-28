// models/user.dao.js

import { pool } from "file:///C:/UMC-Node.js/test_folder/config/db.config.js";
import { BaseError } from "file:///C:/UMC-Node.js/test_folder/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test_folder/config/response.status.js";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID, confirmStore, insertReviewSql, getReviewID, confirmMission, insertMissionSql, getMissionID } from "file:///C:/UMC-Node.js/test_folder/src/models/user.sql.js";

// User ������ ����
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

// ����� ���� ���
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

// ���� ��ȣ ī�װ� ����
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

// ����� ��ȣ ī�װ� ��ȯ
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

// User review ������ ����
export const addReview = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmStore, data.store_id); // ���� Ȯ��

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

// ���� ���� ���
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

// User mission ������ ����
export const addMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmMission, [data.user_id, data.mission_id]); // ���� Ȯ��

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

// �̼� ���� ���
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