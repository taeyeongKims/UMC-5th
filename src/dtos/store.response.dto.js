export const addStoreResponseDTO = (store) => {
    console.log("addStoreResponseDTO clear");
    return {"name": store[0].name, "addr": store[0].addr, "spec_address": store[0].spec_address};
}

export const addMissionResponseDTO = (mission) => {
    console.log("addMissionResponseDTO clear");
    return {"reward": mission[0].reward, "content": mission[0].content, "content": mission[0].content};
}