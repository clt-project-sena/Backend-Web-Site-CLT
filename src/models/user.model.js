const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    }
})
// Encriptar la contraseña
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
});
// Comparar contraseña enviada por el usuario con la guardada
userSchema.methods.comparePassword = async function(passwordHashed){
    return await bcrypt.compare(passwordHashed, this.password);
}
module.exports = mongoose.model('User', userSchema);