const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const BDConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect BD');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = BDConnect;