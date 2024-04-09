import '../../src/css/style.css';
import { init } from './controllers/init';
import { Modal, initMDB, Ripple, Tooltip, Tab } from "mdb-ui-kit";
import { injectDataIntoNewsCards } from './ui-functions/ui-functions';

/* This function is triggered when the application starts running */
function App() {
    document.addEventListener('DOMContentLoaded', function () {
        //when the DOM is on, before all resources are loaded
        init();
        initMDB({Modal, Ripple, Tooltip, Tab});
        injectDataIntoNewsCards();
    });
};

export default App;