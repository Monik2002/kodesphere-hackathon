const express = require('express');
const bodyParser = require('body-parser');
const devicesRouter = require('./routes/devices');
const app = express();

app.use(bodyParser.json());

app.use('/devices', devicesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
