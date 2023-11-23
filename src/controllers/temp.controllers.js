// temp.controller.js

import { response } from 'file:///C:/UMC-Node.js/test_folder/config/response.js';
import { getTempData, CheckFlag } from 'file:///C:/UMC-Node.js/test_folder/src/providers/temp.provider.js';
import { status } from 'file:///C:/UMC-Node.js/test_folder/config/response.status.js';

export const tempTest = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
};