<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var mySVG=sendXML.documentElement
    var id=mySVG.getAttribute("id")
    var publishMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Publish.svg'
    var svgMap=Server.MapPath(svgFile)
    publishMapSVG.load(svgMap)

    var docSVG=publishMapSVG.documentElement
    var publish=true
    for(var k=0;k<docSVG.childNodes.length;k++)
    {
         var elemG=docSVG.childNodes.item(k)
         var elemId=elemG.getAttribute("id")
          if(elemId==id)
          {
            publish=false
            break
          }
    }
    if(publish==true)
    {
        docSVG.appendChild(mySVG)
        publishMapSVG.save(svgMap)
        //---add published attrib to oriiginal map---
        var mapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
        var svgFile='../LIBRARY/Map.svg'
        var svgMap=Server.MapPath(svgFile)
        mapSVG.load(svgMap)
        var doc=mapSVG.documentElement
        for(m=0;m<doc.childNodes.length;m++)
        {
           var mapG=doc.childNodes.item(m)
           var mapId=mapG.getAttribute("id")
           if(mapId==id)
           {
              mapG.setAttribute("published","true")
              mapSVG.save(svgMap)
              break
           }
        }


    }
   Response.Write("OK")

%>