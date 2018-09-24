// 包含具体的绘图操作


import { opts } from './opts.js';


let draw = {
    'drawLine': function(startX, startY, moveX, moveY, lineWidths, color) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.beginPath();
        opts.ctx.moveTo(startX, startY);
        opts.ctx.lineTo(moveX, moveY);
        opts.ctx.closePath();
        opts.ctx.lineWidth = lineWidths;
        opts.ctx.strokeStyle = color;
        opts.ctx.stroke();
        opts.ctx.restore();
    },
    'drawCircle': function(startX, startY, moveX, moveY, lineWidth, color) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.beginPath();
        let x = moveX - startX;
        let y = moveY - startY;
        let s = Math.sqrt(x * x + y * y);
        opts.ctx.arc(startX, startY, s, 0, 2 * Math.PI, false);
        opts.ctx.closePath();
        opts.ctx.lineWidth = lineWidth;
        opts.ctx.strokeStyle = color;
        opts.ctx.stroke();
        opts.ctx.restore();
    },
    'fillCircle': function(startX, startY, moveX, moveY, lineWidth, color) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.beginPath();
        let x = moveX - startX;
        let y = moveY - startY;
        let s = Math.sqrt(x * x + y * y);
        opts.ctx.arc(startX, startY, s, 0, 2 * Math.PI, false);
        opts.ctx.closePath();
        opts.ctx.lineWidth = lineWidth;
        opts.ctx.fill();
        opts.ctx.restore()
    },
    'drawRect': function(startX, startY, moveX, moveY, lineWidth, color) {
        // console.log('Draw REXT ctx:', ctx);
        opts.ctx.save();
        opts.ctx.lineWidth = lineWidth;
        opts.ctx.strokeStyle = color;
        let x = Math.abs(moveX - startX);
        let y = Math.abs(moveY - startY);
        if (moveX > startX && moveY > startY) {
            opts.ctx.stroke(startX, startY, x, y);
        } else if (moveX > startX && moveY < startY) {
            opts.ctx.strokeRect(startX, startY - y, x, y);
        } else if (moveX < startX && moveY < startY) {
            opts.ctx.strokeRect(moveX, moveY, x, y)
        } else {
            opts.ctx.strokeRect(moveX, moveY - y, x, y);
        }
        opts.ctx.stroke();
    },
    'fillRect': function(startX, startY, moveX, moveY, lineWidth, color) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.lineWidth = lineWidth;
        opts.ctx.fillStyle = color;
        let x = Math.abs(moveX - startX);
        let y = Math.abs(moveY - startY);
        if (moveX > startX && moveY > startY) {
            opts.ctx.fillRect(startX, startY, x, y);
        } else if (moveX > startX && moveY < startY) {
            opts.ctx.fillRect(startX, startY - y, x, y);
        } else if (moveX < startX && moveY < startY) {
            opts.ctx.fillRect(moveX, moveY, x, y)
        } else {
            opts.ctx.fillRect(moveX, moveY - y, x, y);
        }
        opts.ctx.restore();
    },
    'drawTriangle': function(startX, startY, moveX, moveY, lineWidth, color) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.beginPath();
        if (moveX > startX && moveY > startY) {
            opts.ctx.moveTo(startX, startY);
            opts.ctx.lineTo(moveX, moveY);
            opts.ctx.lineTo(2 * startX - moveX, moveY);
        } else if (moveX < startX && moveY > startY) {
            opts.ctx.moveTo(startX, startY);
            opts.ctx.lineTo(startX, startY);
            opts.ctx.lineTo(2 * startX - moveX, moveY);
        } else if (moveX > startX && moveY < startY) {
            opts.ctx.moveTo(startX, startY);
            opts.ctx.lineTo(moveX, moveY);
            opts.ctx.lineTo(2 * startX - moveX, moveY);
        } else {
            opts.ctx.moveTo(startX, startY);
            opts.ctx.lineTo(moveX, moveY);
            opts.ctx.lineTo(2 * moveX - startX, startY);
        }
        opts.ctx.closePath();
        opts.ctx.lineWidth = lineWidth;
        opts.ctx.strokeStyle = color;
        opts.ctx.stroke();
        opts.ctx.restore();
    },
    'drawText': function(startX, startY, color, text) {
        // console.log(ctx);
        opts.ctx.save();
        opts.ctx.font = 'bold 14px Arial';
        opts.ctx.textAlign = 'center';
        opts.ctx.textBaseline = 'middle';
        opts.ctx.fillStyle = color;
        opts.ctx.fillText(text, startX, startY);
        opts.ctx.restore();
    }
}

export { opts, draw };