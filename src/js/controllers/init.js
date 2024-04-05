import { createHTMLBody } from '../components/create-body';
import { createOptions } from '../components/Options/create-options';
import { initEventHandlers } from './event-handlers';

const init = () => {
  createHTMLBody();
  createOptions();
  initEventHandlers();
};

export { init };