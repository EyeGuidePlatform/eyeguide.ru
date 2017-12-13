const config = require('../../config'),

    email = require('emailjs/email'),
    server = email.server.connect({
        user: 'eyeguidetest',
        password: config.emailPass,
        host: 'smtp.gmail.com',
        ssl: true
    });

/**
 * Отправка письма на почту
 * @param {Object} message 
 */
exports.sendEmail = message => {
    server.send(message);
} 

