function disableAllButtons()
{
    selectDrawElemDiv.style.visibility = "hidden"
    openAddMapButton.disabled = true
    openAddCircleButton.disabled = true
    openAddImageButton.disabled = true

    openAddEllipseButton.disabled = true
    openAddRectButton.disabled = true
    openAddTextButton.disabled = true
    openAddPathButton.disabled = true
    openAddPolygonButton.disabled = true
    getMapLibraryButton.disabled = true
    openPhotoTableButton.disabled = true
}
function enableAllButtons()
{
    gpsShowHideDiv.style.visibility = 'visible'
    selectDrawElemDiv.style.visibility = "visible"

    openAddMapButton.disabled = false
    openAddCircleButton.disabled = false
    openAddImageButton.disabled = false

    openAddEllipseButton.disabled = false
    openAddRectButton.disabled = false
    openAddTextButton.disabled = false
    openAddPathButton.disabled = false
    openAddPolygonButton.disabled = false

    getMapLibraryButton.disabled = false
    openPhotoTableButton.disabled = false

    openAddMapButton.style.borderColor = ""
    openAddCircleButton.style.borderColor = ""
    openAddImageButton.style.borderColor = ""

    openAddEllipseButton.style.borderColor = ""
    openAddRectButton.style.borderColor = ""

    openAddTextButton.style.borderColor = ""
    openAddPathButton.style.borderColor = ""
    openAddPolygonButton.style.borderColor = ""

    getMapLibraryButton.style.borderColor = ""
    openPhotoTableButton.style.borderColor = ""

}

function openAddMapDraw()
{

    MyMap.scrollWheelZoom.disable();
    MyMap.dragging.disable()

    if(addElemMapLoad==true)
    {

        addElemMapCw.sendMapMessageSpan.innerHTML = ""

        addElemMapCw.yourMapTitleValue.value = ""
        addElemMapCw.addPlantNameValue.value = ""
        addElemMapCw.addPlantNameValue.placeholder = "Plant Name...Leave blank if not known"
        addElemMapCw.cancelButton.disabled = false
        addElemMapCw.sendButton.disabled = false

        if(EditMapId)
        {
            addElemMapCw.containerDiv.style.background = "orange"
            addElemMapCw.editAddMapSpan.innerHTML = "Save Map Edit"
            addElemMapCw.yourMapTitleValue.value = EditMapTitle
            addElemMapCw.sendButton.disabled = false
        }

    }

    openIframe("AddElem", "addElemMap", 0)
    // mySVG.setAttribute("onclick", "plantMap(event)")

    openAddMapButton.style.borderStyle = "inset"
}

function openAddImageDraw()
{
    if(addElemImageLoad==true)
        startImageDraw()

        openIframe("AddElem", "addElemImage", 0)
        mySVG.setAttribute("onclick", "placeDrawImage()")

        openAddImageButton.style.borderStyle = "inset"

}

function openAddCircleDraw()
{
    if(addElemCircleLoad==true)
        startCircleDraw()

        openIframe("AddElem", "addElemCircle", 0)

        openAddCircleButton.style.borderStyle = "inset"
}

function openAddEllipseDraw()
{
    if(addElemEllipseLoad==true)
        startEllipseDraw()

        openIframe("AddElem", "addElemEllipse", 0)

        openAddEllipseButton.style.borderStyle = "inset"
}

function openAddPolygonDraw()
{
    if(addElemPolygonLoad==true)
        startPolygonDraw()

        openIframe("AddElem", "addElemPolygon", 0)

        openAddPolygonButton.style.borderStyle = "inset"
}

function openAddRectDraw()
{
    if(addElemRectLoad==true)
        startRectDraw()

        openIframe("AddElem", "addElemRect", 0)

        openAddRectButton.style.borderStyle = "inset"
}

function openAddTextDraw()
{
    if(addElemTextLoad==true)
        startTextDraw()
        openIframe("AddElem", "addElemText", 0)

        openAddTextButton.style.borderStyle = "inset"

}
function openAddPathDraw()
{

    if(addElemPathLoad==false)
        openIframe("AddElem", "addElemPath", 0)
        else
        {
            openIframe("AddElem", "addElemPath", 0)
            startPathDraw()
        }

        openAddPathButton.style.borderStyle = "inset"

}

var AddElemOpen = false //--true if any addElem Frame is viz=true
function isAddElemOpen() //---called from iframeSelection.js---
{
    AddElemOpen = false

    if(editElemMapViz==true)AddElemOpen = true;
    if(addElemMapViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemCircleViz==true)AddElemOpen = true;
    if(addElemImageViz==true)AddElemOpen = true;

    if(addElemEllipseViz==true)AddElemOpen = true;
    if(addElemRectViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemPolygonViz==true)AddElemOpen = true;

}

function openIframe(Dir, name, left)
{
    hideAllHelps()

    closeAllFrames()
    disableAllButtons()

    var top = 50

    var fName = eval(name+"Load")
    var myFrame = document.getElementById(name+'Frame')
    var myDiv = d3.select("#"+name+"FrameDiv")

    if(fName==false)
    {
        eval(name+"Load=true")
        myFrame.src = Dir+"/"+name+".htm";
        eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")
    }
    else
    {

        var height = myFrame.scrollHeight

    }
    myFrame.style.overflow = "hidden"

    myDiv.transition().duration(800).style("height", height+"px")

    eval(name+"Viz=true")

    myDiv.style("visibility", "visible")
    myDiv.style("left", left+"px")
    myDiv.style("top", top+"px")

    if(name=="addElemRect")
        startRectDraw()
        if(name=="addElemCircle")
        startCircleDraw()

        if(name=="addElemText")
        startTextDraw()

}

//---fired from iframe onload----
function sizeFrame(name, width, height)
{
    var myFrame = document.getElementById(name+'Frame')
    var myDiv = d3.select("#"+name+"FrameDiv")

    myFrame.style.width = width+"px"
    myFrame.style.height = height+"px"

    myDiv.style("width", width+"px")
    myDiv.transition().duration(800).style("height", height+"px")

}
//---X button in iframe---
function closeIframe(name)
{

    mySVG.removeAttribute("onclick")

    openAddMapButton.style.borderStyle = ""
    openAddCircleButton.style.borderStyle = ""
    openAddImageButton.style.borderStyle = ""

    openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""

    getMapLibraryButton.style.borderStyle = ""

    enableAllButtons()
    var myDiv = d3.select("#"+name+"FrameDiv")
    myDiv.transition().style("height", 1+"px")
    .on("end", function()
        {
            myDiv.style("visibility", "hidden")
        }
    )
    eval(name+"Viz=false")

    document.getElementById("dragDot").removeAttribute("transform")
    document.getElementById("dragDot").setAttribute("cx", 0)
    document.getElementById("dragDot").setAttribute("cy", 0)
}

//---Only one frame visable: fired when another  frame is chosen
function closeAllFrames()
{

    hideAllHelps()

    openAddCircleButton.style.borderStyle = ""
    openAddMapButton.style.borderStyle = ""
    openAddImageButton.style.borderStyle = ""

    openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""

    getMapLibraryButton.style.borderStyle = ""

    for(var k = 0; k<iframeNameArray.length; k++)
    {
        var name = iframeNameArray[k]
        var viz = eval(name+"Viz")
        if(viz==true)
        {

            if(name=="addElemText")closeDrawText()
                else if(name=="addElemCircle")closeDrawCircle()
                    else if(name=="addElemMap")closeDrawMap()

                        //---added---
                        else if(name=="addElemMap")closeDrawMap()

                            else if(name=="addElemEllipse")closeDrawEllipse()
                                else if(name=="addElemRect")closeDrawRect()
                                    else if(name=="addElemPath")closeDrawPath()

                                        else if(name=="addElemPolygon")closeDrawPolygon()

                                            var myDiv = d3.select("#"+name+"FrameDiv")
                                            myDiv.style("height", 1+"px")
                                            myDiv.style("visibility", "hidden")
                                            myDiv.style("overflow", "hidden")

        }
        eval(name+"Viz=false")
    }

}

var addElemMapLoad = false
var editElemMapLoad = false

var addElemCircleLoad = false
var addElemImageLoad = false
var addElemPolygonLoad = false
var addElemEllipseLoad = false
var addElemRectLoad = false
var addElemTextLoad = false
var addElemPathLoad = false
var addElemPathEditLoad = false

var addElemCircleViz = false

var addElemMapViz = false
var editElemMapViz = false

var addElemImageViz = false
var addElemPolygonViz = false
var addElemEllipseViz = false
var addElemRectViz = false
var addElemTextViz = false
var addElemPathViz = false
var addElemPathEditViz = false

var addElemCircleCw
var addElemMapCw
var editElemMapCw
var addElemImageCw

var addElemPolygonCw
var addElemEllipseCw
var addElemRectCw
var addElemTextCw
var addElemPathCw
var addElemPathEditCw

//---each iframe---

var iframeNameArray =[]

iframeNameArray[0] = 'addElemText'

iframeNameArray[1] = 'addElemPath'
iframeNameArray[2] = 'addElemPathEdit'

iframeNameArray[3] = 'addElemCircle'
iframeNameArray[4] = 'addElemEllipse'
iframeNameArray[5] = 'addElemRect'

iframeNameArray[6] = 'addElemPolygon'
iframeNameArray[7] = 'addElemMap'
iframeNameArray[8] = 'editElemMap'

iframeNameArray[9] = 'addElemImage'