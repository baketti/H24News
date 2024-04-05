import { formatTimeSincePublication } from "../../utils/functions";

export const CommentsDialog = `
        <!-- Button trigger modal -->
        <button
            type="button"
            class="btn btn-primary"
            id="not-show"
            data-mdb-ripple-init
            data-mdb-modal-init
            data-mdb-target="#exampleModal"
        >
            Launch demo modal
        </button>
        <!-- Modal -->
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title" id="exampleModalLabel"></div>
                        <p></p>
                    </div>
                    <div class="modal-body">
                        <div class="comments-container"></div>
                    </div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>`;

export const CommentsDialogHeader = (by,time,title,url) => `
    <div class="modal-title" id="exampleModalLabel">
        <h5 class="user-name">
            <i class="fas fa-circle-user"></i><span> ${by}</span>
        </h5>
        <div class="shared-at">
            <i class="far fa-clock"></i> ${formatTimeSincePublication(time)}
        </div>
        <button
            type="button"
            class="btn btn-primary btn-floating"
            data-mdb-ripple-init
            data-mdb-dismiss="modal"
            aria-label="Close"
            style="background:#151320;">
            <i class="fas fa-xmark" style="color: white"></i>
        </button>
    </div>
    <p>${title}  
    <button type="button" href="${url}" 
        class="btn btn-primary btn-floating read-more-btn"   
        style="background:#151320;" data-mdb-ripple-init data-mdb-tooltip-init title="Read more"> 
        <i class="fas fa-arrow-up-right-from-square"></i>
    </button>
    </p>`;
