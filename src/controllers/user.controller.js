const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// Crear y guardar un registro
exports.create = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message : err.message || 'Hubo un error inesperado al crear el Usuario.' });
    }
}
// Listar todos los registros
exports.findAll = async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: err.message || 'Hubo un error al momento de traer a los registros.' });
    }
}
// Listar un registro base de id
exports.findOne = async (req, res) =>{
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).send({ message: `No se encontró el Usuario = ${req.params.id}.` });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: err.message || 'Hubo un error al momento de traer a el registro.' });
    }
}
// Actualizar un registro
exports.update = async (req, res) =>{
    try {
        const { name, lastName, email } = req.body;
        let user = await User.findById(req.params.id);
        
        if(!user){
            res.status(404).send({ message: 'No se encontró el registro.' });
        }
        user.name = name;
        user.lastName = lastName;
        user.email = email;

        user = await User.findOneAndUpdate({_id:req.params.id}, user, {new: true});
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error al actualizar el registro.' });
    }
}
// Eliminar registro por id
exports.delete = async (req, res) =>{
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send({ message: `No se econtro el usuario ${req.params.id}.` });
        }
        await User.findByIdAndRemove({_id:req.params.id})
        res.status(200).send({ message : 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).send({ message : err.message || 'Hubo un error al eliminar el registro.' });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).send('Usuario no encontrado.');
        } else {
            const isMatched = await user.comparePassword(password);
            if (!isMatched){
                res.status(501).send('Contraseña inválida.');
            } else {
                const { _id, name, lastName, email, password } = user;
                const token = jwt.sign({ _id, name, lastName, email, password }, process.env.AUTH_TOKEN_KEY);
                res.status(200).json({token})
            }
        }
    } catch (error) {
        res.status(401).send({ message:'No se pudo iniciar sesion.' });
    }
}