// temp.service.js

import { tempResponseDTO, flagResponseDTO } from "file:///C:/UMC-Node.js/test_folder/src/dtos/temp.response.dto.js";
import { BaseError } from "file:///C:/UMC-Node.js/test_folder/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test_folder/config/response.status.js";

export const getTempData = () => {
    return tempResponseDTO("This is TEST! >.0");
}

export function CheckFlag(flag) {
        if (flag == 1)
        throw new BaseError(status.UNAUTHORIZED);   // ���� �߻���Ű��
    else {
        return flagResponseDTO(flag);
    }
    
}
