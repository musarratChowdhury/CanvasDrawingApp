//
export var ArcStatus;
(function (ArcStatus) {
    ArcStatus[ArcStatus["FullCircle"] = 2] = "FullCircle";
    ArcStatus[ArcStatus["HalfCircle"] = 1] = "HalfCircle";
    ArcStatus[ArcStatus["oneFourthCircle"] = 0.5] = "oneFourthCircle";
})(ArcStatus || (ArcStatus = {}));
export class GameCanvas {
    constructor(gameCanvas, width, height, backColor) {
        this.gameCanvas = gameCanvas;
        this.width = width;
        this.height = height;
        this.backColor = backColor;
        this._ctx = this.gameCanvas.getContext("2d");
        this.gameCanvas.width = this.width;
        this.gameCanvas.height = this.height;
        this.gameCanvas.style.backgroundColor = this.backColor;
    }
    get Width() {
        return this.gameCanvas.width;
    }
    get Height() {
        return this.gameCanvas.height;
    }
    get ctx() {
        return this._ctx;
    }
    SaveState() {
        this.ctx.save();
    }
    RestoreState() {
        this.ctx.restore();
    }
    Count() {
        return GameCanvas._rectCount++;
    }
    ClearCanvas() {
        this.SaveState();
        this.drawRectangle(0, 0, this.gameCanvas.width, this.gameCanvas.height, this.gameCanvas.style.backgroundColor);
        this.RestoreState();
    }
    draw(color, strokeColor, linewidth) {
        if (this.ctx) {
            if (color && strokeColor && linewidth) {
                this.ctx.fillStyle = color;
                this.ctx.strokeStyle = strokeColor;
                this.ctx.lineWidth = linewidth;
            }
            else {
                this.ctx.fillStyle = "blue";
                this.ctx.strokeStyle = "black";
                this.ctx.lineWidth = 4;
            }
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }
    drawRectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        this.Count();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width, height);
    }
    drawShadow(color, offSetX, offSetY, blur) {
        this.ctx.shadowColor = color;
        this.ctx.shadowOffsetX = offSetX;
        this.ctx.shadowOffsetY = offSetY;
        this.ctx.shadowBlur = blur;
    }
    lineDrawing(x1, y1, x2, y2, lineWidth, color, lineCap, lineJoin, setLineDash) {
        lineJoin ? (this.ctx.lineJoin = lineJoin) : (this.ctx.lineJoin = "round");
        lineCap ? (this.ctx.lineCap = lineCap) : (this.ctx.lineCap = "round");
        if (setLineDash)
            this.ctx.setLineDash([setLineDash.x, setLineDash.y]);
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    drawCircle(x, y, radius, startAngle, endAngle, circleStatus, lineWidth, strokeStyle) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle * Math.PI, circleStatus === null || circleStatus === void 0 ? void 0 : circleStatus.clockStatus);
        if (lineWidth)
            this.ctx.linewidth = lineWidth;
        if (strokeStyle)
            this.ctx.strokeStyle = strokeStyle;
        this.ctx.stroke();
    }
    drawPath() { }
    drawCurves(typeOfCurve) { }
    drawText(text, x, y, font, fillStyle, strokeStyle, underLineText, textAlign) {
        if (font)
            this.ctx.font = `${font.fontSize}px ${font.fontFamily}`;
        this.ctx.fillStyle = fillStyle;
        this.SaveState();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillText(text, x, y);
        if (strokeStyle)
            this.ctx.strokeText(text, x, y);
        this.ctx.textAlign = textAlign;
        this.RestoreState();
        if (underLineText) {
            this.ctx.textWH = this.ctx.measureText(text);
            this.ctx.beginPath();
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(x, y + 5);
            this.ctx.lineTo(x + Math.round(this.ctx.textWH.width), y + 5);
            this.ctx.stroke();
        }
    }
}
/**
 *
 */
GameCanvas._rectCount = 0;
