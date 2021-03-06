// // import { Mandelbrod } from './mandelbrod';
//
// // https://github.com/webpack/webpack-dev-server/issues/745
// const sendMessage: any = self.postMessage;
//
// self.addEventListener('message', function (e) {
//   const {imageData, xMin, xMax, yMin, yMax, width, height, maxIterations} = e.data;
//   let fractal;
//
//   // switch (name) {
//   //   case 'mandelbrod':
//   //     fractal = new Mandelbrod();
//   //     break;
//   //   default:
//   //     console.warn(`Fractal '${name}' is not yet supported!`);
//   //     return;
//   // }
//   fractal = new Mandelbrod();
//
//   fractal.setBoundaries(xMin, xMax, yMin, yMax, width, height, maxIterations);
//   fractal.setImageData(imageData || new ImageData(width, height));
//
//   const result = fractal.compute();
// console.log(result.data);
//   sendMessage(result);
// }, false);
//
// // https://github.com/JamesRandall/Mandelbrot-Set.git
//
// export class Mandelbrod {
//   maxIterations: number;
//   xMin: number;
//   xMax: number;
//   yMin: number;
//   yMax: number;
//   width: number;
//   height: number;
//   imageData: ImageData; // rgba
//   pixels: number[];
//   xScale: number;
//   yScale: number;
//
//   setBoundaries(xMin: number, xMax: number, yMin: number, yMax: number, width: number, height: number, maxIterations: number): void {
//     this.xMin = xMin;
//     this.xMax = xMax;
//     this.yMin = yMin;
//     this.yMax = yMax;
//     this.width = width;
//     this.height = height;
//     this.maxIterations = maxIterations;
//   }
//
//   setImageData(imageData: ImageData): void {
//     this.imageData = imageData;
//     this.pixels = Array(this.width * this.height * 4);
//   }
//
//   updatePixel(offset, red, green, blue, alpha = 255): void {
//     this.pixels[offset] = red;
//     this.pixels[offset + 1] = green;
//     this.pixels[offset + 2] = blue;
//     this.pixels[offset + 3] = alpha;
//   }
//
//   coord2Index(x: number, y: number): number {
//     return (y * this.width + x) * 4;
//   }
//
//   compute(): ImageData {
//     this.xScale = (this.xMax - this.xMin) / this.width;
//     this.yScale = (this.yMax - this.yMin) / this.height;
//
//     console.log('wer: ', this.width, this.xScale)
//     for (let sx = 0; sx < this.width; sx++) {
//       for (let sy = 0; sy < this.height; sy++) {
//         const xScaled = sx * this.xScale + this.xMin;
//         const yScaled = sy * this.yScale + this.yMin;
//
//         let iteration = 0;
//         let x = 0;
//         let y = 0;
//         while ((x * x + y * y) <= (2 * 2) && iteration < this.maxIterations) {
//           const xTemp = x * x - y * y + xScaled;
//           y = 2 * x * y + yScaled;
//           x = xTemp;
//
//           iteration = iteration + 1;
//         }
//
//         if (iteration === this.maxIterations) {
//           this.updatePixel(this.coord2Index(sx, sy), 0, 0, 0);
//         } else {
//           const colors = getColor(iteration, this.maxIterations);
//
//           this.updatePixel(this.coord2Index(sx, sy), colors[0], colors[1], colors[2]);
//           // this.updatePixel(this.coord2Index(sx, sy), 255, 255, 255, 255); // colors[0], colors[1], colors[2]);
//         }
//       }
//     }
//
//     return new ImageData(Uint8ClampedArray.from(this.pixels), this.width, this.height);
//   }
// }
//
// function getColor(iter: number, maxIterations): number[] {
//   const ratio = iter / maxIterations;
//   let red = 0;
//   let green = 0;
//   let blue = 0;
//
//   if ((ratio >= 0) && (ratio < 0.125)) {
//     red = (ratio / 0.125) * (512) + 0.5;
//     green = 0;
//     blue = 0;
//   }
//
//   if ((ratio >= 0.125) && (ratio < 0.250)) {
//     red = 255;
//     green = (((ratio - 0.125) / 0.125) * (512) + 0.5);
//     blue = 0;
//   }
//
//   if ((ratio >= 0.250) && (ratio < 0.375)) {
//     red = ((1.0 - ((ratio - 0.250) / 0.125)) * (512) + 0.5);
//     green = 255;
//     blue = 0;
//   }
//
//   if ((ratio >= 0.375) && (ratio < 0.500)) {
//     red = 0;
//     green = 255;
//     blue = (((ratio - 0.375) / 0.125) * (512) + 0.5);
//   }
//
//   if ((ratio >= 0.500) && (ratio < 0.625)) {
//     red = 0;
//     green = ((1.0 - ((ratio - 0.500) / 0.125)) * (512) + 0.5);
//     blue = 255;
//   }
//
//   if ((ratio >= 0.625) && (ratio < 0.750)) {
//     red = (((ratio - 0.625) / 0.125) * (512) + 0.5);
//     green = 0;
//     blue = 255;
//   }
//
//   if ((ratio >= 0.750) && (ratio < 0.875)) {
//     red = 255;
//     green = (((ratio - 0.750) / 0.125) * (512) + 0.5);
//     blue = 255;
//   }
//
//   if ((ratio >= 0.875) && (ratio <= 1.000)) {
//     red = ((1.0 - ((ratio - 0.875) / 0.125)) * (512) + 0.5);
//     green = ((1.0 - ((ratio - 0.875) / 0.125)) * (512) + 0.5);
//     blue = ((1.0 - ((ratio - 0.875) / 0.125)) * (512) + 0.5);
//   }
//
//   return [ toInteger(red), toInteger(green), toInteger(blue)];
// }
//
// function toInteger(num: number): number {
//   return Math[num < 0 ? 'ceil' : 'floor'](num);
// }
//
