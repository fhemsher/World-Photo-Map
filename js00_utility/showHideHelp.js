function openHelp()
{

    var height = helpDiv.scrollHeight
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    helpDiv.style.visibility = "visible"

    introDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"
    mapHelpLibraryDiv.style.visibility = "hidden"

}
function closeHelp()
{
    var height = 1
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('helpDiv.style.visibility="hidden"', 900)

    introDiv.style.visibility = "hidden"
}

function openGPSHelp()
{

    var height = GPSHelpDiv.scrollHeight
    d3.select("#GPSHelpDiv").transition().duration(800).style("height", height+"px")
    GPSHelpDiv.style.visibility = "visible"



}
function closeGPSHelp()
{
    var height = 1
    d3.select("#GPSHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('GPSHelpDiv.style.visibility="hidden"', 900)

  
}




function openMapHelp()
{
    introDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.top = "10px"

    var height = mapHelpLibraryDiv.scrollHeight
    d3.select("#mapHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    mapHelpLibraryDiv.style.visibility = "visible"

    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    gpsShowHideDiv.style.visibility = "hidden"

}
function closeMapHelp()
{
    var height = 1
    d3.select("#mapHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    setTimeout('mapHelpLibraryDiv.style.visibility="hidden"', 900)
}



function openSaveMapHelp()
{
    introDiv.style.visibility = "hidden"
    saveMapHelpDiv.style.top = "60px"

    var height = saveMapHelpDiv.scrollHeight
    d3.select("#saveMapHelpDiv").transition().duration(800).style("height", height+"px")
    saveMapHelpDiv.style.visibility = "visible"

    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    mapHelpLibraryDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"


}
function closeSaveMapHelp()
{
    var height = 1
    d3.select("#saveMapHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('saveMapHelpDiv.style.visibility="hidden"', 900)
}





function hideAllHelps()
{    gpsShowHideDiv.style.visibility='visible'
    introDiv.style.visibility = "hidden"
    helpDiv.style.visibility = "hidden"
    helpDiv.style.height = "1px"
    saveMapHelpDiv.style.visibility = "hidden"
    saveMapHelpDiv.style.height = "1px"

    mapHelpLibraryDiv.style.visibility = "hidden"
    mapHelpLibraryDiv.style.height = "1px"
    mapTableCloseButton.style.visibility = "hidden"



}


