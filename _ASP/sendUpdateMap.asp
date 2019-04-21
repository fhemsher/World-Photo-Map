<%@ Language=javascript %>
<%
	var sendXML =  Server.CreateObject("Msxml2.DOMDocument.6.0");
	sendXML.load(Request)

	var myMap=sendXML.documentElement
     var myId=myMap.getAttribute("id")
    var updateMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
    var svgFile='../LIBRARY/Map.svg'
    var svgMap=Server.MapPath(svgFile)
    updateMapSVG.load(svgMap)


   var docMap=updateMapSVG.documentElement


    for(var k=0;k<docMap.childNodes.length;k++)
    {
       var map=docMap.childNodes.item(k)
       var id=map.getAttribute("id")

       if(id==myId)
       {

         docMap.insertBefore(myMap,map)
         docMap.removeChild(map)
          
         updateMapSVG.save(svgMap)
             //-----update publish-----
             if(myMap.getAttribute("published")=="true")
             {
               var publishMapSVG = Server.CreateObject("Msxml2.DOMDocument.6.0");
                var svgPublishFile='../LIBRARY/Publish.svg'
                var svgPublishMap=Server.MapPath(svgPublishFile)
                publishMapSVG.load(svgPublishMap)
                 var docPublishMap=publishMapSVG.documentElement
                     for(var m=0;m<docPublishMap.childNodes.length;m++)
                    {
                       var mapPublished=docPublishMap.childNodes.item(m)
                       var idPublished=mapPublished.getAttribute("id")
                       if(idPublished==id)
                       {
                          var clone=myMap.cloneNode(true)

                          docPublishMap.removeChild(mapPublished)
                          docPublishMap.appendChild(clone)
                          publishMapSVG.save(svgPublishMap)
                          break
                       }
                    }

            }
          break;

        }
    }

%>