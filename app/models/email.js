const config = require('../../config'),

    email = require('emailjs/email'),
    server = email.server.connect({
        user: 'info@eyeguide.ru',
        password: config.emailPass,
        host: 'smtp.yandex.ru',
        ssl: true
    });

/**
 * Отправка письма на почту
 * @param {Object} message 
 */
exports.sendEmail = message => {
    console.log('send');
    server.send(message);
} 

