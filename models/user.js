const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    playlists: [
        {
            name: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true,
                enum: ["private", "public"]
            },
            movies: [
                {
                    movieTitle: {
                        type: String
                    }
                }
            ]
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);