//setting canvas size
document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('drawingArea')
    resizeCanvas(canvas)
})
function resizeCanvas(canvas){
    let rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
}


//getting cords
function getCords(event){
    return {
        x: event.offsetX,
        y: event.offsetY
    }
}

let startingPoint = {}
let endingPoint = {}

let lines = []
let pencilLines = []

//redrawing canvas
function redrawCanvas(ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.stroke() 
    })
    pencilLines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line[0].x, line[0].y)
        for(let i = 0; i < line.length; i++){
            ctx.lineTo(line[i].x, line[i].y)
        }
        ctx.stroke()
    })
}
//drawing a line
function lineDraw(event, ctx){
    endingPoint = getCords(event)
    redrawCanvas(ctx)
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()
}
//drawing with pencil
function pencilDraw(event, ctx, currentLine){
    endingPoint = getCords(event)
    currentLine.push({x: endingPoint.x, y: endingPoint.y})
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.stroke()    
    startingPoint = endingPoint
}

//clone canvas without eventListeners
function cloneCanvas(){
    let drawingArea = document.getElementById('drawingArea')
    let newDrawingArea = drawingArea.cloneNode(true)
    newDrawingArea.getContext('2d').drawImage(drawingArea, 0, 0)
    drawingArea.parentNode.replaceChild(newDrawingArea, drawingArea)
    return newDrawingArea
}

//drawing tools
//line tool
function lineTool(){
    let drawingArea = cloneCanvas()
    let ctx = drawingArea.getContext('2d')
    let lineDrawHandler
    drawingArea.addEventListener('mousedown', event => {
        startingPoint = getCords(event)
        lineDrawHandler = event => lineDraw(event, ctx)
        drawingArea.addEventListener('mousemove', lineDrawHandler)
    })    
    drawingArea.addEventListener('mouseup', event => {
        endingPoint = getCords(event);
        lines.push({ start: startingPoint, end: endingPoint })
        drawingArea.removeEventListener('mousemove', lineDrawHandler)
        redrawCanvas(ctx)
    })
}
let selectLineBtn = document.getElementById('selectLineBtn')
selectLineBtn.addEventListener('click', lineTool)
//pencil tool
function pencilTool(){
    let drawingArea = cloneCanvas()
    let ctx = drawingArea.getContext('2d')
    let currentLine = []
    let pencilDrawHandler
    drawingArea.addEventListener('mousedown', event => {
        startingPoint = getCords(event)
        currentLine = [{x: startingPoint.x, y: startingPoint.y}]
        pencilDrawHandler = event => pencilDraw(event, ctx, currentLine)
        drawingArea.addEventListener('mousemove', pencilDrawHandler)
    })
    drawingArea.addEventListener('mouseup', () => {
        drawingArea.removeEventListener('mousemove', pencilDrawHandler)
        pencilLines.push(currentLine)
    })
    drawingArea.addEventListener('mouseleave', () => {
        drawingArea.removeEventListener('mousemove', pencilDrawHandler)
        pencilLines.push(currentLine)
    })
}
let selectPencilBtn = document.getElementById('selectPencilBtn')
selectPencilBtn.addEventListener('click', pencilTool)
