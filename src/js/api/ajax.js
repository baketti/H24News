import axios from "axios";
import _ from "lodash";
import { BASE_URL, rest_URL, ITEM_URL } from "./endpoints";
import { showAjaxNetworkError } from "../ui-functions/ui-functions";

const AxiosGETids = axios.create({
    baseURL: BASE_URL,
})

const getAllNewsIds = _.memoize(async (type) => {
    try{
        const { data } = await AxiosGETids.get(type + rest_URL);
        return data;
    }catch (error){
        showAjaxNetworkError();
        return false;
    }
});

AxiosGETids.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
});

AxiosGETids.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);
});

const getPartialIds = async(type,startIndex) => {
    const allIds = await getAllNewsIds(type);
    if(!allIds) return;
    const totalItemsAmount = allIds.length;
    if (startIndex >= totalItemsAmount) {
        return null;
    };
    let n = 10;
    if(totalItemsAmount - startIndex < n) {
        n = totalItemsAmount - startIndex;
    }
    const partialIds = _.take(_.slice(allIds, startIndex),n);
    return partialIds;
};

const getNewsData = _.memoize(async(partialIds) => {
    try {
        const newsData = partialIds.map(async(id) => { 
            return await getSingleItemData(id);
        });
        return Promise.all(newsData);
    } catch(e) {
        showAjaxNetworkError();
        return false;
    }
}, (query, index) => `${query}-${index}`);

const AxiosGETItem = axios.create({
    baseURL:ITEM_URL,
});

const getSingleItemData = _.memoize(async(itemId) => {
    try{
        const {data} = await AxiosGETItem.get(`${itemId}.json`);
        return data;
    }catch(e){
        return Promise.reject(e);
    } 
});

AxiosGETItem.interceptors.request.use((request) => {
        return request;
    },(error) => {
        return Promise.reject(error);
    })

AxiosGETItem.interceptors.response.use((response)=>{
        return response;
    },(error)=>{
        return Promise.reject(error);
    })

function getCommentsData(...commentsIds){
    try {
        const comments = commentsIds.map(async (commentId) => {
            return await getSingleItemData(commentId);
        }); 
        return Promise.all(comments);
    }
    catch(e) {
        showAjaxNetworkError()
        return false;
    }
};

const memoizedGetCommentsData = _.memoize((...commentsIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comments = commentsIds.map(async (commentId) => {
                return await getSingleItemData(commentId);
            });
            const result = await Promise.all(comments);
            resolve(result);
        } catch (error) {
            showAjaxNetworkError();
            reject(false);
        }
    });
});

export { 
    getAllNewsIds,
    getNewsData, 
    getSingleItemData, 
    getCommentsData, 
    memoizedGetCommentsData,
    getPartialIds 
};