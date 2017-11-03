const translate = require('google-translate-api');

exports.translateText = (text, lang) => {
    return new Promise( (resolve, reject) => {
        translate(text, {
            from:'ru', 
            to: lang
        }).then( result => {
            resolve(result.text);
        });
    })
}

exports.translitWord = (words, lang) => {
    return new Promise( (resolve, reject) => {
        //TODO
        resolve(words);
    })
}