function deleteCompany(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if(xhr.status === 200) {
            // Removes the HTML entry for this company
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    // Calls the controller to modify the database
    xhr.open('DELETE', `/companies/${e.target.value}`);
    xhr.send();
}

function getCompanies() {

    //AJAX
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const companies = JSON.parse(xhr.response);
        const companyContainer = document.getElementById('companies');
        // console.log(companies);
        if(xhr.status === 200) {    // OK
            //
            for(company of companies) {
                const div = document.createElement('div');
                // id, name, desc, banner, warehouses[{
                //      warehouse_id, desc, location, item_count, max_capacity, items [{
                //          item_name, count, price 
                //      }]
                // },{}]
                div.innerText = ``;
                const button = document.createElement('button');
                // Consider using input instead?
                button.value = company.name;
                button.onclick = deleteCompany; // Needs to be implemented
                button.innerText = "DELETE COMPANY";
                div.append(button);
                companyContainer.append(div);
            }
        } else {
            // Error handling
            companyContainer.innerText = `${companies.error}`;
        }
    }
    xhr.open('GET', '/companies'); // routes/api/company.js
    xhr.send();

}

window.addEventListener('DOMContentLoaded', () => {
    getCompanies();
})