import mongoose from "mongoose";

const sProgrammeSchema = new mongoose.Schema({
    participantName:{
        type: String,
        required: true,
    },
    telephoneNo:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    educationLevel:{
        type: String,
        required: true,
    },
    school:{
        type: String,
        required: true,
    },
    area:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: false,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const SProgramme = mongoose.model('SProgramme', sProgrammeSchema);
export default SProgramme;