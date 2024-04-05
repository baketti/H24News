import { loadMoreNews } from './action';

export const Load_More_Button = `
    <button 
        type="button" 
        id="load-more"
        class="btn btn-primary btn-floating" 
        data-mdb-ripple-init
    >
        Load more
    </button>`;

 const LoadMoreButton = () => {
    const footer = $(".footer");    
    //If there is load-more-button yet, do nothing
    if (footer.find('#load-more').length > 0) return; 
    //Else => append this button to footer
    footer.append(Load_More_Button);
    //select this
    const loadMoreBtn = $("#load-more");
    //assign click event
    loadMoreBtn.on("click", loadMoreNews);
};

export { LoadMoreButton }