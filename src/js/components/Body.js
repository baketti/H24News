import { BackToTopButton } from "./BackToTopButton/back-to-top-button";
import { Navbar } from "./Navbar/navbar";
//HEADER - OPTIONS-CONTAINER - CONTAINER - FOOTER
export const HTMLBody = `
    <section class="header">
        ${Navbar}
    </section>
    <!-- OPTIONS CONTAINER -->
    <section class="options-container"></section>
    <!-- BACK TO TOP BUTTON -->
    ${BackToTopButton}
    <!-- NEWS CARDS CONTAINER -->
    <section class="container fade-in"></section>
    <!-- FOOTER -->
    <section class="footer"></section>`;