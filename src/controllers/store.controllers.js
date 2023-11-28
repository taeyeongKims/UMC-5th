import { response } from 'file:///C:/UMC-Node.js/test_folder/config/response.js';
import { status } from 'file:///C:/UMC-Node.js/test_folder/config/response.status.js';
import { joinStore, joinMission } from 'file:///C:/UMC-Node.js/test_folder/src/services/store.service.js';

export const storeAdd = async (req, res, next) => {
    const store_add = req.body;
    console.log("가게 추가를 요청하였습니다!");
    console.log("body:",store_add); // 값이 잘 들어오는지 테스트

    res.send(response(status.SUCCESS, await joinStore(store_add)));
}

export const missionAdd = async (req, res, next) => {
    const mission_add = req.body;
    console.log("미션 추가를 요청하였습니다!");
    console.log("body:",mission_add); // 값이 잘 들어오는지 테스트

    res.send(response(status.SUCCESS, await joinMission(mission_add)));
}