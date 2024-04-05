export const InfoDialog = `        
<!-- Button trigger Info modal -->
<button
    type="button"
    class="btn btn-primary"
    id="not-show"
    data-mdb-ripple-init
    data-mdb-modal-init
    data-mdb-target="#InfoModal"
>
    Launch demo modal
</button>
<!-- Modal -->
<div
    class="modal fade"
    id="InfoModal"
    tabindex="-1"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="info-text-container">
                <h1>H24News   <i class="fas fa-circle-info"></i></h1>
                <p>Explore the world of news with H24News, your gateway to the latest updates from the Hacker News API service.</p>
                <ul>
                    <li>Discover news across various categories.</li>
                    <li>Dive deeper into each story with a simple click.</li>
                    <li>Stay informed by loading more news at the bottom of the page.</li>
                    <li>Read all comments related to each news article.</li>
                    <li>Bookmark articles to read later at your convenience.</li>
                    <li>Show appreciation for your favorite stories by liking them.</li>
                    <li>Keep track of your saved and liked articles in the sidebar.</li>
                    <li>Remember, refreshing the page will clear your saved articles.</li>
                    <li>In case of a network outage, restore your connection and refresh the page to resume.</li>
                </ul>
            </div>
            <button type="button" id="closeInfoModal" class="btn btn-primary btn-floating" data-mdb-ripple-init data-mdb-dismiss="modal">Close</button>
        </div>
    </div>
</div>`;