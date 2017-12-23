for (let i = 1; i <= 3; i++) {
    let children = $('.guideInfo:nth-child(' + i + ') h5'),
        startText,
        indexOfComma,
        resultText;
    startText = children.text();
    index = startText.indexOf(',');
    if (index === -1) continue;
    resultText = startText.slice(0, index + 1) + ' ' + startText.slice(index + 1, startText.length);
    children.empty();
    children.append(resultText);
}