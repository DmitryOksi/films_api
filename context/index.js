module.exports = (mongoose) => {
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.connect(
        process.env.DB_CONNECTION,
        connectionOptions,
        () => {
            console.log("connected to db!");
        },
    );
    const {
        Schema
    } = mongoose;
    const Film = require('../models/film')(
        mongoose,
        Schema
    );
    return {
        film: Film,
    }
}