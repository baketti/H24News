class DOMHelper {
  static type = 'new';//news option type "new" at start
  static index = 0; //news index, 0 at start
  static kids = [];//comments ids of the current news
  static commentsIndex = 0;//current comments index shown
  static savedNews = [];//read-later and/or liked news saved on sidebar
/**
 * @param {string} type 
 */
  static setType(type) {
    DOMHelper.type = type;
  }
/**
 * @param {number} index 
 */
  static setIndex() {
    DOMHelper.index += 10;
  }

  static resetIndex() {
    DOMHelper.index = 0;
  }
/**
 * @param {{[key:string]:any}} news
 */
  static setSavedNews(news) {
    this.savedNews = [...this.savedNews, news];
  }

  static getSavedNews() {
    return this.savedNews;
  }

  static deleteSavedNewsByIdAndType(id, type) {
    this.savedNews = this.savedNews.filter(
      (news) => news.id !== id || news.type !== type);
    return this.savedNews;  
  }
}

export default DOMHelper;