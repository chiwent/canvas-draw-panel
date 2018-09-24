let opts = {
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    saveImg: document.getElementById('save-img'),
    clearImg: document.getElementById('clear-img'),
    brush: document.getElementById('brush'),
    eraser: document.getElementById('eraser'),
    paint: document.getElementById('paint'),
    straw: document.getElementById('straw'),
    text: document.getElementById('text'),
    magnifier: document.getElementById('magnifier'),

    line: document.getElementById('line'),
    arc: document.getElementById('arc'),
    rect: document.getElementById('rect'),
    poly: document.getElementById('poly'),
    arcfill: document.getElementById('arcfill'),
    rectfill: document.getElementById('rectfill'),

    actions: [brush, eraser, paint, straw, text, magnifier, line, arc, rect, poly, arcfill, rectfill],
    //线宽
    line_1: document.getElementById('width-1'),
    line_3: document.getElementById('width-3'),
    line_5: document.getElementById('width-5'),
    line_7: document.getElementById('width-7'),
    // widthLine: [line_1, line_3, line_5, line_7],
    //颜色
    redColor: document.getElementById('red'),
    greenColor: document.getElementById('green'),
    blueColor: document.getElementById('blue'),
    yellowColor: document.getElementById('yellow'),
    whiteColor: document.getElementById('white'),
    blackColor: document.getElementById('black'),
    pinkColor: document.getElementById('pink'),
    purpleColor: document.getElementById('purple'),
    cyanColor: document.getElementById('cyan'),
    orangeColor: document.getElementById('orange'),
    // colors: [redColor, greenColor, blueColor, yellowColor, whiteColor, blackColor, pinkColor, purpleColor, cyanColor, orangeColor],

    curTool: 0,
    curColor: 'black',
    curLineWidth: '1',

    //accord: [],

    form: document.getElementById('myform'),
    imgSave: document.getElementById('img-save')
};

export { opts };