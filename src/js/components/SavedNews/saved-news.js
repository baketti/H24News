export const savedNewsElement = (id,text,url) => {
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
            <span>${text}</span>
            <button type="button" href="${url}" class="btn btn-primary btn-floating"
                style="background:#151320;" data-mdb-ripple-init data-mdb-tooltip-init title="Read more"> 
                <i class="fas fa-arrow-up-right-from-square"></i>
            </button>
        </li>`
    };