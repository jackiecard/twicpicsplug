import './main.css';
import EventEmitter from './utils/EventEmitter';
import PointsEditor from './components/PointsEditor';
import ImageOutput from './components/ImageOutput';
import TwicPicsEditor from './components/TwicPicsEditor';

const twicPicsEditorElem = document.getElementById('twicpics-editor');
const initialWidth = Number(twicPicsEditorElem.getAttribute('data-original-width'));
const initialHeight = Number(twicPicsEditorElem.getAttribute('data-original-height'));
const canvasWidth = 600;
const initialPoint = { id: 1, x: 140, y: 227 };

const eventBus = new EventEmitter();
const twicPicsEditor = new TwicPicsEditor(eventBus, twicPicsEditorElem, canvasWidth);
const pointsEditor = new PointsEditor([initialPoint], eventBus);
const imageOutput = 
  new ImageOutput(
    eventBus, 
    initialPoint, 
    canvasWidth,
    initialWidth, 
    initialHeight
  );

