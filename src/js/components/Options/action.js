import { getNewsData } from "../../api/ajax.js";
import DOMHelper from "../../utils/DOMHelper.js";
import { 
    prepareCardsContainer,
    resetNewsContainer,
    setOptionSelected 
} from "../../ui-functions/ui-functions.js";
import { getPartialIds } from "../../api/ajax.js";

export const selectOption = (e, option) => {
    return new Promise((resolve, reject) => {
        if (selectOption.debouncedAction) {
            selectOption.debouncedAction.cancel();
        }
        resetNewsContainer();
        setOptionSelected(e);
        prepareCardsContainer(10);
        selectOption.debouncedAction = _.debounce(async () => {
            try {
                DOMHelper.resetIndex();
                DOMHelper.setType(option);
                const {type, index} = DOMHelper;
                const partialIds = await getPartialIds(type, index);
                if (!partialIds) {
                    return;
                }
                const news = await getNewsData(partialIds);
                if (!news) {
                    return;
                }
                resolve(news);
            } catch (error) {
                reject(error);
            }
        }, 800);
        selectOption.debouncedAction();
    });
};