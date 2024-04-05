import { formatTimeSincePublication } from "../../utils/functions";

export const CommentElementSkin = `
    <div class="comment_card">
      <h3 class="comment_title"></h3>
      <p></p>
      <div class="comment_footer">
        <div></div>
        <div></div>  
        <div class="show-replies"></div>
      </div>
    </div>
    `;

export const Comment = ({...props}) => {
    const comment = $('<div></div>');
    comment.addClass('comment_card');
    comment.html(CommentElement({...props}));
    return comment;
};

export const CommentElement = ({...props}) => {
  return (`
    <div class="comment_header">
      <div class="user-name">
        <i class="fas fa-circle-user"></i><span> ${props.by}</span>
      </div>
      <div class="shared-at">
        <i class="far fa-clock"></i> ${formatTimeSincePublication(props.time)}
      </div> 
    </div>
    <p>${props.text}</p>
    <div class="comment_footer">
      <div class="show-replies">
        <button type="button" class="btn btn-primary btn-floating" 
          style="background:#151320;" data-mdb-ripple-init>
          <i class="far fa-comments"></i> 
          <span class="badge rounded-pill badge-notification bg-danger" style="position:absolute;right:0;">
              ${props.kids.length}
          </span>
        </button>
      </div>
    </div>
  `);
}