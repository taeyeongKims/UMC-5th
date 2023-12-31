import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { joinUser, reviewUser, missionUser, missionUserComplete } from './../services/user.service.js';
import { getReview, getMission, getProgressingMission } from './../providers/user.provider.js';

export const userSignin = async (req, res, next) => {
    const signIn = req.body;
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", signIn); // 값이 잘 들어오는지 테스트

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}

export const userReview = async (req, res, next) => {
    const review = req.body;
    console.log("리뷰를 작성합니다.");
    console.log("body:", review); // 값이 잘 들어오는지 테스트

    res.send(response(status.SUCCESS, await reviewUser(req.body)));
}

export const userMission = async (req, res, next) => {
    const mission = req.body;
    console.log("도전 중인 미션에 추가합니다.");
    console.log("body:", mission); // 값이 잘 들어오는지 테스트

    res.send(response(status.SUCCESS, await missionUser(req.body)));
}


export const reviewPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getReview(req.params.userId, req.query)));
}

export const missionPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getMission(req.params.storeId, req.query)));
}

export const progressingMissionPreview = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await getProgressingMission(req.params.userId, req.query)));
}

export const userMissionComplete = async (req, res, next) => {
    return res.send(response(status.SUCCESS, await missionUserComplete(req.params.userId, req.params.missionId)));
}