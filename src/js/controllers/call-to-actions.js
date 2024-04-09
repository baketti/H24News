import DOMHelper from "../utils/DOMHelper.js";
import { getCurrentNewsDataFromDOM,getCurrentNewsData } from "../utils/functions.js";
import { showComments, renderSavedNews, removeSavedNews } from '../components/Cards/actions.js';
import { Spinner } from "../components/Spinner/spinner.js";

export function handleContainerIconsClick () {
    /* This event is handled by delegation. */
    const container = $(".container");
    //click from the container of all news
    container.on("click", async(e) => {
        console.log(e.target.classList);
        if(!e.target.closest(".news-comment-icon") && !e.target.closest(".news-read-more-container")) return;
        //if and only if the target is one of the card's buttons, the event is handled
            const target = $(e.target);
            //target === read later icon
            if(target.hasClass("fa-bookmark")){
                target.toggleClass("selected-icon"); 
                const {id, text, url} = getCurrentNewsDataFromDOM(target);
                const type = "bookmark";
                if(target.hasClass("selected-icon")){
                    DOMHelper.setSavedNews({ id, type });
                    renderSavedNews({ id, text, url, type });
                    return;
                };
                DOMHelper.deleteSavedNewsByIdAndType(id,type);
                removeSavedNews(id,type);
                return;
            }
            //target === like icon
            else if(target.hasClass("fa-thumbs-up")){
                target.toggleClass("selected-icon");                 
                const scoreIcon = target;
                let score = parseInt(scoreIcon.text());
                const {id, text, url} = getCurrentNewsDataFromDOM(target);
                const type = "like";
                if(scoreIcon.hasClass("selected-icon")){
                    score += 1;
                    scoreIcon.text(" "+score);
                    DOMHelper.setSavedNews({ id, type });
                    renderSavedNews({ id, text, url, type });
                    return;
                }; 
                score -= 1;
                scoreIcon.text(" "+score);
                DOMHelper.deleteSavedNewsByIdAndType(id, type);
                removeSavedNews(id,type);
                return;
            }
            //target === read more button
            else if (target.hasClass("fa-arrow-up-right-from-square")){
                const url = target.closest('button').attr("href")
                window.open(url);
                return;
            }
            //target === comments button
            //double check because comments icon is wrapped in un a button
            else if (target.hasClass("fa-comments") || target.closest(".show-comments")){
                const commentsContainer = $('.comments-container');
                commentsContainer.html(Spinner);
                const data = await getCurrentNewsData(e);
                showComments(e,data);   
                return;
            }
        }
    );
}