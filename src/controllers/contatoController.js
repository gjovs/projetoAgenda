const Contato = require('../models/ContatoModel')

exports.index = (req, res, next) => {
    res.render('contato', {contato: {}})
}

exports.register = async (req, res, next) => {
    const contato = new Contato(req.body)
 
    try {
        await contato.register()
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
        req.flash('success', 'Contato registrado com Sucesso!')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    }
    catch(e){
        console.log(e)
        return res.render('404')
    }

   
}

exports.editIndex = async (req, res, next) => {
    if(!req.params.id) return res.render('404')
    
    const contato = await Contato.searchForID(req.params.id)

    if(!contato) return res.render('404')
    
    res.render('contato', { contato })
    
    next()
}

exports.edit = async (req,res,next) => {
    if(!req.params.id) return res.render('404')
    
    const contato = new Contato(req.body)

    try{

        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
    
        req.flash('success', 'Contato editado com Sucesso!')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return
    
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.delete = async (req,res,next) => {

    if(!req.params.id) return res.render('404')
        
    const contato = await Contato.delete(req.params.id)
    
    if(!contato) return res.render('404')
        

    req.flash('success', 'Contato apagado com Sucesso')
    req.session.save(() => res.redirect('back'))
    return
    
}