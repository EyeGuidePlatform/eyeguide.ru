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
    //console.log(message);
    server.send(message, function(err, message) { console.log(err || message); });
} 

