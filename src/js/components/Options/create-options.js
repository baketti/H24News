import { selectOption } from "./action";
import { generateUI } from "../../ui-functions/ui-generator";

const options = [
        {
            label: "Latest",
            value: "new"
        },
        {
            label: "Job",
            value: "job"
        },
        {
            label: "Show",
            value: "show"
        },
        {
            label: "Ask",
            value: "ask"
        },
        {
            label: "Best",
            value: "best"
        },
        {
            label: "Top",
            value: "top"
        },
];

const createOptions = () => {
    const optionsContainer = $(".options-container");
    for (let i of options) {
        const option = $("<button></button>");
        option.attr("data-category", i.value);
        option.attr("data-mdb-ripple-init", "");
        option.attr("type", "button");
        option.css("background-color", "#1c1b29");  
        option.addClass(`btn btn-primary btn-floating option`);
        i.label === "Latest" ? option.addClass("active") : null;
        option.text(i.label.toUpperCase());
        option.on("click", (e) => selectOption(e, i.value)
            .then(news => generateUI(news)));
        optionsContainer.append(option);
    }
};
    
export { createOptions };