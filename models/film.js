module.exports = (mongoose, Schema) => {
    const schema = new Schema({
        title: {
            type: String,
            required: true,
        },
        release_year: {
            type: String,
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