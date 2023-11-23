// index.js

import express from 'express';
import { tempRouter } from 'file:///C:/UMC-Node.js/test_folder/src/routes/temp.route.js';
import { response } from 'file:///C:/UMC-Node.js/test_folder/config/response.js';
import { status } from 'file:///C:/UMC-Node.js/test_folder/config/response.status.js';
import { BaseError } from "file:///C:/UMC-Node.js/test_folder/config/error.js";

const app = express();
const port = 3000;

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
//app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함
app.use(express.urlencoded({extended: false}));

// router setting
app.use('/temp', tempRouter);


app.use((req, res, next) => {
    const err = new BaseError(status.INTERNAL_SERVER_ERROR);
    next(err);
});
app.use(async(err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.data.status).send(response(err.data));
});



app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});