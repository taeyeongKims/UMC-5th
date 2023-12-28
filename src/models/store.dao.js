// models/user.dao.js

import { pool } from "file:///C:/UMC-Node.js/test_folder/config/db.config.js";
import { BaseError } from "file:///C:/UMC-Node.js/test_folder/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test_folder/config/response.status.js";
import { getStoreID, insertStoreSql, getMissionID, insertMissionSql, getReviewByReviewId, getReviewByReviewIdAtFirst} from "file:///C:/UMC-Node.js/test_folder/src/models/store.sql.js";

// Store 데이터 삽입
export const addStore = async (data) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(insertStoreSql, [data.name, data.addr, data.spec_addr]);
        console.log("result:", result);
        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 가게 정보 얻기
export const getStore = async (storeId) => {
    try {
        const conn = await pool.getConnection();
        const [store] = await pool.query(getStoreID, storeId);

        if(store.length == 0){
            return -1;
        }

        conn.release();
        return store;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// Mission 데이터 삽입
export const addMission = async (data) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(insertMissionSql, [data.store_id, data.reward, data.deadline, data.content]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 미션 정보 얻기
export const getMission = async (missionId) => {
    try {
        const conn = await pool.getConnection();
        const [mission] = await pool.query(getMissionID, missionId);

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
export const getPreviewReview = async (cursorId, size, storeId) => {
    try {
        const conn = await pool.getConnection();
        console.log(storeId, cursorId, size);
        if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
            const [reviews] = await pool.query(getReviewByReviewIdAtFirst, [parseInt(storeId), parseInt(size)]);
            conn.release();
            return reviews;
    
        }else{
            const [reviews] = await pool.query(getReviewByReviewId, [parseInt(storeId), parseInt(cursorId), parseInt(size)]);
            console.log(reviews);
            conn.release();
            return reviews;    
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}