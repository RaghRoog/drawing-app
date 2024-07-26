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

let currentColor
let isEraser

//redrawing canvas
function redrawCanvas(ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.strokeStyle = `${line.color}`
        ctx.stroke() 
    })
    pencilLines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line[0].x, line[0].y)
        for(let i = 0; i < line.length; i++){
            ctx.lineTo(line[i].x, line[i].y)
        }
        ctx.strokeStyle = `${line[0].color}`
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
    ctx.strokeStyle = `${currentColor}`
    ctx.stroke()
}
//drawing with pencil
function pencilDraw(event, ctx, currentLine, color){
    endingPoint = getCords(event)
    currentLine.push({x: endingPoint.x, y: endingPoint.y, color: currentColor})
    ctx.beginPath()
    ctx.moveTo(startingPoint.x, startingPoint.y)
    ctx.lineTo(endingPoint.x, endingPoint.y)
    ctx.strokeStyle = `${color}`
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
        lines.push({ start: startingPoint, end: endingPoint, color: currentColor })
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
    let lineColor
    drawingArea.addEventListener('mousedown', event => {
        startingPoint = getCords(event)
        lineColor = isEraser ? "#FFFFFF" : currentColor
        currentLine = [{x: startingPoint.x, y: startingPoint.y, color: lineColor}]
        pencilDrawHandler = event => pencilDraw(event, ctx, currentLine, lineColor)
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
selectPencilBtn.addEventListener('click', () => {
    isEraser = false
    pencilTool()
})
//eraser (eraser is working like pencil but always draw with white color)
let selectEraserBtn = document.getElementById('selectEraserBtn')
selectEraserBtn.addEventListener('click', () => {
    isEraser = true
    pencilTool()
})
//changing color
let colorPicker = document.getElementById('colorPicker')
currentColor = colorPicker.value
colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value
})
