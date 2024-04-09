import { getSingleItemData } from "../api/ajax";
import DOMHelper from "./DOMHelper.js";

/* This Function takes a single news obj and returns the same obj in a smart way; 
To ensure that news data obj has all properties needed.*/
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
  /* 
  1)extracts only the keys that are present in the defaultStory object;
  2)the keys are equal but the story object couldn't have all of them;
  3)if the story object has not all the keys, the missing ones are set to the default values; */
  const extractedStory = _.pick(story, Object.keys(defaultStory));
  //the smartStory object is the result of merging the defaultStory with the extractedStory
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

//This Function takes all the list of comments ids and returns an array of 10 or less ids
export function getPartialCommentsIds(...kids){
  const totalCommentsAmount = kids.length;
  //if there are less than 10 comments, return all of them
  if(totalCommentsAmount < 10) return kids;
  const startIndex = DOMHelper.commentsIndex;
  //if all comments are shawn yet, return null
  if(startIndex >= totalCommentsAmount) return null;
  //10 is the standard number of comments to show, so set it as default
  let n = 10;
  //if the remaining comments of the current story are less than 10, set n to the remaining comments amount
  if(totalCommentsAmount - startIndex < n) {
      n = totalCommentsAmount - startIndex;
  }
  //take n comments from the sliced array
  const partialCommentsIds = _.take((_.slice(kids,startIndex)),n);
  //update the current comments index
  DOMHelper.commentsIndex+=10; 
  return partialCommentsIds;
}

//This Function takes the event object and returns the current news data to show on the comments dialog header
export async function getCurrentNewsData(e) {
  //takes news id from the target data-id attribute
  const id = $(e.target.closest(".news-card")).attr("data-id");
  //takes news data from the api
  const data = await getSingleItemData(id);
  if(!data){
      return;
  }
  return data;
}

//This Function takes the target element and returns an object with the id, text and url of the current news to show on the sidebar
export function getCurrentNewsDataFromDOM(target) {
  const currentCard = target.closest(".news-card");
  //Get id,text and url from the current news html
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