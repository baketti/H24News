import DOMHelper from "../utils/DOMHelper.js";
import { getStoryDataSmart } from "../utils/functions.js";
import { LoadMoreButton } from '../components/LoadMoreButton/load-more-button.js';
import { checkForSavedNews,injectDataIntoCard } from "./ui-functions.js";

/* This Function takes an array of news and does the following:
1) Gets news data in a smart way;
2) Injects data into news-card for each array's news passed in;
3) Checks for saved news to update UI;
4) Appends load more button to the bottom of the page; */
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