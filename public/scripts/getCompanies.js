function confirmDelete(e) {
    let r = confirm("Do you really want to delete " + e.target.value + '?');
    if(r){
        deleteCompany(e);
    }
}

function deleteCompany(e) {
    
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if(xhr.status === 200) {
            // Removes the HTML entry for this company
            console.log(e.target.value);
            const nameStr = e.target.value.replace(' ', '-');
            const ele = document.querySelector(`div.card.${nameStr}`);
            ele.remove();
        }
    }
    // Calls the controller to modify the database
    xhr.open('DELETE', `/companies/${e.target.value}`);
    xhr.send();
}

function updateCompany(e) {
    const xhr = new XMLHttpRequest();
    
    // When the data is loaded, log the result and update local entry
    xhr.onload = function () {

    }
    // Create string with updated data
    
    // PUT with all new data
    xhr.open('PUT', `/companies/${e.target.value}`);
}

function updateForm() {
    // Get references to the form
    
    // 
}

function loadCompany(e) {
    // e.target.value
    const xhr = new XMLHttpRequest();

    // Display warehouse information
    xhr.onload = function() {
        // References to HTML elements
        const company = JSON.parse(xhr.response);
        const warehouseInfo = document.getElementById('table-header');
        // Load the first warehouse for now
        const warehouse = company.warehouses[0];
        // Create elements
        const whName = document.createElement('h2');
        const textDiv = document.createElement('div');
        const whText = document.createElement('p');
        const whDesc = document.createElement('p');

        whName.innerHTML = warehouse.wh_name;
        whText.innerHTML = (warehouse.location || "") + "<br>Max Capacity: " + warehouse.max_capacity;
        whDesc.innerHTML = warehouse.wh_desc || "";
        warehouseInfo.appendChild(whName);
        textDiv.appendChild(whText);
        textDiv.appendChild(whDesc);
        warehouseInfo.appendChild(textDiv);
    }

    xhr.open('GET', `/companies/${e.target.value}`);
    xhr.send();
}

function getCompanies() {

    //AJAX
    const xhr = new XMLHttpRequest();
    // let url = "http://localhost:8088";
    let url = "";
    // When the data is loaded, populate the company cards area
    xhr.onload = function() {
        const companies = JSON.parse(xhr.response);
        const companyContainer = document.getElementById('companies');
        if(xhr.status === 200) {    // OK
            // Create a card for each company
            for(company of companies) {
                const card = document.createElement('div');
                const cardImg = document.createElement('img');
                const cardBody = document.createElement('div');
                // Title and text populate the body
                const cardTitle = document.createElement('h5');
                const cardText = document.createElement('p');
                const cardButtons = document.createElement('div');
                const cardEdit = document.createElement('a');
                const cardLoad = document.createElement('a');
                const cardDelete = document.createElement('a');

                // Add classes
                card.classList.add("card");
                cardImg.classList.add("card-img-top");
                cardBody.classList.add("card-body");
                cardTitle.classList.add("card-title");
                cardText.classList.add("card-text");
                cardButtons.classList.add("btn-container");
                cardEdit.classList.add("btn", "btn-primary");
                cardLoad.classList.add("btn", "btn-primary");
                cardDelete.classList.add("btn", "btn-primary");

                const nameStr = company.name.replace(' ', '-');
                card.classList.add(nameStr);   // Can use card + company name to query for cards
                
                // Populate elements
                cardImg.src = company.img;
                cardTitle.innerHTML = company.name;
                cardText.innerHTML = company.desc + `<br>Warehouse(s): ${company.warehouses.length}`;
                
                // Buttons get value of company name to reference
                cardLoad.value = company.name;
                cardEdit.value = company.name;
                cardDelete.value = company.name;
                // TODO
                cardEdit.onclick = updateForm;
                cardLoad.onclick = loadCompany; // Load the warehouse(s) associated
                cardDelete.onclick = confirmDelete;
                cardEdit.innerHTML = "Edit";
                cardLoad.innerHTML = "Load";
                cardDelete.innerHTML = "Delete";

                // Build card
                cardButtons.appendChild(cardLoad);
                cardButtons.appendChild(cardEdit);
                cardButtons.appendChild(cardDelete);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(cardButtons);
                card.appendChild(cardImg);
                card.appendChild(cardBody);

                // Append card
                companyContainer.append(card);
            }
        } else {
            // Error handling
            companyContainer.innerText = `${companies.error}`;
        }
    }

    xhr.onerror = function() {
        alert('Network Error');
    }
    
    xhr.open('GET', url + '/companies'); // routes/api/company.js
    xhr.send();

}

window.addEventListener('DOMContentLoaded', () => {
    getCompanies();
})