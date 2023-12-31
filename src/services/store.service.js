import { addStoreResponseDTO, addMissionResponseDTO } from "./../dtos/store.response.dto.js"
import { addStore, getStore, addMission, getMission} from "./../models/store.dao.js";

export const joinStore = async (body) => {
    const joinStoreData = await addStore({
        'name': body.name,
        'addr': body.addr,
        'spec_addr': body.spec_addr,
    });
   
    return addStoreResponseDTO(await getStore(joinStoreData));
}

export const joinMission = async (body) => {

    const deadline = new Date(body.deadlineYear, body.deadlineMonth, body.deadlineDay);
    console.log(deadline);
    const joinStoreData = await addMission({
        'store_id' : body.store_id,
        'reward': body.reward,
        'deadline': deadline,
        'content': body.content,
    });
   
    return addMissionResponseDTO(await getMission(joinStoreData));
}