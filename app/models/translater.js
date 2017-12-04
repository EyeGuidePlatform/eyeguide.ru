const translate = require('google-translate-api');

exports.translateText = async (text, lang) => {
    let resultText = await translate(text, {
        from:'ru', 
        to: lang
    });

    return resultText.text;
}

exports.translitWord = async (words, lang) => {
    return words;
}