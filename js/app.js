const elSelectBtn = document.querySelector('.select-icon');
const elOptionList = document.querySelector('.options');
const elSelectMenu = document.querySelector('.select-menu');
const elSelected = document.querySelector('.selected');
const elSearchInput = document.querySelector('.search');
const elLocationCity = document.querySelector('.location-city > span');
const elDate = document.querySelector('.year');
const elTime = document.querySelector('.time');
const prayTimes = document.querySelectorAll('.pray-time');


elSelectBtn.addEventListener('click', () => {
  elSelectMenu.classList.toggle('active');
  elSearchInput.focus();
})

elOptionList.addEventListener('click', (event) => {
  if(event.target.matches('li')){
    elSelected.innerText = event.target.innerText;
    elLocationCity.innerText = `${event.target.innerText} shahri`;
    elSelectMenu.classList.remove('active');
    renderPrayTimes();
  }
});

function renderList(data){
  while(elOptionList.children[1]){
    elOptionList.removeChild(elOptionList.children[1]);
  }
  data.forEach(region => {
    const optionEl = document.createElement('li');
    optionEl.className = 'option';
    optionEl.innerText = region;
    elOptionList.appendChild(optionEl);
  })
};

renderList(regions);

elSearchInput.addEventListener('input', () => {
  const nameRegex = new RegExp(elSearchInput.value, 'gi')
  const searchedItem = regions.filter(item => item.match(nameRegex));
  renderList(searchedItem);
});

function renderPrayTimes(){
  fetch(`https://islomapi.uz/api/present/day?region=${elSelected.innerText}`)
  .then(response => response.json())
  .then(data => {
    const year = (data.date).split('-').reverse().join('-');
    console.log(year)
    elDate.innerText = `${data.weekday}, ${year}`
    prayTimes.forEach((item, index) => {
      item.innerHTML = Object.values(data.times)[index];
    });
  });
}

renderPrayTimes();

(() => {
  const givePadStart = (item) => item.toString().padStart(2, '0');
  setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    elTime.innerText = `${givePadStart(hours)}:${givePadStart(minutes)}:${givePadStart(seconds)}`
  }, 1000);
})();
