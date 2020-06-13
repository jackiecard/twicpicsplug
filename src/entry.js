import './main.css';
import EventEmitter from './utils/EventEmitter';
import PointsEditor from './components/PointsEditor';
import Sidebar from './components/Sidebar';

const eventBus = new EventEmitter();
const pointsEditor = new PointsEditor(eventBus);
const sidebar = new Sidebar(eventBus);
const points = [
  { id: 1, x: 140, y: 227 }
]

pointsEditor.init('canvas', points);
pointsEditor.bindPointerEvents();
sidebar.init('sidebar');

let originalWidth = 2080;
let outputHeight = 1500;

// setTimeout(() => {
//   const originalImage = document.getElementById('original-image')
//   originalWidth = originalImage.naturalWidth 
//   outputHeight = originalImage.naturalHeight
//   console.log(originalImage, originalWidth, outputHeight)
// }, 1500);

const outputImage = document.getElementById('output-image')
outputImage.setAttribute('data-src-focus', '20px50p')
outputImage.setAttribute('data-src-transform', 'crop=400x300')

eventBus.on('currentPointUpdated', (data) => {
  console.log(data)
  const scale = (600 * 100) / originalWidth;
  console.log(scale)
  const xpercen = (data.x * 100) / 600;
  const ypercen = (data.y * 100) / 433;
  console.log(xpercen, ypercen)
  outputImage.setAttribute('data-src-focus', `${parseInt(xpercen)}px${parseInt(ypercen)}p`)
});