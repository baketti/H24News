import { getCommentDataSmart } from "../../utils/functions";
import { getCommentsData } from "../../api/ajax";
import { CommentElementSkin, Comment } from "./comment-element";

function commentsLoading (comments, parentElement, isNested = false) {
  comments.forEach(() => {
    let comment = $('<div></div>');
    comment.addClass('is-loading comment_container');
    if(isNested) {
      comment.addClass('reply');
    }
    comment.html(CommentElementSkin);
    parentElement.append(comment);
  });
}

function renderComments(comments) {
  const commentElements = $('.comment_container.is-loading');
  comments.forEach((comment,i) => {
    const {
      text,
      by,
      time,
      kids
    } = getCommentDataSmart(comment);
    const commentElement = $(commentElements[i]);
    commentElement.removeClass('is-loading');
    commentElement.html(Comment({text, by, time, kids}));
    if(kids.length > 0){
      handleShowRepliesClick(kids,commentElement,comment);
    }
  });
}

async function showNestedComments(kids, parentElement) {
  const isNested = true;
  commentsLoading(kids, parentElement, isNested);
  const parentCommentChidren = $(parentElement).children(".comment_container");
  const nestedComments = await getCommentsData(...kids);
  nestedComments.forEach((comment,i) => {
    const {
      type,
      text,
      by,
      time,
      kids
    } = getCommentDataSmart(comment);
    const commentElement = $(parentCommentChidren[i]);
    commentElement.html(Comment({type, text, by, time, kids}));
    commentElement.addClass("reply");  
    parentElement.append(commentElement);
    commentElement.removeClass('is-loading');
    if(kids.length > 0){
      handleShowRepliesClick(kids,commentElement,comment)
    }
  }); 
}

function handleShowRepliesClick(kids,commentElement,comment) {
  const repliesButton = commentElement.find('.show-replies');
    repliesButton.on('click', () => {
      //get all comment replies and toggle them if they are already shown
      const parentCommentChidren = $(commentElement).children(".reply");
      if(parentCommentChidren.length === kids.length){
        parentCommentChidren.toggle();
        return;
      };
      showNestedComments(comment.kids, commentElement);
    });
  }

export { commentsLoading, renderComments };