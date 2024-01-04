class CloudOpen {
    constructor() {
      this.canv = null;
      this.ctx = null;
      this.i = 0;
      this.speed = 0;
      //遮罩云
      this.imgMask = new Image();
      this.imgMask.crossOrigin = "";
      //主图
      this.img = new Image();
      this.img.crossOrigin = "";
    }
  
    init(back, canvas, img, mask, speed = 10) {
      this.speed = speed;
      this.canv = canvas;
      this.ctx = this.canv.getContext("2d");
      this.i = 0;
      this.img.onload = () => {
        // 主图加载完成
        this.canv.width = this.img.naturalWidth;
        this.canv.height = this.img.naturalHeight;
      };
      this.imgMask.onload = () => {
        // 遮罩加载完成
        if (back) {
          back();
        }
      };
      //主图
      this.img.src = img;
      //遮罩云
      this.imgMask.src = mask;
    }
    step() {
      let maskX = (this.canv.width - this.i) / 2;
      let maskY = (this.canv.height - this.i) / 2;
      this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.drawImage(this.imgMask, maskX, maskY, this.i, this.i);
      this.ctx.globalCompositeOperation = "source-in";
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.naturalWidth,
        this.img.naturalHeight
      );
    }
    //复原
    reset() {
      this.i = 0;
      this.step();
    }
    draw(backFun = null) {
      this.i += this.speed;
      this.step();
      let maxSize = Math.max(this.canv.width, this.canv.height);
      if (this.i >= maxSize * 5) {
        //结束
        if (backFun) {
          backFun();
        }
      } else {
        window.requestAnimationFrame(() => {
          this.draw(backFun);
        });
      }
    }
  }
  