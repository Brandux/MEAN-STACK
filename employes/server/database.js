const mongoose = require('mongoose');

const URI = 'mongodb://root:root@localhost:27017/mean-crud?authSource=admin';
var opc = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
mongoose.connect(URI, opc)
    .then(db => console.log('DB connect'))
    .catch(err => console.error(err));

module.exports = mongoose;