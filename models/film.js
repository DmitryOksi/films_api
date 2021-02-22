module.exports = (mongoose, Schema) => {
    const schema = new Schema({
        title: {
            type: String,
            unique : true,
            required: true,
        },
        release_year: {
            type: Number,
            min: 1850,
            max: 2021,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        stars: {
            type: String,
            required: true,
        }
    });


    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
        }
    });


    return mongoose.model("Films", schema);
}