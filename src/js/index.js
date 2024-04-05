import '../../src/css/style.css';
import { init } from './controllers/init';
import { Modal, initMDB, Ripple, Tooltip, Tab } from "mdb-ui-kit";
import { injectDataIntoNewsCards } from './ui-functions/ui-functions';

function App() {
    document.addEventListener('DOMContentLoaded', function () {
        init();
        initMDB({Modal, Ripple, Tooltip, Tab});
        injectDataIntoNewsCards();
    });
};

export default App;