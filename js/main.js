// Declair variables
const holder = document.getElementById('holder') // boxes holder
const icons = ['\\f005','\\f004','\\f095', '\\f0c2', '\\f086', '\\f118', '\\f030', '\\f0c3', '\\f06d', '\\f084'] // neded icons
const start = document.getElementById('greeting')
const overlay = document.getElementById('overlay')
const successSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?')
const missSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/09/audio_ec2624b77c.mp3?')
const winSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/09/audio_3047f54f23.mp3?')
const failSound = new Audio('https://cdn.pixabay.com/download/audio/2023/04/06/audio_e19f629fa3.mp3?')
const tryNums = document.getElementById('triesNum') // span element that shows wrong tries
let tries = 0 // number of tries so it's able to increase
let stock = [] // an Array to hold boxes to shuffle them
let x = 0 // use it as special value for an attribute for every two icons and check for even numbers


//
const nameField = document.getElementById('name')
start.onclick = ()=> {
  userName = prompt('Enter You name: ')
  overlay.style.display = 'none'
  if (!userName.length) nameField.innerHTML = 'Unknown'
  if (userName.length) nameField.innerHTML = userName
  setTimeout(showBoxes, 200) // shows boxes then hide them for a second
  setTimeout(hideBoxes, 2000)
}
// Creat game boxes
for (let icon of icons) {
  x++
  for (let i = 0; i < 2; i++) { // repeat every icons twice
    let element = document.createElement('span')
    element.className = 'mark'
    element.style.cssText = `--icon:'${icon}'`

    let box = document.createElement('div')
    box.className = 'box'
    box.setAttribute('data-check', x) // this the attribute which will be used to verify the match

    box.appendChild(element)
    stock.push(box)
  }
}
stock = stock.sort(()=> 0.5 - Math.random()); // suffle boxes
for (let element of stock) {
  holder.appendChild(element)
} // append boxes to the holder
const boxes = Array.from(document.getElementsByClassName('box')) // get the boxes element as an Array


// boxes clicks
document.addEventListener('click', (element)=> {
  let curr = Array.from(document.getElementsByClassName('active'))
  let e = element.target
  if (!e.classList.contains('box')) return // guard clause to allows click on boxes only
  if (curr.length > 2) return
  x++ // x++ value must be 11 so 
  e.classList.add('active') // add active to the current box
  e.classList.add('flip') // flip class to flip the box and mark evry two similar boxes
  if (!(x%2 === 0)) return // guard clause to check when the user clicks 2 boxes
  check()
})

// check for match
function check() {
  if (isGameOver()) return;
  let selected = document.getElementsByClassName('active') // save the two current boxes

  if (selected[0].getAttribute('data-check') !== selected[1].getAttribute('data-check')) { // catch miss tries
    tries++ // increase number of wrong tries
    tryNums.innerHTML = 10 - tries // add tries to the document
    setTimeout(() => {
      for (let e of selected) {// remove the flip class
        e.classList.remove('flip')
      } // let the user confirm that it was a miss click before flip the boxes back
      selected[0].classList.remove('active') // remove the active class from the two boxes
      selected[0].classList.remove('active')
    }, 500);
    missSound.play()
    return
  }
  // the win case
  selected[0].classList.remove('active') // remove the active class from the two boxes
  selected[0].classList.remove('active') // 
  successSound.play()
}
// check for game over
function isGameOver() {
  let result = true // the result always gonna be true exceptL:
  for (let box of boxes) { // if any box doesn't has the flip class 
    if (!box.classList.contains('flip')) result = false
  }
  if (result) {
    setTimeout(()=> {
      start.innerHTML = 'You Won!'
      start.style.backgroundColor = '#10ff1a'
      overlay.style.display = 'flex'
    }, 600) // another setTimout function to let the user see the last box flip
    winSound.play()
  }
  console.log(tries)
  if (tries == 9) {
    start.innerHTML = 'You Lost'
    start.style.backgroundColor = '#4caf50'
    overlay.style.display = 'flex'
    showBoxes()
    setTimeout(()=> {
    }, 600)
    failSound.play()
    return result = true
  }
  return result
}

function showBoxes() {
  for (let box of boxes) {
    box.classList.add('flip')
  }
}
function hideBoxes() {
  for (let box of boxes) {
    box.classList.remove('flip')
  }
}