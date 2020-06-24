const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        ingredients: { type: Array, required: true },
        methods: { type: Array, required: true },
        userId: { type: String, required: true },
        fileName: {type: String, required: false}
        // id: {type: Number, required: true}
    },
    // { timestamps: true },
)

module.exports = mongoose.model('recipes', Recipe)