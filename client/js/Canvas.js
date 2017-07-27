class Canvas {
  constructor(context, height, width) {
    this.canvas = {};
    this.context = context;
    this.height = height;
    this.width = width;
    this.addCanvas("horizon", height, width);
    this.addCanvas("background", height, width);
    this.addCanvas("playground", height, width);
    this.addCanvas("effects", height, width);
    this.addCanvas("foreground", height, width);
    this.addCanvas("skyeffects", height, width);
    this.addCanvas("lightfilter", height, width);
  }

  addCanvas(canvasId, height, width) {
    let c = document.createElement("canvas");
    document.body.appendChild(c);
    c.id = canvasId;
    c.width = width;
    c.height = height;
    c.context = c.getContext(this.context);
    this.canvas[canvasId] = c;
    return this;
  }

  getCanvas(canvasId) {
    return this.canvas[canvasId];
  }

  setCanvasHeight(height, canvasId) {
    if (canvasId) {
      this.canvas[canvasId].height = height;
    } else {
      for (let canvas of this.canvas) {
        canvas.height = height;
      }
    }
    return this;
  }

  setCanvasWidth(width, canvasId) {
    if (canvasId) {
      this.canvas[canvasId].width = width;
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

  refreshCanvas(canvasId) {
    let canvas = this.getCanvas(canvasId);
    function refresh() {
      window.requestAnimationFrame(refresh);
      canvas.context.clearRect(0, 0, canvas.width, canvas.height);
    }
    refresh();
  }
}