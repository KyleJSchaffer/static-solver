
const express = require('express');
const baseDir = 'public';

let app = express();

app.use(express.static(baseDir));

app.listen(3000, function () {
    console.log("listening at http://localhost:3000");
});
