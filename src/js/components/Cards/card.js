import { formatTimeSincePublication } from "../../utils/functions"

const CardElement = `
    <div class="news-content">
        <div class="news-header">
            <div class="user-name"></div>
            <div class="shared-at"></div>
        </div>
        <div class="news-title"></div>
        <div class="news-description"></div>
    </div>
    `;

const Card = () => {
    const card = $("<div></div>");
    card.addClass("news-card");
    card.html(CardElement);
    return card;
}

const CardWithData = (...props) => {
    const [ by,time,title,kids,score,url ] = props;
    return `
        <div class="news-content">
            <div class="news-header">
                <div class="user-name">
                    <i class="fas fa-circle-user"></i><span> ${by}</span>
                </div>
                <div class="shared-at">
                    <i class="far fa-clock"></i> ${formatTimeSincePublication(time)}
                </div>
            </div>
            <div class="news-title">
                ${title}<br>
            </div>
            <div class="news-description">
                <div class="news-comment-icon" >
                    <i class="fas fa-thumbs-up">  ${score}</i>
                    <span 
                    data-mdb-ripple-init
                    data-mdb-modal-init
                    data-mdb-target="#exampleModal"
                    class="show-comments"
                    >
                        <button type="button" class="btn btn-primary btn-floating" 
                            style="background:#151320;" data-mdb-ripple-init>
                            <i class="far fa-comments"></i> 
                            <span class="badge rounded-pill badge-notification bg-danger"           style="position:absolute;right:0;">
                                ${kids.length}
                            </span>
                        </button>
                    </span>
                    <i class="fas fa-bookmark"></i>
                </div>
                <div class="news-read-more-container">
                    <button type="button" href="${url}" class="btn btn-primary btn-floating"
                    style="background:#151320;" data-mdb-ripple-init data-mdb-tooltip-init title="Read more"> 
                        <i class="fas fa-arrow-up-right-from-square"></i>
                    </button>
                </div>
            </div>
        </div>`
    }

export { CardElement, Card, CardWithData }