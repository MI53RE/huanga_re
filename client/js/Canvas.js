class Canvas {
  constructor() {
    this.canvas = {height: 0, width: 0};
    this.context;
  }

  addCanvas(canvasId) {
    this.canvas[canvasId] = document.getElementById(canvasId);
    return this;
  }

  setCanvasHeight(height, canvasId) {
    if (canvasId) {
        this.canvas.height = height;
    } else {
        for (let canvas of this.canvas) {
            canvas.height = height;
        }
    }
    return this;
  }

  setCanvasWidth(width, canvasId) {
    if (canvasId) {
        this.canvas.width = width;
    } else {
        for (let canvas of this.canvas) {
            canvas.width = width;
        }
    }
    return this;
  }

  setContext(context) {
    this.context = this.canvas.getContext(context);
    return this;
  }

  refreshCanvas() {
    let that = this;
    function refresh() {
      window.requestAnimationFrame(refresh);
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
    }
    refresh();
  }
}