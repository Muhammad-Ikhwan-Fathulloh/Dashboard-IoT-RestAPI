//get url api
let url_api = "https://62fdb5c76e617f88dead907b.mockapi.io/api/aktuator";
//get url api

//get element by id
const contact_name = document.getElementById("contact_name")
const contact_value = document.getElementById("contact_value")
const contact_pin = document.getElementById("contact_pin")
const button = document.getElementById("button-contact")
const button_clear = document.getElementById("button-clear")
//get element by id

//variabel update data
let update = false
let update_id = null
//variabel update data

// Function to fetch data all method GET, POST, PUT, and DELETE
function myFetch(url, type, data) {
    //GET
    if (type === "GET") {
    return fetch(url, {
    method: type,
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
    }
  
    //DELETE
    if (type === "DELETE") {
    return fetch(url, {
    method: type,
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .catch(error => error)
    }
  
    //POST or PUT
    if (type === "POST" | type === "PUT") {
    return fetch(url, {
    method: type,
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) { console.log("HTTP request successful") }
        else { console.log("HTTP request unsuccessful") }
        return res
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
    }
}
// Function to fetch data all method GET, POST, PUT, and DELETE

// Function to fetch data
function fetchContactData() {
    fetch(url_api)
    .then(resp => resp.json())
    .then(data => renderContact(data))
}
// Function to fetch data

// Function to render data to dom
function renderContact(data) {
    for (const value of data) {

    const ContactUL = document.querySelector('#contact-list')

    const ContactLi = document.createElement('li')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const p3 = document.createElement('p')
    const btnStatus = document.createElement('p')
    const btnEdit = document.createElement('p')
    const btnDelete = document.createElement('p')
    const br = document.createElement('br')
    const hr = document.createElement('hr')

    ContactLi.className = 'contact-card'          
    p1.className = 'mb-3'   
    p2.className = 'mb-3' 
    p3.className = 'mb-3' 
    btnStatus.className = 'mb-3'
    btnEdit.className = 'mb-3'                      
    btnDelete.className = 'mb-3'   
    ContactLi.dataset.id = value.id

    p1.innerHTML = "Perangkat "+value.contact_name
    p2.innerHTML = value.contact_value
    p3.innerHTML = "Pin "+value.contact_pin

    if (value.contact_value == "1") {
        btnStatus.innerHTML = `<button class="btn btn-success" id="${value.id}" onClick="ContactStatus(${value.contact_value}, this.id)">ON</button>`
    }
    if (value.contact_value == "0") {
        btnStatus.innerHTML = `<button class="btn btn-danger" id="${value.id}" onClick="ContactStatus(${value.contact_value}, this.id)">OFF</button>`
    }
    
    btnEdit.innerHTML = `<button class="btn btn-primary" id="${value.id}" onClick="ContactEdit(this.id)">Edit</button>`
    btnDelete.innerHTML = `<button class="btn btn-danger" id="${value.id}" onClick="ContactDelete(this.id)">Delete</button>`

    ContactLi.append(p1)
    ContactLi.append(p2)
    ContactLi.append(p3)
    ContactLi.append(btnStatus)
    ContactLi.append(btnEdit)
    ContactLi.append(btnDelete)
    ContactUL.append(ContactLi)
    }
}
// Function to render data to dom

// function to clear data
function clearContact(){
    // refresh value
    document.getElementById("contact_name").value = ""
    document.getElementById("contact_value").value = ""
    document.getElementById("contact_pin").value = ""
}
// function to clear data

// function to show data by id
function ContactEdit(id) {
    fetch(`${url_api}/${id}`)
    .then(resp => resp.json())
    .then(data => DetailContact(data, id))
}

function DetailContact(data, id) {
        document.getElementById("contact_name").value = data.contact_name
        document.getElementById("contact_value").value = data.contact_value
        document.getElementById("contact_pin").value = data.contact_pin

    console.log(data)

    update = true
    update_id = id
}
// function to show data by id

// Button to clear data
button_clear.addEventListener("click", function() {
    clearContact()
    update = false
    update_id = null
})
// Button to clear data

// Button to insert and update data
button.addEventListener("click", function() {
    // validasi input
    if (contact_name.value == "" || contact_value.value == "") {
        // alert failed
        alert("Input contact_name and contact_value")
    }else{
        //condition insert data update == false 
        if(update == false){
            document.getElementById("contact-list").innerHTML = `<ul class="card" id="contact-list"></ul>`
            myFetch(url_api, "POST",{
                contact_name: contact_name.value ,
                contact_value: contact_value.value,
                contact_pin: parseInt(contact_pin.value)
               }).then(res => console.log(res))
               
               clearContact()
               alert("Create contact successful")
               fetchContactData()
        }

        //condition update data update == true 
        else if(update == true){
            document.getElementById("contact-list").innerHTML = `<ul class="card" id="contact-list"></ul>`
            myFetch(`${url_api}/${update_id}`, "PUT",{
                contact_name: contact_name.value ,
                contact_value: contact_value.value,
                contact_pin: parseInt(contact_pin.value)
               } 
            ).then(res => console.log(res))

            clearContact()
            alert("Update contact successful")
            fetchContactData()
        } 
    }       
})
// Button to insert and update data

// Function to delete data
function ContactDelete(id) {
    document.getElementById("contact-list").innerHTML = `<ul class="card" id="contact-list"></ul>`
    myFetch(`${url_api}/${id}`, "DELETE").then(res => console.log(res))
    
    alert("Delete contact successful")
    fetchContactData()
}
// Function to delete data

// Function to delete data
function ContactStatus(value, id) {
    console.log(value, id)
    document.getElementById("contact-list").innerHTML = `<ul class="card" id="contact-list"></ul>`
    if (value == "1") {
        myFetch(`${url_api}/${id}`, "PUT",{
            contact_value: "0"
        } 
        ).then(res => console.log(res))
    }
    if (value == "0") {
        myFetch(`${url_api}/${id}`, "PUT",{
            contact_value: "1"
        } 
        ).then(res => console.log(res))
    }

    clearContact()
    
    alert("Update contact status successful")
    fetchContactData()
}
// Function to delete data

//render data
fetchContactData()
//render data