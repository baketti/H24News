import { CardElement } from "./card";

export default function () {
    const container = $(".container");
    container.addClass("active");
    const card = $("<div></div>");
    card.addClass("is-loading news-card");
    card.html(CardElement);
    container.append(card);
};