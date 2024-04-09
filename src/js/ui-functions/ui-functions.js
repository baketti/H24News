import { memoizedGetCommentsData } from "../api/ajax.js";
import { commentsLoading, renderComments } from "../components/Comments/actions.js";
import DOMHelper from "../utils/DOMHelper.js";
import cardLoading from "../components/Cards/card-loading.js";
import { ErrorContainer } from "../components/Error/error.js";
import { getPartialCommentsIds } from "../utils/functions.js";
import { generateUI } from "./ui-generator.js";
import { getPartialIds, getNewsData } from "../api/ajax.js";
import { CardWithData } from "../components/Cards/card.js";

//Function used only at the start
const injectDataIntoNewsCards = async () => {
    //type === "new" - index === 0
    const { type,index } = DOMHelper;
    prepareCardsContainer(10);
    const partialIds = await getPartialIds(type,index); 
    if(!partialIds) {
        return;
    }
    const news = await getNewsData(partialIds);
    generateUI(news);
  };

/* This function takes => 1)card element to inject data into; 2)id of the related news to set data-id attribute; 
3)props to inject into the card */
function injectDataIntoCard (card,id,...props) {
    if(card.hasClass('is-loading')){
        card.removeClass("is-loading");
    }
    card.attr("data-id", id);
    card.html(CardWithData(...props));
  };

/* Function used on option switch or load more click, to prepare news html skin within their container, based on the number of news(array.length) is passed in as parameter. All cards are in loading style while fetching or when user change category*/
function prepareCardsContainer(length) {
    //if there are cards in loading state yet, return
    if($(".container .is-loading").length > 0) return;
    for(let i=0;i<length;i++){
        cardLoading();
    }
}
/* This Function takes => 1)kids array; 2)comments container Element; 3)a boolean to check if there is spinner, and if yes remove it emptying comments container.*/
async function loadAndRenderComments(commentsIds,container,thereIsSpinner = false) {
    const partialCommentsIds = getPartialCommentsIds(...commentsIds);
    if(!partialCommentsIds) return;
    if(thereIsSpinner){
        container.html("");
    }
    commentsLoading(partialCommentsIds, container);
    const commentsData = await memoizedGetCommentsData(...partialCommentsIds);
    renderComments(commentsData);
}

function resetNewsContainer() {
    $('#load-more').remove();
    const container = $(".container");
    container.html("");
}


function setOptionSelected(e) {//takes the event object
    let options = $(".option");
    for(let opt of options) {
        $(opt).removeClass("active");
    };
    $(e.target).addClass("active");
}

function resetCommentsDialog() {
    const commentsContainer = $('.comments-container');
    commentsContainer.html('');
    const modalHeader = commentsContainer.closest('.modal-content').find('.modal-header');
    modalHeader.html('');
}

//Function used when a news has no comments
const NoCommentsAvailable = (container) => {
    const p = $('<p></p>');
    p.css({
        "text-align": "center",
        "margin": "0 auto"
    });
    p.text("No comments available");
    container.html(p);
}

//Callback that triggers when user scrolls
function showBackToTopButton() {
  const backToTopButton = $('#btn-back-to-top');
  backToTopButton.on("click", backToTop);
  if (window.scrollY > 500) {
    backToTopButton.show();
  } else {
    backToTopButton.hide();
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
} 

function toggleSidebar() {
  const sidebar = $(".sidebar-container");
  sidebar.toggleClass("sidebar-open");
}

function showAjaxNetworkError() {
    const errorContainer = $(document.body).find(".error-container");
    //if error is shawn  yet, return
    if(errorContainer.length > 0) return;
    $(".container").append(ErrorContainer);
};

//Function to check if a news is "saved" and apply the corresponding style when it's rendered
function checkForSavedNews (newsID) {
    DOMHelper.savedNews.forEach((savedNews) => {
        if(savedNews.id == newsID){
            const news = $(`.news-card[data-id="${newsID}"]`);
            switch(savedNews.type){
                case "like": 
                    const like = news.find(".fa-thumbs-up");
                    like.addClass("selected-icon");
                    break;
                case "bookmark":
                    const bookmark = news.find(".fa-bookmark")
                    bookmark.addClass("selected-icon");
                    break;
                }
            }
        }
    )   
}

export { 
    injectDataIntoNewsCards,
    injectDataIntoCard,
    prepareCardsContainer,
    showAjaxNetworkError,
    loadAndRenderComments,
    resetNewsContainer,
    setOptionSelected,
    resetCommentsDialog,
    NoCommentsAvailable,
    checkForSavedNews, 
    showBackToTopButton,
    toggleSidebar,
};