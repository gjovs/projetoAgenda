const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');


const LoginSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

const LoginModel = mongoose.model('Login', LoginSchema)


class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    //Getter 
    getBody() {
        return this.body;
    }
    getEmail() {
        return this.body.email;
    }
    getPassword() {
        return this.body.password;
    }

    //Setter
    setBody(body) {
        this.body = body;
    }
    setEmail(email) {
        this.body.email = email;
    }
    setPassword(password) {
        this.body.password = password;
    }
    async auth(){
        this.valida();
        if(this.errors.length > 0) return 
        
        this.user = await LoginModel.findOne({
            email: this.getEmail(),    
        })
        if(!this.user) {
            this.errors.push("Usuario não existe!")
            return
        }

        if(!bcrypt.compare(this.getPassword(), this.user.password)){
            this.errors.push("senha inválida!")
            this.user = null;
            return
        }


        

    }
    async register() {
        this.valida();
        
        if (this.errors.length > 0) return
        
        await this.userExists()

        if (this.errors.length > 0) return

        const salt = bcrypt.genSaltSync();

        this.setPassword(bcrypt.hashSync(this.getPassword(), salt))

        this.user = await LoginModel.create(this.getBody())


    }

    async userExists() {
        this.user = await LoginModel.findOne({
            email: this.getEmail()
        })
        if (this.user) this.errors.push("Usuario já existe!")
    }

    valida() {
        this.cleanUp();
        //Validação 
        //O email precisa ser valido
        if (!validator.isEmail(this.getEmail())) {
            this.errors.push('E-mail Inválido!')
        }
        //A senha precisa ter de 3 a 50 caracteres
        if (this.getPassword().length < 3 || this.getPassword().length >= 50) {
            this.errors.push('Senha Inválida!, precisa ter de 3 a 50 caracteres.')
        }



    }
    cleanUp() {

        for (const key in this.getBody()) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.setBody({ 
            email: this.getEmail(),
            password: this.getPassword(),
        })
    }


}

module.exports = Login