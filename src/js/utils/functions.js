import { getSingleItemData } from "../api/ajax";
import DOMHelper from "./DOMHelper.js";

export function getStoryDataSmart(story) {
  const defaultStory = {
    by: 'Anonymous',
    descendants: 0,
    id: null,
    kids: [],
    score: 0,
    time: "",
    title: '',
    type: null,
    url: null,
  };
  const extractedStory = _.pick(story, Object.keys(defaultStory));
  const smartStory = { ...defaultStory, ...extractedStory };
  return smartStory;
}

export function getCommentDataSmart(comment) {
  const defaultComment = {
    by: 'Anonymous',
    id: null,
    kids: [],
    time: null,
    type: null,
    text: '',
  };
  const extractedComment = _.pick(comment, Object.keys(defaultComment));
  const completeComment = { ...defaultComment, ...extractedComment };
  return completeComment;
}

export function getPartialCommentsIds(...kids){
  const totalCommentsAmount = kids.length;
  if(totalCommentsAmount < 10) return kids;
  const startIndex = DOMHelper.commentsIndex;
  if(startIndex >= totalCommentsAmount) return null;
  let n = 10;
  if(totalCommentsAmount - startIndex < n) {
      n = totalCommentsAmount - startIndex;
  }
  const partialCommentsIds = _.take((_.slice(kids,startIndex)),n);
  DOMHelper.commentsIndex+=10; 
  return partialCommentsIds;
}

export async function getCurrentNewsData(e) {
  const id = $(e.target.closest(".news-card")).attr("data-id");
  const data = await getSingleItemData(id);
  if(!data){
      return;
  }
  return data;
}

export function getCurrentNewsDataFromDOM(target) {
  const currentCard = target.closest(".news-card");
  const id = currentCard.attr("data-id");
  const text = currentCard.find(".news-title").text();
  const url = currentCard.find('.news-read-more-container button').attr('href');
  return { id, text, url };
}

export function formatTimeSincePublication(timestamp) {
  const now = new Date();
  const publicationDate = new Date(timestamp * 1000); 
  const elapsedMilliseconds = now - publicationDate;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedDays / 365);
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  } else if (elapsedMinutes < 60) {
    const suffix = elapsedMinutes === 1 ? '' : 's';
    return `${elapsedMinutes} minute${suffix} ago`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedDays === 1) {
    return 'Yesterday';
  } else if (elapsedDays < 30) {
    return `${elapsedDays} days ago`;
  } else if (elapsedMonths === 1) {
    return 'Last month';
  } else if (elapsedMonths < 12) {
    return `${elapsedMonths} months ago`;
  } else if (elapsedYears === 1) {
    return 'Last year';
  } else {
    if(elapsedYears == 54) return "";
    return `${elapsedYears} years ago`;
  }
}