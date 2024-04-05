import DOMHelper from "../utils/DOMHelper.js";
import { getCurrentNewsDataFromDOM,getCurrentNewsData } from "../utils/functions.js";
import { showComments, renderSavedNews, removeSavedNews } from '../components/Cards/actions.js';
import { Spinner } from "../components/Spinner/spinner.js";

export function handleContainerIconsClick () {
    const container = $(".container");
    container.on("click", async(e) => {
        /* This event is handled by delegation.            
        This line of code is checking if the clicked element is not one of the card's buttons.*/
        if(!e.target.closest(".news-comment-icon") && !e.target.closest(".news-read-more-container")) return;
            const target = $(e.target);
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
            else if (target.hasClass("fa-comments") || target.closest(".show-comments")){
                const commentsContainer = $('.comments-container');
                commentsContainer.html(Spinner);
                const data = await getCurrentNewsData(e);
                showComments(e,data);   
            }
            else if (target.hasClass("fa-arrow-up-right-from-square")){
                const url = target.closest('button').attr("href")
                window.open(url);
            }
        }
    );
}