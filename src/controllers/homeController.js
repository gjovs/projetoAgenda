const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const contatos = await Contato.searchForContacts()
    res.render('index', { contatos })
    return
};
