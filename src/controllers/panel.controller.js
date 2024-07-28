const Panel = require('../models/panel.model');
const fs = require('fs');
const path = require('path');

// Guardar Imagen
const saveImages = (imageName, imageType, imageStream) => {
    try {
        var x = Buffer.from(imageStream);
        console.log(imageStream);
        fs.writeFileSync(path.join(__dirname, `../image/${imageName}.${imageType}`), Buffer.from(imageStream, 'base64'));
    } catch (error) {
        console.log(error);
    }

}
// Crear y guardar
exports.create = async (req, res)=> {
    try{
        const { imageName, imageType, imageStream } = req.body;
        if (imageName == null || imageType == null || imageStream == null) {
            res.status(422).send({ message: err.message || 'No pueden estar vacíos.' });
        }
        saveImages(imageName, imageType, imageStream);

        const panel = new Panel(req.body);
        await panel.save();
        res.send(panel);
    }catch(err){
        res.status(500).send({ message : err.message || 'Hubo un error inesperado al crear el Panel.' });
    }
}   
// Listar todos los registros
exports.findAll = async (req, res) => {
    try {
        const panels = await Panel.find();
        res.send(panels);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Hubo un error al momento de traer a los registros.' });
    }
}
// Listar un registro a base de id
exports.findOne = async (req, res)=> {
    try{
        let panel = await Panel.findById(req.params.id);
        if(!panel){
            res.status(404).send({ message: 'No se encontró el registro.' });
        }
        res.json(panel);
    }catch(err){
        res.status(500).send({ message: err.message || 'Hubo un error al momento de traer el registro.' });
    }
}
// Actualizar un registro
exports.update = async (req, res) => {
    try {
        const { name, numPanel, imageName, imageStream, imageType, caraFrontal, caraInterna, caraCentral, largo, ancho, peso, espesor, nota, lengueta, machimbrado, otros } = req.body;
        let panel = await Panel.findById(req.params.id);
        if(!panel){
            res.status(404).send({ message: 'No se encontro el registro.' });
        }
        panel.name = name;
        
        panel.numPanel = numPanel;
        panel.caraFrontal = caraFrontal;
        panel.caraInterna = caraInterna;
        panel.caraCentral = caraCentral;
        panel.largo = largo;
        panel.ancho = ancho;
        panel.peso = peso;
        panel.espesor = espesor;
        panel.nota = nota;
        panel.lengueta = lengueta;
        panel.machimbrado = machimbrado;
        panel.otros = otros;
        
        if (imageStream && imageType) {
            panel.imageName = imageName;
            panel.imageType = imageType;
            saveImages(imageName, imageType, imageStream);
        }

        panel = await Panel.findOneAndUpdate({_id:req.params.id}, panel, {new: true});
        res.json(panel);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Hubo un error al momento de actualizar el registro.' });
    }
}
// Eliminar registro por id
exports.delete = async (req, res)=>{
    try {
        let panel = await Panel.findById(req.params.id);
        if(!panel){
            res.status(404).send({ message: `No se encontro el registro ${req.params.id}.` });
        }
        await Panel.findByIdAndRemove({_id:req.params.id});
        res.json({ message: 'Panel eliminado correctamente.' });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Hubo un error al momento de eliminar el registro.' });
    }
}
// Traer las imágenes
exports.getImages = async (req, res) => {
    try {
        const imageName = req.params.imageName;

        if (imageName == undefined) {
            res.status(500).send({ message: 'Parámetro inválido.' });
        }

        const panel = await Panel.findOne({ imageName });
        const imageType = panel.imageType;
        const imageBuffer = fs.readFileSync(path.join(__dirname, `../image/${imageName}.${imageType}`));

        if (!imageBuffer) {
            res.status(422).send({ message: 'Hubo un error al obtener la imagen.' });
            return;
        }
        res.set('content-type', `image/${imageType}`);
        res.status(200).send(imageBuffer);
    } catch (error) {
        res.status(500).send({ message: `Hubo un error al momento de obtener la imagen ${error}` });
    }
}