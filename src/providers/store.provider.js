import { previewReviewResponseDTO} from "./../dtos/store.response.dto.js";
import { getPreviewReview} from "./../models/store.dao.js";


export const getReview = async (storeId, query) => {
    const reviewId  = query.reviewId;
    const size = query.paging !== undefined ? query.paging : 3;
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}