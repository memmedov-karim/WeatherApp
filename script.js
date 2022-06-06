const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);
  

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });
   
    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { visibility,coord, main, name, sys, weather,wind } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <div class = "my_all">
      <div class="before" >
        <h2 class="city-name city_name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
      
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        
        </div>
        <div class = "detail_info">
        <h4>Cordinate-<span style="font-weight:bold">${coord["lon"]},${coord["lat"]}</span></h4>
        <p>Visibility-<span style="font-weight:bold">${visibility}</span></p>
        <p>Sea-Level-<span style="font-weight:bold">${main.sea_level}m</span></p>
        <p>Max-Temp-<span style="font-weight:bold">${main.temp_max}m</span></p>
        <p>Wind-Speed-<span style="font-weight:bold">${wind.speed}km/hour</span></p>

        </div>
        </div>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
      const detail = document.querySelectorAll(".detail");
      const my_all = document.querySelectorAll(".my_all");
      const detail_info = document.querySelectorAll(".detail_info");
      const before = document.querySelectorAll(".before");
      const city_name = document.querySelectorAll(".city_name");
      // console.log(detail)
      // detail.addEventListener("click",(e)=>{
      //   console.log(name)
      // })
      for(let x of my_all){
        console.log(x.children[2])
        x.children[2].addEventListener("click",(e)=>{
          if(x.children[2].innerHTML == "Detail"){
            x.children[2].innerHTML = "ok";
          }
          else{
            x.children[2].innerHTML = "Detail";

          }
          
        })
      }
      
      for(let i=0;i<detail.length;i++){
        // detail_info[i].style.display = "none";
        // detail[i].addEventListener("click",(e)=>{
          
          
          // if(detail[i].innerHTML == "Detail"){
          //   if(detail.length % 2==0){
              // if(i%2==0){
              //   detail[i].innerHTML = "close"
              // }
              // detail[i].innerHTML = "close";
              // detail[i].innerHTML = "close";
              // before[i].style.display = "none";
              // detail_info[i].style.display = "block";
              
            // }
            // else{
              // if(i%2 != 1){
              //   detail[i].innerHTML = "close";

              // }
              
              
            // }
            
            


          // }
          // else{
          //   if(detail.length % 2 == 0){
          //     detail[i].innerHTML = "Detail";
              // before[i].style.display = "block";
              // detail_info[i].style.display = "none";

            // }
            
            

          // }
          
        // })
      }
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});