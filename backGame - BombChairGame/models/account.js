const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;


const accountUserSchema = mongoose.Schema({
    // idUser: { 
    //     type: ObjectId, 
    //     index: true 
    // },
    nonce: {
        type: Number,
        required: true
    },
    publicAddress: { 
        type: String, 
        trim: true, 
        required: 'required address' 
    },
    privateKey: { 
        type: String, 
        trim: true, 
        required: 'required privateKey' }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Account', accountUserSchema);