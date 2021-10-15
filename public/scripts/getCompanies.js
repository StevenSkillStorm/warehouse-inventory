function deleteCompany(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if(xhr.status === 200) {
            // Removes the HTML entry for this company
            e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    // Calls the controller to modify the database
    xhr.open('DELETE', `/companies/${e.target.value}`);
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
            for(company of companies) {
                // Create a card for each company
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

                // Populate elements
                cardImg.src = company.img;
                cardTitle.innerHTML = company.name;
                cardText.innerHTML = company.desc + `<br>Warehouse(s): ${company.warehouses.length}`;
                
                // Buttons get value of company name to reference
                cardLoad.value = company.name;
                cardEdit.value = company.name;
                cardDelete.value = company.name;
                // TODO
                cardEdit.onclick = "";
                cardLoad.onclick = ""; // Load the warehouse(s) associated
                cardDelete.onclick = deleteCompany;
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