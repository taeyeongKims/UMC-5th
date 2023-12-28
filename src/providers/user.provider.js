import { previewReviewResponseDTO, previewMissionResponseDTO, previewProgressingMissionResponseDTO} from "file:///C:/UMC-Node.js/test_folder/src/dtos/user.response.dto.js";
import { getPreviewReview, getPreviewMission, getPreviewProgressingMission} from "file:///C:/UMC-Node.js/test_folder/src/models/user.dao.js";


export const getReview = async (userId, query) => {
    const reviewId  = query.reviewId;
    const size = query.paging !== undefined ? query.paging : 3;
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, userId));
}

export const getMission = async (storeId, query) => {
    const missionId  = query.missionId;
    const size = query.paging !== undefined ? query.paging : 3;
    return previewMissionResponseDTO(await getPreviewMission(missionId, size, storeId));
}

export const getProgressingMission = async (userId, query) => {
    const progressing_missionId  = query.userMissionId;
    const size = query.paging !== undefined ? query.paging : 3;
    return previewProgressingMissionResponseDTO(await getPreviewProgressingMission(progressing_missionId, size, userId));
}