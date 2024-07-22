
let drawingArea = document.getElementById('drawingArea')
let ctx = drawingArea.getContext('2d')

//getting cords
function getCords(event){
    return {
        x: event.offsetX,
        y: event.offsetY
    }
}

let startingPoint = {}
let endingPoint = {}


//drawing a line
// function drawingLine(){
//     ctx.beginPath()
//     ctx.moveTo(startingPoint.x, startingPoint.y)
//     ctx.lineTo(endingPoint.x, endingPoint.y)
//     ctx.stroke()    
// }
// drawingArea.addEventListener('mousedown', (event) => {
//     startingPoint = getCords(event)
//     console.log('starting point: ' + startingPoint.x + ", " + startingPoint.y)
// })
// drawingArea.addEventListener('mouseup', (event) => {
//     endingPoint = getCords(event)
//     drawingLine()
//     console.log('ending point: ' + endingPoint.x + ", " + endingPoint.y)
// })

//pencil
function pencilDraw(event){
    endingPoint = getCords(event)
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()    
    startingPoint = endingPoint
}
drawingArea.addEventListener('mousedown', event => {
    startingPoint = getCords(event)
    drawingArea.addEventListener('mousemove', pencilDraw)
})
drawingArea.addEventListener('mouseup', event => {
    drawingArea.removeEventListener('mousemove', pencilDraw)
})