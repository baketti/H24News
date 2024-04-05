export const Sidebar = `
        <section class="sidebar-container">
            <div class="sidebar-header">
                <h5>YOUR NEWS</h5>
                <button
                    type="button"
                    class="btn btn-primary btn-floating sidebar-close"
                    data-mdb-ripple-init
                    style="background:#151320;">
                    <i class="fas fa-xmark" style="color: white"></i>
                </button>
            </div>
            <ul class="nav nav-tabs mb-3" id="ex-with-icons" role="tablist">
                <li class="nav-item" role="presentation">
                    <a data-mdb-tab-init class="nav-link active" id="ex-with-icons-tab-1" href="#read-later-tab" role="tab"
                    aria-controls="read-later-tab" aria-selected="true"><i class="fas fa-bookmark fa-fw"></i>Read later</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a data-mdb-tab-init class="nav-link" id="ex-with-icons-tab-2" href="#like-tab" role="tab"
                    aria-controls="like-tab" aria-selected="false"><i class="fas fa-thumbs-up fa-fw"></i>Likes</a>
                </li>
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex-with-icons-content">
                <div class="tab-pane fade show active" id="read-later-tab" role="tabpanel" aria-labelledby="read-later-tab">
                    <ul class="list-group list-group-light saved-items bookmark">
                      <h5>No saved news available</h5>
                    </ul>
                </div>
                <div class="tab-pane fade" id="like-tab" role="tabpanel" aria-labelledby="like-tab">
                    <ul class="list-group list-group-light saved-items like">
                      <h5>No saved news available</h5>
                    </ul>
                </div>
            </div>
            <!-- Tabs content -->
        </section>`;