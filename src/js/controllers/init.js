import { createHTMLBody } from '../components/create-body';
import { createOptions } from '../components/Options/create-options';
import { initEventHandlers } from './event-handlers';

//Function to initialize the entire body and attach all event handlers
const init = () => {
  createHTMLBody();
  createOptions();
  initEventHandlers();
};

export { init };