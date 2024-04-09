import { 
    showBackToTopButton,
    toggleSidebar, 
    loadAndRenderComments,
    resetCommentsDialog
} from "../ui-functions/ui-functions";
import { handleContainerIconsClick } from "./call-to-actions";
import DOMHelper from "../utils/DOMHelper";

//Function to attach event handlers at the start
export function initEventHandlers() {
    handleNewsScroll();
    handleContainerIconsClick();
    handleSideBarIconClick();
    handleSavedItemsClick();
    handleCommentsDialogScroll();
    handleCommentsDialogLinkClick();
    handleCommentsDialogResetOnClose();
}

function handleNewsScroll() {
    $(window).on("scroll", showBackToTopButton);
}

//Function to handle sidebar open and close 
function handleSideBarIconClick() {
    const openSidebarBtn = $(".sidebar-btn");
    const closeSidebarBtn = $(".sidebar-close");
    openSidebarBtn.on("click", toggleSidebar);
    closeSidebarBtn.on("click", toggleSidebar);
}   

function handleSavedItemsClick () {
    $(".saved-items").on("click", (e) => { 
        if(!e.target.closest("button")) return;
        const url = $(e.target).closest('.btn').attr('href');
        window.open(url);
    });
}

function handleCommentsDialogLinkClick() {
    //header of comments dialog
    const modalHeader = $("#exampleModal .modal-header");
    modalHeader.on("click", (e) => {
        if(!e.target.closest(".read-more-btn")) return;
        const url = $(e.target).closest('.read-more-btn').attr('href');
        window.open(url);
    });
}

//Function to load more comments when user scrolls to the bottom of the comments dialog
function handleCommentsDialogScroll() {
    const modalBody = $(".modal-body");
    const commentsContainer = $('.comments-container');
    modalBody.on("scroll", async() => {
        if (modalBody.scrollTop() + modalBody.innerHeight() >= modalBody[0].scrollHeight - 1) {
            const { kids } = DOMHelper;
            const currentCommentRendered = commentsContainer.children().length;
            //if all comments are rendered or there are no comments, return
            if(currentCommentRendered >= kids.length || currentCommentRendered === 0) {
                return;
            }
            loadAndRenderComments(kids,commentsContainer)
        }
    });
}

function handleCommentsDialogResetOnClose() {
    //vanilla js because jquery is incompatible with this mdb event
    const modalEl = document.getElementById('exampleModal')
    modalEl.addEventListener('hidden.mdb.modal', () => {
        resetCommentsDialog();
    })
}