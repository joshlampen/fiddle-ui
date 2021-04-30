const express = require('express');
const path = require('path');
const { allowCorsHandler } = require('./middleware/allowCorsHandler');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/*', allowCorsHandler);
app.set('port', port);

var server = app.listen(app.get('port'), () => {
    console.log('listening on port ', server.address().port);
});
