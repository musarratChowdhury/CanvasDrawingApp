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
export interface IClockStatus {
  clockStatus: boolean;
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
  public static _rectCount: number = 0;

  private _ctx: any = this.gameCanvas.getContext("2d");
  constructor(
    private gameCanvas: HTMLCanvasElement,
    private width: number,
    private height: number,
    private backColor: string
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

  get ctx() {
    return this._ctx;
  }
  public SaveState(): void {
    this.ctx.save();
  }
  public RestoreState(): void {
    this.ctx.restore();
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
  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color?: string
  ) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    this.Count();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.strokeRect(x, y, width, height);
  }
  drawShadow(color: string, offSetX: number, offSetY: number, blur: number) {
    this.ctx.shadowColor = color;
    this.ctx.shadowOffsetX = offSetX;

    this.ctx.shadowOffsetY = offSetY;
    this.ctx.shadowBlur = blur;
  }
  lineDrawing(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth?: number,
    color?: string,
    lineCap?: string,
    lineJoin?: string,
    setLineDash?: { x: number; y: number }
  ): void {
    lineJoin ? (this.ctx.lineJoin = lineJoin) : (this.ctx.lineJoin = "round");
    lineCap ? (this.ctx.lineCap = lineCap) : (this.ctx.lineCap = "round");
    if (setLineDash) this.ctx.setLineDash([setLineDash.x, setLineDash.y]);
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;

    this.ctx.stroke();
  }
  drawCircle(
    x: number,
    y: number,

    radius: number,
    startAngle: number,
    endAngle: ArcStatus,
    circleStatus?: IClockStatus,
    lineWidth?: number,
    strokeStyle?: string
  ): void {
    this.ctx.beginPath();
    this.ctx.arc(
      x,
      y,
      radius,
      startAngle,
      endAngle * Math.PI,
      circleStatus?.clockStatus
    );
    if (lineWidth) this.ctx.linewidth = lineWidth;
    if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }
  drawPath(): void {}
  drawCurves(typeOfCurve: string): void {}
  drawText(
    text: string,
    x: number,
    y: number,
    font?: { fontSize: number; fontFamily: string; fontStyle: string },
    fillStyle?: string,
    strokeStyle?: string,
    underLineText?: boolean,
    textAlign?: string
  ) {
    if (font) this.ctx.font = `${font.fontSize}px ${font.fontFamily}`;
    this.ctx.fillStyle = fillStyle;
    this.SaveState();
    this.ctx.strokeStyle = strokeStyle;

    this.ctx.fillText(text, x, y);
    if (strokeStyle) this.ctx.strokeText(text, x, y);
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
