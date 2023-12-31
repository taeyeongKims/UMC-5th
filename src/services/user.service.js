import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { signinResponseDTO, reviewResponseDTO, missionResponseDTO, missionStatusResponseDTO } from "./../dtos/user.response.dto.js"
import { addUser, getUser, getUserPreferToUserID, setPrefer, addReview, getReview, addMission, getMission, completeMission } from "../models/user.dao.js";

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    console.log(birth);
    const prefer = body.prefer;
    console.log(prefer);

    const joinUserData = await addUser({
        'email': body.email,
        'name': body.name,
        'gender': body.gender,
        'birth': birth,
        'addr': body.addr,
        'specAddr': body.specAddr,
        'phone': body.phone
    });
    console.log(joinUserData);
    if(joinUserData == -1){
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    }else{
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        console.log(10);
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }
}

export const reviewUser = async(body) => {
    const joinReviewData = await addReview ({
        'user_id' : body.user_id,
        'store_id' : body.store_id,
        'score' : body.score,
        'content' : body.content,
        'review_image_path' : body.review_image_path
    });
    console.log(joinReviewData);
    if(joinReviewData == -1){
        throw new BaseError(status.STORE_NOT_EXIST);
    }else{
        return reviewResponseDTO(await getReview(joinReviewData));
    }
}

export const missionUser = async(body) => {
    const joinMissionData = await addMission ({
        'user_id' : body.user_id,
        'mission_id' : body.mission_id,
        'status' : body.status
    });
    console.log(joinMissionData);
    if(joinMissionData == -1){
        throw new BaseError(status.STORE_NOT_EXIST);
    }else{
        return missionResponseDTO(await getMission(joinMissionData));
    }
}

export const missionUserComplete = async(userId, missionId) => {
    const MissionDataStatus = await completeMission(userId, missionId);
    if(MissionDataStatus[0][0].status != '진행 완료'){
        throw new BaseError(status.NOT_CHANGED_STATUS);
    }else{
        return missionStatusResponseDTO(MissionDataStatus[0][0].status);
    }
}