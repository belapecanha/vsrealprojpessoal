// authController.js (após correção)
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt'); 

class AuthController {
    static async renderLogin(req, res) {
        res.render('login', { error: null }); 
    }

    static async renderCadastro(req, res) {
        res.render('cadastro', { error: null }); 

    }

    static async cadastrar(req, res) {
        try {
            const { name_users, email, password } = req.body;
            
            if (!name_users || !email || !password) {

                return res.render('cadastro', {
                    error: 'Todos os campos são obrigatórios'
                });
            }

            const usuarioExistente = await Usuario.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.render('cadastro', { 
                    error: 'Email já cadastrado' 
                });
            }

            // Validate password length
            if (password.length < 6) {
                return res.status(400).render('cadastro', {
                    error: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Debug log
            console.log('Registering user:', {
                email,
                passwordLength: password.length,
                hashedPasswordLength: hashedPassword.length
            });

            await Usuario.create({ name_users, email, password: hashedPassword });
            
            res.redirect('/auth/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            res.render('cadastro', { 

                error: 'Erro ao cadastrar usuário' 
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Debug log
            console.log('Login attempt:', { email });

            const usuario = await Usuario.buscarPorEmail(email);
            if (!usuario) {
                console.log('User not found:', email);
                return res.status(401).render('login', {
                    error: 'Email ou senha incorretos'
                });
            }

            // Debug log
            console.log('Stored password hash:', usuario.password);
            console.log('Provided password:', password);

            // Use try-catch for bcrypt compare
            try {
                const senhaValida = await bcrypt.compare(password, usuario.password);
                console.log('Password validation result:', senhaValida);

                if (!senhaValida) {
                    return res.status(401).render('login', {
                        error: 'Email ou senha incorretos'
                    });
                }

                // Set session
                req.session.userId = usuario.id;
                req.session.userEmail = usuario.email;
                
                return res.redirect('/kanban');
            } catch (bcryptError) {
                console.error('bcrypt comparison error:', bcryptError);
                return res.status(500).render('login', {
                    error: 'Erro na validação da senha'
                });
            }

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).render('login', {
                error: 'Erro interno do servidor'
            });
        }
    }

    static async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao fazer logout:', err);
                return res.status(500).json({ error: 'Erro ao fazer logout' });
            }
            
            // Redirecionar para a página de login
            res.redirect('/login');
        });
    }
}

module.exports = AuthController;