const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost.social-network-api-', { 
    useNewURLParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false, 
}); 

module.exports = mongoose.connection; 
