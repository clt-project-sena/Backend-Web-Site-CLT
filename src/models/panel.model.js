const mongoose = require('mongoose');

const panelSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    imageName:{
        type: String,
        require: true,
        unique: true
    },
    imageType:{
        type: String,
        require: true
    },
    numPanel:{
        type: Number,
        require: true,
        unique: true
    },
    caraFrontal:{
        type: String,
        require: true
    },
    caraInterna:{
        type: String,
        require: true
    },
    caraCentral:{
        type: String,
        require: true
    },
    largo:{
        type: Number,
        require: true
    },
    ancho:{
        type: Number,
        require: true
    },
    peso:{
        type: Number,
        require: true
    },
    espesor:{
        type: Number,
        require: true
    },
    nota:{
        type: String,
        require: true
    },
    lengueta:{
        type: String,
        require: true
    },
    machimbrado:{
        type: String,
        require: true
    },
    otros:{
        type: String,
        require: true
    }
})
module.exports = mongoose.model('Panel', panelSchema);