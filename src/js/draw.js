// import { opts } from './opts.js';
import { opts, draw } from './methods.js';

import "../css/style.scss";

class Draw {
    constructor() {
        this.opts = opts;
        this.draw = draw;
        this.widthLine = [this.opts.line_1, this.opts.line_3, this.opts.line_5, this.opts.line_7];
        this.colors = [this.opts.redColor, this.opts.greenColor, this.opts.blueColor, this.opts.yellowColor, this.opts.whiteColor, this.opts.blackColor, this.opts.pinkColor, this.opts.purpleColor, this.opts.cyanColor, this.opts.orangeColor];
        this.accord = [];
        this.curTool = 0;
        this.curColor = 'black';
        this.curLineWidth = '1';
        this.init();
        // this.selectTools(this.opts.brush)
    };
    init() {
        this.drawImg(this.curTool, this.curLineWidth, this.curColor);
        this.selectTools(this.opts.actions);
        this.selectTools(this.widthLine);
        this.selectColors(this.colors);
        this.resize();
        this.clearImg()
    }
    selectTools(tool) {
            let tools = tool;
            tools.forEach((item, index) => {
                let indexBakup = index;
                item.onclick = (e) => {
                    // console.log('backup index:', indexBackup)
                    tools.forEach((item, index) => {
                        item.style.background = index === indexBakup ? 'yellow' : '#ccc'
                    })
                    if (tools === this.opts.actions) {
                        this.curTool = index;
                    } else if (tools === this.widthLine) {
                        this.curLineWidth = index;
                    }
                    // console.log(this.curTool)
                    this.drawImg(this.curTool, this.curLineWidth, this.curColor)
                }
            })
        }
        // 将选取线条和绘图工具等操作都集合到前面的selectTools，只要传递合适的参数即可
    selectColors() {
        this.colors.forEach((item, index) => {
            let indexBackup = index;
            item.onclick = (e) => {
                this.colors.forEach((item, index) => {
                    item.style.border = index === indexBackup ? '3px solid crimson' : '3px solid #fff';
                })
                this.curColor = item.id;
                // console.log(this.curColor)
                this.drawImg(this.curTool, this.curLineWidth, this.curColor);
            }
        })
    }

    resize() {
        this.opts.magnifier.addEventListener('click', () => {
            let scale = window.prompt('请输入缩放比例', 100);
            scale = scale === null ? 100 : scale;
            this.opts.canvas.style.width = parseInt(880 * scale / 100) + 'px';
            this.opts.canvas.style.height = parseInt(400 * scale / 100) + 'px';
        }, false);
    }
    saveImg() {
        this.opts.addEventListener('click', () => {
            let imgData = this.opts.canvas.toDataURL();
            let base64 = imgData.subString(22);
            this.opts.imgSave = base64;
            this.opts.form.submit();
        }, false)
    }
    clearImg() {
        this.opts.clearImg.addEventListener('click', () => {
            this.opts.ctx.clearRect(0, 0, 880, 400)
        }, false)
    }
    drawAgain(data) {
        data.forEach((item, index) => {
            switch (item.type) {
                case 0:
                    this.opts.ctx.save();
                    this.opts.ctx.beginPath();
                    this.opts.ctx.moveTo(item.down[0], item.down[1]);
                    item.move.forEach((item, index) => {
                        this.opts.ctx.lineTo(item[0], item[1]);
                    })
                    this.opts.ctx.lineWidth = item.line;
                    this.opts.ctx.strokeStyle = item.colors;
                    this.opts.ctx.stroke();
                    this.opts.ctx.restore();
                    break;
                case 1:
                    this.opts.ctx.save();
                    this.opts.ctx.beginPath();
                    this.opts.ctx.moveTo(item.down[0], item.down[1]);
                    item.move.forEach((item, index) => {
                        this.opts.ctx.lineTo(item[0], item[1]);
                    })
                    this.opts.ctx.lineWidth = item.line;
                    this.opts.ctx.strokeStyle = '#fff';
                    this.opts.ctx.stroke();
                    this.opts.ctx.restore();
                    break;
                case 2:
                    this.opts.ctx.fillStyle = item.colors;
                    this.opts.ctx.fillRect(0, 0, 880, 400);
                case 4:
                    this.draw.drawText(item.down[0], item.down[1], item.colors, item.text[0]);
                    break;
                case 6:
                    this.draw.drawLine(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
                case 7:
                    this.draw.drawCircle(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
                case 8:
                    this.draw.drawRect(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
                case 9:
                    this.draw.drawTriangle(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
                case 10:
                    this.draw.fillCircle(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
                case 11:
                    this.draw.fillRect(item.down[0], item.down[1], item.up[0], item.up[1], item.line, item.colors);
                    break;
            }
        })
    }
    drawImg(tools, lineWidth, color) {
        let startX, startY, moveX, moveY, endX, endY;
        let temp = {
            'type': tools,
            'line': lineWidth,
            'color': color,
            'down': [],
            'move': [],
            'up': [],
            'text': []
        };
        let flag = 0;
        this.opts.canvas.onmousedown = (e) => {
            // console.log('mouse down');
            flag = 1;
            startX = e.pageX - this.opts.canvas.offsetLeft;
            startY = e.pageY - this.opts.canvas.offsetTop;
            temp.down.push(startX, startY);
            switch (tools) {
                case 0:
                    this.opts.ctx.save();
                    this.opts.ctx.beginPath();
                    this.opts.ctx.moveTo(startX, startY);
                    break;
                case 1:
                    this.opts.ctx.save();
                    this.opts.ctx.beginPath();
                    this.opts.ctx.moveTo(startX, startY);
                    break;
                case 2:
                    this.opts.ctx.fillStyle = color;
                    this.opts.ctx.fillRect(0, 0, 880, 400);
                case 3:
                    let obj = this.opts.ctx.getImageData(moveX, moveX, 1, 1)
                    break;
            }
        }
        this.opts.canvas.onmousemove = (e) => {
            // console.log('mouse move');
            moveX = e.pageX - this.opts.canvas.offsetLeft;
            moveY = e.pageY - this.opts.canvas.offsetTop;
            if (flag) {
                // console.log('flag:', flag)
                temp.move.push([moveX, moveY]);
                // console.log('switch tools:', tools)
                let ctx = this.opts.canvas.getContext('2d');
                switch (tools) {
                    case 0: // 画笔
                        this.opts.ctx.lineTo(moveX, moveY);
                        this.opts.ctx.lineWidth = lineWidth;
                        this.opts.ctx.strokeStyle = color;
                        this.opts.ctx.stroke();
                        this.opts.ctx.restore();
                        break;
                    case 1: // 橡皮
                        this.opts.ctx.lineTo(moveX, moveY);
                        this.opts.ctx.lineWidth = lineWidth;
                        this.opts.ctx.strokeStyle = '#fff';
                        this.opts.ctx.stroke();
                        this.opts.ctx.restore();
                        break;
                    case 6: // 直线
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        // console.log(ctx);
                        this.draw.drawLine(startX, startY, moveX, moveY, lineWidth, color);
                        break;
                    case 7: // 圆
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        //console.log('tools: ', this.curTool)
                        this.draw.drawCircle(startX, startY, moveX, moveY, lineWidth, color);
                        break;
                    case 8: // 长方形
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        console.log(lineWidth)
                        this.draw.drawRect(startX, startY, moveX, moveY, lineWidth, color)
                        break;
                    case 9: // 三角形
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        //console.log('tools: ', this.curTool)
                        // console.log(ctx);
                        this.draw.drawTriangle(startX, startY, moveX, moveY, lineWidth, color);
                        break;
                    case 10: // 实心圆
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        //console.log('tools: ', this.curTool)
                        // console.log(ctx);
                        this.draw.fillCircle(startX, startY, moveX, moveY, lineWidth, color);
                        break;
                    case 11: // 实心矩形
                        this.opts.ctx.clearRect(0, 0, 880, 400);
                        this.drawAgain(this.accord);
                        //console.log('tools: ', this.curTool)
                        // console.log(ctx);
                        this.draw.fillRect(startX, startY, moveX, moveY, lineWidth, color);
                        break;
                }
            }
            this.opts.canvas.onmouseup = (e) => {
                // console.log('mouse up');
                flag = 0;
                endX = e.pageX - this.opts.canvas.offsetLeft;
                endY = e.pageY - this.opts.canvas.offsetTop;
                temp.up.push(endX, endY);
                if (tools === 4) {
                    let textValue = window.prompt('请输入文字');
                    textValue = textValue === null ? '' : textValue;
                    temp.text.push(textValue);
                    this.draw.drawText(startX, startY, color, textValue);
                }
                this.accord.push(temp);
                temp = {
                    'type': tools,
                    'line': lineWidth,
                    'color': color,
                    'down': [],
                    'move': [],
                    'up': [],
                    'text': []
                };
            }
            this.opts.canvas.onmouseout = (e) => {
                flag = 0;
            }
        }
    }
}

new Draw();
