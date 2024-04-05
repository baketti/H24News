import DOMHelper from "../../utils/DOMHelper";
import { CommentsDialogHeader } from "../Comments/comments-dialog";
import { NoCommentsAvailable } from "../../ui-functions/ui-functions";
import { loadAndRenderComments } from "../../ui-functions/ui-functions";
import { savedNewsElement } from "../SavedNews/saved-news";

async function showComments(e,data){
    DOMHelper.commentsIndex = 0;
    DOMHelper.kids = [];
    const commentsContainer = $('.comments-container');
    const modalHeader = commentsContainer.closest('.modal-content').find('.modal-header');
    const { by, title, time, kids, url } = data;
    modalHeader.html(CommentsDialogHeader(by,time,title,url));
    if(!kids) {
        NoCommentsAvailable(commentsContainer)
        return;
    }
    DOMHelper.kids = [...kids];
    const cleanContainer = true;
    loadAndRenderComments(DOMHelper.kids,commentsContainer,cleanContainer);
}

function renderSavedNews(news) {
    const { id,text,url,type } = news;
    const savedNewsLI = $(savedNewsElement(id,text,url));
    let savedNewsUL;
    let ulID;
    switch (type) {
        case 'bookmark':
            savedNewsUL = $('#read-later-tab .saved-items');
            ulID = "#read-later-tab"
            savedNewsUL.append(savedNewsLI);
            break;
        case 'like':
            savedNewsUL = $('#like-tab .saved-items');
            ulID = "#like-tab";
            savedNewsUL.append(savedNewsLI);
            break;
    }
    $(`${ulID} .saved-items h5`).hide();
}

function removeSavedNews(id,type) {
    const savedNewsUL = $(`.saved-items.${type}`);
    if(type === 'like'){
        const savedNewsLI = $(`.saved-items.${type} li[data-id=${id}]`);
        savedNewsLI.remove();
        if(savedNewsUL.children('li').length === 0) {  
            $(`.saved-items.${type} h5`).show();
        }
        return;
    }
    // type === bookmark
    const savedNewsLI = $(`#read-later-tab .saved-items li[data-id=${id}]`);
    savedNewsLI.remove();
    if(savedNewsUL.children('li').length === 0) {  
        $("#read-later-tab .saved-items h5").show();
    }
}

export {showComments, renderSavedNews, removeSavedNews };