for (let i = 1; i <= 3; i++) {
    let children = $('.guideInfo:nth-child(' + i + ') h5'),
        info;
    info = children.text();
    info = info.replace(/\,/g, ", ");
    children.empty();
    children.append(info);
}