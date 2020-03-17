//Search Bar (Couldn't get working)
$(".search-container").html(`<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D" id="search-submit" class="search-submit">
                        </form>`)



//Variables
var datas
var userInfo = []
var i

//Fetch Funcitons
function fetchData(url){
    return fetch(url)
            .then(checkStatus)
            .then(res=>res.json())
            .catch(error=>console.log(`There's a problem mans!!`, error))
}

Promise.all([
    datas=fetchData('https://randomuser.me/api/?results=12&nat=US'),
])
.then(data=>{ //Creates the cards for each uer
    saveData(data[0])
    userData=data[0].results
    seed=data[0].info.seed
    for(user of userData){
        card=$(document.createElement("div")).addClass('card')
        card.prop('id',`${userData.indexOf(user)}`)
        card.html(`<div class="card-img-container">
                <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>`)
        $(".gallery").append(card)
    }

    console.log(seed)

})


//Helper Functions
/**
 *Makes sure the response was recieved
 *
 * @param {*} response
 * @returns
 */
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response)
    }else{
        return Promise.reject(new Error(response.statusText))
    }
}

/**
 *Saves the fetched data as a two dimensional array of users and their information
 *
 * @param {*} response
 */
function saveData(response) {
	for (i = 0; i <response.results.length; i++) {
		userInfo[i] = {}
		userInfo[i]['image'] = response.results[i].picture.large
		userInfo[i]['name'] = response.results[i].name.first + " " + response.results[i].name.last
		userInfo[i]['email'] = response.results[i].email
		userInfo[i]['city'] = response.results[i].location.city 
		userInfo[i]['cell'] = response.results[i].cell
		userInfo[i]['address'] = response.results[i].location.street.number+" "+response.results[i].location.street.name 
		var b_date = new Date(response.results[i].dob.date)
		userInfo[i]['bday'] = b_date.toDateString()
	}
	
}

/**
 *Changes the user's information to the the information of the correct user after the previous and next buttons are clicked
 *
 * @param {*} element
 * @param {*} index
 * @param {*} [btn=null]
 */
function changeInfo(element, index, btn=null){
    prevDis=''
    nextDis=''
    if(index=='11'){
        nextDis='disabled'
    }
    if(index=='0'){
        prevDis='disabled'
    }
    element.html(`
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${userInfo[index]['image']}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${userInfo[index]['name']}</h3>
                <p class="modal-text">${userInfo[index]['email']}</p>
                <p class="modal-text cap">${userInfo[index]['city']}</p>
                <hr>
                <p class="modal-text">${userInfo[index]['cell']}</p>
                <p class="modal-text">${userInfo[index]['address']}</p>
                <p class="modal-text">Birthday: ${userInfo[index]['bday']}</p>
            </div>
        </div>

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn" ${prevDis}>Prev</button>
            <button type="button" id="modal-next" class="modal-next btn" ${nextDis}>Next</button>
        </div>
    `)
}


//Event Listeners

//Creates the modal when cards are clicked on
$(".gallery").click((event)=>{
    console.log(event.target)
    if(event.target.closest(".card")!=null){
        console.log('CLICK')
        container=$(document.createElement("div")).addClass("modal-container")
        console.log(`container: ${container[0]}`)
        i=$(event.target.closest(".card")).attr('id')
        console.log(i)
        changeInfo(container, i)
        console.log(container[0])

    $("body").append(container)
        console.log()
    }
})

//moves to the next user when the next button is clicked
$(document).on('click', '#modal-next', (event)=>{
    console.log(i)
    i=(parseInt(i)+1).toString()
    console.log(i)
    changeInfo($(event.target).parent().parent(), i, $(event.target)[0])
})

//moves to the previous user when the previous button is clicked
$(document).on('click', '#modal-prev', (event)=>{
    console.log(i)
    i=(parseInt(i)-1).toString()
    console.log(i)
    changeInfo($(event.target).parent().parent(), i, $(event.target)[0])
})

//Gets rid of the modal when the x is clicked
$(document).on('click', '#modal-close-btn', (event)=>{
    $(event.target.closest('.modal-container')).remove()
})

//Attempted to get search bar working correctly but couldnt get it done :(
$(document).on('input', '#search-input', (event)=> {
    var name=event.target.value.toUpperCase()
    console.log(name)



  var newUserInfo=userInfo.filter((x)=>{
       return x.name.substring(0,name.length).toUpperCase()==name
  })
  console.log(newUserInfo)

  for(user of userInfo){
      if(newUserInfo.indexOf(user)<0){

      }
  }
})

