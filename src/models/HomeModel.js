const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao : String
})

const HomeModel = mongoose.model('Home', HomeSchema)


//Criação e Validação fica com a class dentro dos models!
class Home {
    
}

module.exports = Home