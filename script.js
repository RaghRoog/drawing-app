
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
function drawingLine(ctx){
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()    
}
//drawing with pencil
function pencilDraw(event, ctx){
    endingPoint = getCords(event)
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()    
    startingPoint = endingPoint
}

//removing event listeners from canvas
function removeEventListenersFromCanvas(){
    let drawingArea = document.getElementById('drawingArea')
    let newDrawingArea = drawingArea.cloneNode(true)
    newDrawingArea.getContext('2d').drawImage(drawingArea, 0, 0)
    drawingArea.parentNode.replaceChild(newDrawingArea, drawingArea)
    return newDrawingArea
}

//selecting drawing tool
//line tool
function selectLineTool(){
    let drawingArea = removeEventListenersFromCanvas()
    let ctx = drawingArea.getContext('2d')
    drawingArea.addEventListener('mousedown', (event) => {
        startingPoint = getCords(event)
    })
    drawingArea.addEventListener('mouseup', (event) => {
        endingPoint = getCords(event)
        drawingLine(ctx)
   })
}
let selectLineBtn = document.getElementById('selectLineBtn')
selectLineBtn.addEventListener('click', selectLineTool)
//pencil tool
function selectPencilTool(){
    let drawingArea = removeEventListenersFromCanvas()
    let ctx = drawingArea.getContext('2d')
    let pencilDrawHandler
    drawingArea.addEventListener('mousedown', event => {
        startingPoint = getCords(event)
        pencilDrawHandler = event => pencilDraw(event, ctx)
        drawingArea.addEventListener('mousemove', pencilDrawHandler)
    })
    drawingArea.addEventListener('mouseup', () => {
        drawingArea.removeEventListener('mousemove', pencilDrawHandler)
    })
    drawingArea.addEventListener('mouseleave', () => {
        drawingArea.removeEventListener('mousemove', pencilDrawHandler)
    })
}
let selectPencilBtn = document.getElementById('selectPencilBtn')
selectPencilBtn.addEventListener('click', selectPencilTool)
