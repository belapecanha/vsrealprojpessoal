const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    
    // Se a requisição espera JSON
    if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
        return res.status(500).json({
            title: 'Erro Interno',
            error: 'Ocorreu um erro ao processar sua solicitação.'
        });
    }

    // Para requisições normais, renderize a página de erro
    res.status(500).render('error', {
        title: 'Erro Interno',
        error: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.'
    });
};

module.exports = errorMiddleware;