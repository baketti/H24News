import DOMHelper from "../../utils/DOMHelper";
import { getNewsData } from "../../api/ajax";
import { generateUI } from "../../ui-functions/ui-generator";
import { getPartialIds } from "../../api/ajax";
import { prepareCardsContainer } from "../../ui-functions/ui-functions";

async function loadMoreNews (){
    DOMHelper.setIndex();
    const {type,index} = DOMHelper;
    const partialIds = await getPartialIds(type,index); 
    if(!partialIds) {
        return;
    }
    prepareCardsContainer(partialIds.length)
    const news = await getNewsData(partialIds);
    if(!news) {
        return;
    }
    generateUI(news);
}

export { loadMoreNews };