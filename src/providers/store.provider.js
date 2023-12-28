import { previewReviewResponseDTO} from "file:///C:/UMC-Node.js/test_folder/src/dtos/store.response.dto.js";
import { getPreviewReview} from "file:///C:/UMC-Node.js/test_folder/src/models/store.dao.js";


export const getReview = async (storeId, query) => {
    const {reviewId, size = 3} = query;
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}