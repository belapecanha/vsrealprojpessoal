const authMiddleware = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        if (req.xhr || req.headers.accept.includes('application/json')) {
            return res.status(401).json({ erro: 'Não autorizado. Por favor, faça login.' });
        }
        return res.redirect('/auth/login');
    }
    next();
};

module.exports = authMiddleware;