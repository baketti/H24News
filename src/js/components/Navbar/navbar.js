export const Navbar = `
    <nav class="navbar dark">
        <div class="container-fluid d-flex justify-content-center">
            <i class="fas fa-bars sidebar-btn"></i>
            <h4>H24News </h4>
            <span 
                data-mdb-ripple-init
                data-mdb-modal-init
                data-mdb-target="#InfoModal"
                class="info-button"
            >
                <button type="button" class="btn btn-primary btn-floating" 
                    style="background:#151320;" data-mdb-ripple-init>
                    <i class="fas fa-info"></i>
                </button>
            </span>
        </div>
    </nav>`;