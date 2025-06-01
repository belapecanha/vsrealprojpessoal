const Usuario = require('../models/usuario');
const { criarUsuario } = require('./usuariosController');

class AuthController {
    static async renderLogin(req, res) {
        res.render('auth/login', { error: null });
    }

    static async renderCadastro(req, res) {
        res.render('auth/cadastro', { error: null });
    }

    static async cadastrar(req, res) {
        try {
            const { name_users, email, password } = req.body;
            
            if (!name_users || !email || !password) {
                return res.render('auth/cadastro', {
                    error: 'Todos os campos são obrigatórios'
                });
            }

            // Verifica se usuário já existe
            const usuarioExistente = await Usuario.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.render('auth/cadastro', { 
                    error: 'Email já cadastrado' 
                });
            }

            // Cria novo usuário usando o modelo diretamente
            await Usuario.create({ name_users, email, password });
            
            res.redirect('/kanban');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            res.render('auth/cadastro', { 
                error: 'Erro ao cadastrar usuário' 
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Busca usuário
            const usuario = await Usuario.buscarPorEmail(email);
            if (!usuario) {
                return res.render('auth/login', { 
                    error: 'Usuário não encontrado' 
                });
            }

            // Valida senha
            const senhaValida = await Usuario.validarSenha(password, usuario.password);
            if (!senhaValida) {
                return res.render('auth/login', { 
                    error: 'Senha incorreta' 
                });
            }

            // Cria sessão
            req.session.userId = usuario.id;
            res.redirect('/kanban');
        } catch (error) {
            console.error(error);
            res.render('auth/login', { 
                error: 'Erro ao fazer login' 
            });
        }
    }
}

module.exports = AuthController;