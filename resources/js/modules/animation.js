import noise from 'simplenoise';

export default class Animation {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.contentWidth = 600;
    this.contentHeight = 400;
    this.addEvent();
  }

  /**
   * イベントまとめたもの
   */
  addEvent() {
    this.animation();
  }

  /**
   * 描画する
   */
  draw() {
    this.canvas.width = this.contentWidth;
    this.canvas.height = this.contentHeight;
    this.context.clearRect(0, 0, this.contentWidth, this.contentHeight);
    this.context.lineWidth = 1;

    const lineNumber = 150; //線の数
    const segmentNumber = 150; //分割数
    const amplitude = this.contentHeight / 3; //振幅の大きさ
    const time = Date.now() / 1500;
    const radian = 4 / segmentNumber * Math.PI + time;

    for (let line = 0; line < lineNumber; line++) {
      const coefficient = 50 + line;
      this.context.beginPath();

      const hue = Math.round(line / lineNumber * 360); //色相
      const saturation = 100; //彩度
      const luminance = Math.round(line / lineNumber * 100); //輝度

      this.context.strokeStyle = `hsl(${hue},${saturation}%,${luminance}%)`;

      for (let i = 0; i < segmentNumber; i++) {
        const x = i / (segmentNumber - 1) * this.contentWidth;
        const perlinNoiseX = i / coefficient;
        const perlinNoiseY = line / 50 + time;
        const y = amplitude * noise.perlin2(perlinNoiseX, perlinNoiseY) + this.contentHeight / 2;

        if (i === 0) {
          this.context.moveTo(x, y);
        } else {
          this.context.lineTo(x, y);
        }
      }

      this.context.stroke();
    }
  }

  /**
   * アニメーションさせる
   */
  animation() {
    const render = () => {
      requestAnimationFrame(() => {
        render();
      });
      this.draw();
    };

    render();
  }

  /**
   * リサイズ時の処理
   */
  resize() {
    this.contentWidth = innerWidth * devicePixelRatio;
    this.contentHeight = innerHeight * devicePixelRatio;
    this.canvas.width = this.contentWidth;
    this.canvas.height = this.contentHeight;
  }
}
