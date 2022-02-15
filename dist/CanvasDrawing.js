//
export var CircleOptions;
(function (CircleOptions) {
    CircleOptions[CircleOptions["fill"] = 0] = "fill";
    CircleOptions[CircleOptions["stroke"] = 1] = "stroke";
    CircleOptions[CircleOptions["dashedStroke"] = 2] = "dashedStroke";
})(CircleOptions || (CircleOptions = {}));
export var RectOptions;
(function (RectOptions) {
    RectOptions[RectOptions["fill"] = 0] = "fill";
    RectOptions[RectOptions["stroke"] = 1] = "stroke";
    RectOptions[RectOptions["dashedStroke"] = 2] = "dashedStroke";
})(RectOptions || (RectOptions = {}));
export var IClockStatus;
(function (IClockStatus) {
    IClockStatus[IClockStatus["true"] = 0] = "true";
    IClockStatus[IClockStatus["false"] = 1] = "false";
})(IClockStatus || (IClockStatus = {}));
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
    setFillStyle(color) {
        this.ctx ? (this.ctx.fillStyle = color) : null;
    }
    get ctx() {
        return this._ctx;
    }
    SaveState() {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.save();
    }
    RestoreState() {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.restore();
    }
    TakeSnapShot() {
        var _a, _b;
        this.snapshot = (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.getImageData(0, 0, this.Width, this.Height);
        return (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.getImageData(0, 0, this.Width, this.Height);
    }
    restoreSnapShot() {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.putImageData(this.snapshot, 0, 0);
    }
    restorePrevSnapShot(snapshot) {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.putImageData(snapshot, 0, 0);
    }
    Count() {
        return GameCanvas._rectCount++;
    }
    ClearCanvas() {
        this.SaveState();
        this.drawRectangle(0, 0, this.gameCanvas.width, this.gameCanvas.height, this.gameCanvas.style.backgroundColor);
        this.RestoreState();
    }
    grid(rows, columns) {
        this.SaveState();
        //must be declared before beginpath
        let canvasBoundingRect = this.gameCanvas.getBoundingClientRect();
        let x = 0;
        let y = 0;
        let width = canvasBoundingRect.width;
        let height = canvasBoundingRect.height;
        let cellWidth = width / rows;
        let cellHeight = height / columns;
        for (var currentY = y; currentY <= y + rows * cellHeight; currentY += cellHeight) {
            this.lineDrawing(x, currentY, x + columns * cellWidth, currentY, 1, "grey", "square", "round", { x: 5, y: 5 });
        }
        for (var currentX = x; currentX <= x + columns * cellWidth; currentX += cellWidth) {
            this.lineDrawing(currentX, y, currentX, y + rows * cellHeight, 1, "grey", "square", "round", { x: 5, y: 5 });
        }
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
    drawMousePos(e, { drawText = false }) {
        var _a;
        this.ctx != null ? (this.ctx.fillStyle = "black") : null;
        this.ctx != null ? (this.ctx.font = "normal bold 2em courier") : null;
        var x = e.clientX - this.gameCanvas.getBoundingClientRect().left;
        var y = e.clientY - this.gameCanvas.getBoundingClientRect().top;
        if (drawText) {
            var text = x.toFixed(2) + "," + y.toFixed(2);
            this.ClearCanvas();
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.fillText(text, 100, 200);
        }
        else {
            return { x: x, y: y };
        }
    }
    getMousePos(e) {
        var x = e.clientX - this.gameCanvas.getBoundingClientRect().left;
        var y = e.clientY - this.gameCanvas.getBoundingClientRect().top;
        return { x: x, y: y };
    }
    drawRectangle(x, y, width, height, color) {
        var _a, _b;
        this.SaveState();
        this.ctx != null ? (this.ctx.fillStyle = color) : false;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(x, y, width, height);
        this.Count();
        this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
        this.ctx != null ? (this.ctx.lineWidth = 2) : false;
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.strokeRect(x, y, width, height);
        this.RestoreState();
    }
    drawDashedRect(x, y, width, height) {
        var _a, _b;
        this.SaveState();
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.setLineDash([5, 5]);
        // this.ctx?.fillRect(x, y, width, height);
        // this.Count();
        this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
        this.ctx != null ? (this.ctx.lineWidth = 1) : false;
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.strokeRect(x, y, width, height);
        this.RestoreState();
    }
    drawShadow(color, offSetX, offSetY, blur) {
        this.ctx != null ? (this.ctx.shadowColor = color) : false;
        this.ctx != null ? (this.ctx.shadowOffsetX = offSetX) : false;
        this.ctx != null ? (this.ctx.shadowOffsetY = offSetY) : false;
        this.ctx != null ? (this.ctx.shadowBlur = blur) : false;
    }
    lineDrawing(x1, y1, x2, y2, lineWidth, color, lineCap, lineJoin, setLineDash) {
        var _a, _b, _c, _d;
        this.SaveState();
        lineJoin
            ? this.ctx != null
                ? (this.ctx.lineJoin = lineJoin)
                : false
            : this.ctx != null
                ? (this.ctx.lineJoin = "round")
                : false;
        lineCap
            ? this.ctx != null
                ? (this.ctx.lineCap = lineCap)
                : false
            : this.ctx != null
                ? (this.ctx.lineCap = "round")
                : false;
        if (setLineDash)
            this.ctx != null
                ? this.ctx.setLineDash([setLineDash.x, setLineDash.y])
                : false;
        this.ctx != null ? (this.ctx.lineWidth = lineWidth) : false;
        this.ctx != null ? (this.ctx.strokeStyle = color) : false;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.moveTo(x1, y1);
        (_c = this.ctx) === null || _c === void 0 ? void 0 : _c.lineTo(x2, y2);
        (_d = this.ctx) === null || _d === void 0 ? void 0 : _d.stroke();
        this.RestoreState();
    }
    circleDrawing(x, y, radius, startAngle, endAngle, fillStatus, fillcolor, strokecolor, circleStatus, lineWidth, strokeStyle) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.SaveState();
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.arc(x, y, radius, startAngle, endAngle * Math.PI, circleStatus);
        if (lineWidth)
            this.ctx != null ? (this.ctx.lineWidth = lineWidth) : false;
        if (strokeStyle && this.ctx != null)
            this.ctx.strokeStyle = strokeStyle;
        if (CircleOptions.dashedStroke) {
            (_c = this.ctx) === null || _c === void 0 ? void 0 : _c.setLineDash([5, 5]);
        }
        if (CircleOptions.fill && fillcolor) {
            this.ctx != null ? (this.ctx.fillStyle = fillcolor) : null;
            (_d = this.ctx) === null || _d === void 0 ? void 0 : _d.fill();
        }
        if (CircleOptions.stroke || (CircleOptions.dashedStroke && strokecolor)) {
            this.ctx != null ? (this.ctx.strokeStyle = strokecolor) : null;
            (_e = this.ctx) === null || _e === void 0 ? void 0 : _e.stroke();
        }
        (_f = this.ctx) === null || _f === void 0 ? void 0 : _f.stroke();
        (_g = this.ctx) === null || _g === void 0 ? void 0 : _g.closePath();
        this.RestoreState();
    }
    drawPath(x1, y1, x2, y2, x3, y3) {
        var _a, _b, _c, _d, _e, _f;
        this.ctx != null ? (this.ctx.strokeStyle = "blue") : null;
        this.ctx != null ? (this.ctx.fillStyle = "red") : null;
        this.ctx != null ? (this.ctx.lineWidth = 5) : null;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.moveTo(x1, y1);
        (_c = this.ctx) === null || _c === void 0 ? void 0 : _c.lineTo(x2, y2);
        (_d = this.ctx) === null || _d === void 0 ? void 0 : _d.lineTo(x3, y3);
        (_e = this.ctx) === null || _e === void 0 ? void 0 : _e.fill();
        (_f = this.ctx) === null || _f === void 0 ? void 0 : _f.stroke();
    }
    drawCurves(typeOfCurve) { }
    drawText(text, x, y, font, fillStyle, strokeStyle, underLineText, textAlign) {
        var _a, _b, _c, _d;
        if (font && this.ctx != null)
            this.ctx.font = `${font.fontSize}px ${font.fontFamily}`;
        this.ctx != null ? (this.ctx.fillStyle = fillStyle) : false;
        this.SaveState();
        this.ctx != null ? (this.ctx.strokeStyle = strokeStyle) : false;
        this.ctx != null ? this.ctx.fillText(text, x, y) : false;
        if (strokeStyle)
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.strokeText(text, x, y);
        this.ctx != null ? (this.ctx.textAlign = textAlign) : false;
        this.RestoreState();
        if (underLineText) {
            // this.ctx!=null?this.ctx.textWH = this.ctx.measureText(text):false
            (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.beginPath();
            this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
            this.ctx != null ? (this.ctx.lineWidth = 2) : false;
            (_c = this.ctx) === null || _c === void 0 ? void 0 : _c.moveTo(x, y + 5);
            // this.ctx?.lineTo(x + Math.round(this.ctx.textWH.width), y + 5);
            (_d = this.ctx) === null || _d === void 0 ? void 0 : _d.stroke();
        }
    }
}
GameCanvas._rectCount = 0;
