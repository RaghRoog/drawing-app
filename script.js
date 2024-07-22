
//getting cords
function getCords(event){
    return {
        x: event.offsetX,
        y: event.offsetY
    }
}

let startingPoint = {}
let endingPoint = {}

drawingArea.addEventListener('mousedown', (event) => {
    startingPoint = getCords(event)
    console.log('starting point: ' + startingPoint.x + ", " + startingPoint.y)
})
drawingArea.addEventListener('mouseup', (event) => {
    endingPoint = getCords(event)
    drawingLine()
    console.log('ending point: ' + endingPoint.x + ", " + endingPoint.y)
})

//drawing a line
function drawingLine(){
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()    
}