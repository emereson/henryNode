require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database Authenticated! ✔'))
  .catch((error) => console.log(error));

initModel();

db.sync({ force: true })
  .then(() => console.log('Database Synced! ❤'))
  .catch((error) => console.log(error));

const port = +process.env.PORT || 3024;

app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
