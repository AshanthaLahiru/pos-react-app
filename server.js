const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

