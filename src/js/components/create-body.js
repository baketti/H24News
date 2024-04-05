import { Sidebar } from "./Sidebar/sidebar";
import { CommentsDialog } from "./Comments/comments-dialog";
import { InfoDialog } from "./InfoDialog/info-dialog";
import { HTMLBody } from "./Body";

export const createHTMLBody = () => {
    $(document.body).html(`
        ${HTMLBody}
        ${CommentsDialog}
        ${Sidebar}
        ${InfoDialog}`
    );
};