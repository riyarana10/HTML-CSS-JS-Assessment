let counterNumber = 1;

document.getElementById('add-btn').addEventListener('click', function(){
    createNewCounter()
})

function createNewCounter(){
    const heading = document.createElement('h3')
    heading.textContent = `counter number ${counterNumber}`
    
    const counterBox = document.getElementById('counter-box')
    const newCounter = document.createElement('div')

    newCounter.classList.add('active')

    newCounter.append(heading)
    counterBox.append(newCounter)
    
    const countElement = document.createElement('p'); 
    newCounter.appendChild(countElement); 
    
    let count = 0
    const counterstart = setInterval(() =>{
        count++
        countElement.textContent = `counter: ${count}`
    },1000)

    counterNumber++
}
