
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



function updateForm(e) {
    // Display form
    openModal();
    // Autopopulate name with current value
    // Currently no autopopulating for other items
    const nameIn = document.getElementById("updateName");
    // const descIn = document.getElementById("updateDesc");
    // const imgIn = document.getElementById("updateImg");
    
    const nameStr = e.target.value.replace(' ', '-');
    // const card = document.querySelector(`div.card.${nameStr}`);
    
    nameIn.value = e.target.value;

}

// Update company by manually creating XHR rather than doing PUT through the form
// Forms only allow GET and POST, so need this method
function updateCompany() {
    // Input references
    const nameIn = document.getElementById("updateName");
    const descIn = document.getElementById("updateDesc");
    const imgIn = document.getElementById("updateImg");

    // Create XHR
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 200) {
            // Reload page
            getCompanies();
            closeModal();
        }
    }
    // Calls the controller to modify the database
    xhr.open('PUT', `/companies/?name=${nameIn.value}&desc=${descIn.value}&img=${imgIn.value}`);
    xhr.send();
}

function loadCompany(e) {
    // e.target.value
    const xhr = new XMLHttpRequest();

    // Display warehouse information
    xhr.onload = function() {
        // References to HTML elements
        const company = JSON.parse(xhr.response);
        const warehouseInfo = document.getElementById('table-header');
        const whTable = document.getElementById('table-body');
        
        // Clear warehouseInfo + table before appending
        warehouseInfo.innerHTML = "";
        whTable.innerHTML = "";

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

        // Table work
        let index = 1; // Starts at 1 for the table
        for(item of warehouse.items){
            let row = document.createElement('tr');
            let itemId = document.createElement('th');
            let itemName = document.createElement('td');
            let count = document.createElement('td');
            let price = document.createElement('td');
            let size = document.createElement('td'); 

            itemId.innerHTML = index++;
            itemName.innerHTML = item.item_name;
            count.innerHTML = item.count;
            price.innerHTML = item.price || "n/a";
            size.innerHTML = item.item_size;
            row.appendChild(itemId);
            row.appendChild(itemName);
            row.appendChild(count);
            row.appendChild(price);
            row.appendChild(size);
            whTable.appendChild(row);
            // Should be able to just for loop through this
            // But using a for loop might not enforce ordering on unordered data
            // Also doesn't enforce alternatives unless we specifically check the property name
        }
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
        // Clear companyContainer before population
        companyContainer.innerHTML = "";
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

// Changing BS Modal with vanilla JS
function openModal() {
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("update-modal").style.display = "block";
    document.getElementById("update-modal").classList.add("show");
}
function closeModal() {
    console.log("Closing modal");
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("update-modal").style.display = "none";
    document.getElementById("update-modal").classList.remove("show");
}

window.addEventListener('DOMContentLoaded', () => {
    getCompanies();
})
