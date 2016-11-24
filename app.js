'use strict';
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const app = require('./config/express')(config);
const models = require('./lib/models')();
const data = require('./data')(models);

require('./config/database')(config);
require('./config/passport')(models.User);
require('./lib/routes')(app, data);

<<<<<<< HEAD
app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));
=======
app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`);
});
>>>>>>> 49bda46819fe5ceb2e165762b51311ae39779fe4
