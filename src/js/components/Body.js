import { BackToTopButton } from "./BackToTopButton/back-to-top-button";
import { Navbar } from "./Navbar/navbar";

export const HTMLBody = `
    <header class="header">
        ${Navbar}
    </header>
    <!-- OPTIONS CONTAINER -->
    <section class="options-container"></section>
    <!-- BACK TO TOP BUTTON -->
    ${BackToTopButton}
    <!-- NEWS CARDS CONTAINER -->
    <main class="container fade-in"></main>
    <!-- FOOTER -->
    <section class="footer"></section>`;