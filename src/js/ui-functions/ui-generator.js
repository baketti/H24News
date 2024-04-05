import DOMHelper from "../utils/DOMHelper.js";
import { getStoryDataSmart } from "../utils/functions.js";
import { LoadMoreButton } from '../components/LoadMoreButton/load-more-button.js';
import { checkForSavedNews,injectDataIntoCard } from "./ui-functions.js";

const generateUI = (news) => {
    if(!news) return;
    const cards = $(".news-card");
    const startIndex = DOMHelper.index;
    news.forEach((news,i) => {
        i = i + startIndex;
        const {
            id,
            by,
            time,
            title,
            kids,
            score,
            url
        } = getStoryDataSmart(news);
        const card = $(cards[i]);
        injectDataIntoCard(card,id,by,time,title,kids,score,url);
        checkForSavedNews(id);
    });
    LoadMoreButton();
};

export { generateUI };