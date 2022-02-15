//

//

//should i make a class then export?
interface IArc {
  x: number;
  y: number;

  radius: number;
  startAngle: number;
  endAngle: number;
  anticlockwise: boolean;
}
export enum CircleOptions {
  fill,
  stroke,
  dashedStroke,
}
export enum RectOptions {
  fill,
  stroke,
  dashedStroke,
}
export enum IClockStatus {
  true,
  false,
}
interface position {
  x: number;
  y: number;
}

export enum ArcStatus {
  FullCircle = 2,
  HalfCircle = 1,
  oneFourthCircle = 0.5,
}

export class GameCanvas {
  /**
   *
   */
  public snapshot: any;
  public static _rectCount: number = 0;

  private _ctx: CanvasRenderingContext2D | null =
    this.gameCanvas.getContext("2d");

  constructor(
    public gameCanvas: HTMLCanvasElement,
    public width: number,
    public height: number,
    public backColor: string
  ) {
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
  setFillStyle(color: string) {
    this.ctx ? (this.ctx.fillStyle = color) : null;
  }

  get ctx() {
    return this._ctx;
  }
  public SaveState(): void {
    this.ctx?.save();
  }
  public RestoreState(): void {
    this.ctx?.restore();
  }
  public TakeSnapShot() {
    this.snapshot = this.ctx?.getImageData(0, 0, this.Width, this.Height);
    return this.ctx?.getImageData(0, 0, this.Width, this.Height);
  }
  public restoreSnapShot() {
    this.ctx?.putImageData(this.snapshot, 0, 0);
  }
  public restorePrevSnapShot(snapshot: any) {
    this.ctx?.putImageData(snapshot, 0, 0);
  }

  Count() {
    return GameCanvas._rectCount++;
  }
  ClearCanvas() {
    this.SaveState();
    this.drawRectangle(
      0,
      0,
      this.gameCanvas.width,
      this.gameCanvas.height,
      this.gameCanvas.style.backgroundColor
    );
    this.RestoreState();
  }
  grid(rows: number, columns: number) {
    this.SaveState();

    //must be declared before beginpath

    let canvasBoundingRect = this.gameCanvas.getBoundingClientRect();

    let x = 0;
    let y = 0;
    let width = canvasBoundingRect.width;
    let height = canvasBoundingRect.height;

    let cellWidth = width / rows;
    let cellHeight = height / columns;

    for (
      var currentY = y;
      currentY <= y + rows * cellHeight;
      currentY += cellHeight
    ) {
      this.lineDrawing(
        x,
        currentY,
        x + columns * cellWidth,
        currentY,
        1,
        "grey",
        "square",
        "round",
        { x: 5, y: 5 }
      );
    }
    for (
      var currentX = x;
      currentX <= x + columns * cellWidth;
      currentX += cellWidth
    ) {
      this.lineDrawing(
        currentX,
        y,
        currentX,
        y + rows * cellHeight,
        1,
        "grey",
        "square",
        "round",
        { x: 5, y: 5 }
      );
    }

    this.RestoreState();
  }

  draw(color: string, strokeColor: string, linewidth: number): void {
    if (this.ctx) {
      if (color && strokeColor && linewidth) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = linewidth;
      } else {
        this.ctx.fillStyle = "blue";
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 4;
      }

      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
  drawMousePos(e: any, { drawText = false }): any {
    this.ctx != null ? (this.ctx.fillStyle = "black") : null;
    this.ctx != null ? (this.ctx.font = "normal bold 2em courier") : null;
    var x: number = e.clientX - this.gameCanvas.getBoundingClientRect().left;
    var y: number = e.clientY - this.gameCanvas.getBoundingClientRect().top;
    if (drawText) {
      var text = x.toFixed(2) + "," + y.toFixed(2);
      this.ClearCanvas();
      this.ctx?.fillText(text, 100, 200);
    } else {
      return { x: x, y: y };
    }
  }
  getMousePos(e: any): position {
    var x: number = e.clientX - this.gameCanvas.getBoundingClientRect().left;
    var y: number = e.clientY - this.gameCanvas.getBoundingClientRect().top;
    return { x: x, y: y };
  }
  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,

    color: string
  ) {
    this.SaveState();

    this.ctx != null ? (this.ctx.fillStyle = color) : false;
    this.ctx?.fillRect(x, y, width, height);
    this.Count();
    this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
    this.ctx != null ? (this.ctx.lineWidth = 2) : false;

    this.ctx?.strokeRect(x, y, width, height);

    this.RestoreState();
  }
  drawDashedRect(x: number, y: number, width: number, height: number) {
    this.SaveState();
    this.ctx?.setLineDash([5, 5]);
    // this.ctx?.fillRect(x, y, width, height);
    // this.Count();
    this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
    this.ctx != null ? (this.ctx.lineWidth = 1) : false;

    this.ctx?.strokeRect(x, y, width, height);
    this.RestoreState();
  }
  drawShadow(color: string, offSetX: number, offSetY: number, blur: number) {
    this.ctx != null ? (this.ctx.shadowColor = color) : false;
    this.ctx != null ? (this.ctx.shadowOffsetX = offSetX) : false;

    this.ctx != null ? (this.ctx.shadowOffsetY = offSetY) : false;
    this.ctx != null ? (this.ctx.shadowBlur = blur) : false;
  }
  lineDrawing(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth: number,
    color: string,
    lineCap?: CanvasLineCap,
    lineJoin?: CanvasLineJoin,
    setLineDash?: { x: number; y: number }
  ): void {
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

    this.ctx?.beginPath();
    this.ctx?.moveTo(x1, y1);
    this.ctx?.lineTo(x2, y2);

    this.ctx?.stroke();
    this.RestoreState();
  }
  circleDrawing(
    x: number,
    y: number,

    radius: number,
    startAngle: number,
    endAngle: ArcStatus,
    fillStatus: CircleOptions,
    fillcolor: string,
    strokecolor: string,
    circleStatus: boolean | undefined,
    lineWidth: number,
    strokeStyle: string
  ): void {
    this.SaveState();
    this.ctx?.beginPath();

    this.ctx?.arc(x, y, radius, startAngle, endAngle * Math.PI, circleStatus);
    if (lineWidth) this.ctx != null ? (this.ctx.lineWidth = lineWidth) : false;
    if (strokeStyle && this.ctx != null) this.ctx.strokeStyle = strokeStyle;
    if (CircleOptions.dashedStroke) {
      this.ctx?.setLineDash([5, 5]);
    }
    if (CircleOptions.fill && fillcolor) {
      this.ctx != null ? (this.ctx.fillStyle = fillcolor) : null;
      this.ctx?.fill();
    }
    if (CircleOptions.stroke || (CircleOptions.dashedStroke && strokecolor)) {
      this.ctx != null ? (this.ctx.strokeStyle = strokecolor) : null;
      this.ctx?.stroke();
    }
    this.ctx?.stroke();
    this.ctx?.closePath();
    this.RestoreState();
  }
  drawPath(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    this.ctx != null ? (this.ctx.strokeStyle = "blue") : null;
    this.ctx != null ? (this.ctx.fillStyle = "red") : null;
    this.ctx != null ? (this.ctx.lineWidth = 5) : null;
    this.ctx?.beginPath();
    this.ctx?.moveTo(x1, y1);
    this.ctx?.lineTo(x2, y2);
    this.ctx?.lineTo(x3, y3);
    this.ctx?.fill();
    this.ctx?.stroke();
  }
  drawCurves(typeOfCurve: string): void {}
  drawText(
    text: string,
    x: number,
    y: number,
    font: { fontSize: number; fontFamily: string; fontStyle: string },
    fillStyle: string,
    strokeStyle: string,
    underLineText: boolean,
    textAlign: CanvasTextAlign
  ) {
    if (font && this.ctx != null)
      this.ctx.font = `${font.fontSize}px ${font.fontFamily}`;
    this.ctx != null ? (this.ctx.fillStyle = fillStyle) : false;
    this.SaveState();
    this.ctx != null ? (this.ctx.strokeStyle = strokeStyle) : false;

    this.ctx != null ? this.ctx.fillText(text, x, y) : false;
    if (strokeStyle) this.ctx?.strokeText(text, x, y);
    this.ctx != null ? (this.ctx.textAlign = textAlign) : false;
    this.RestoreState();
    if (underLineText) {
      // this.ctx!=null?this.ctx.textWH = this.ctx.measureText(text):false
      this.ctx?.beginPath();
      this.ctx != null ? (this.ctx.strokeStyle = "black") : false;
      this.ctx != null ? (this.ctx.lineWidth = 2) : false;
      this.ctx?.moveTo(x, y + 5);
      // this.ctx?.lineTo(x + Math.round(this.ctx.textWH.width), y + 5);
      this.ctx?.stroke();
    }
  }
}
