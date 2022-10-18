//////////////////////////////////////////////////
/*      Graph D3.js RStudio test zoom 2         */
/*      CREATE Aalborg University               */
/*      aldsanms                                */
/*      oct-17-2022                             */
/*      main.js                                 */
//////////////////////////////////////////////////



var windowSettings= {
  height : 900,//px
  width : 900,//px
  
  backgroundPicURL : "img/fond06.png",
};

var graphSettings = {
  height : 725,//px
  width : 725,//px
  
  marginTop : 70,//px
  marginLeft : 85,//px
  
  
  yScale : {},
  yAxis : {},
  gy : {},
  
  dateX : {},
  xAxis : {},
  gx : {},

  
  xMin : 0,//minimum x value in graph
  xMax : 0,//maximum x value in graph
  
  yMin : 0,//minimum y value in graph
  yMax : 0,//maximum y value in graph
  

  pointSize : 2,//px
  pointColor : "blue", 
  
}


var DataArrays = {
  Length : data.length,
  
  ydata : [],
  xdata : [],
  
  xMin : 0,
  xMax : 0,
  
  yMin : 0,
  yMax : 0,
  
}







//***********************************

document.body.innerHTML = "";


var back = d3.select("body").append("div")
  .attr('style', "width:"+windowSettings.width+"px;height:"+windowSettings.height+"px;background-image: url("+windowSettings.backgroundPicURL+");background-repeat: no-repeat;background-position: center;background-size: 100% 100%;position: relative");
  
  
svg = back.append('svg')
  .attr("width", graphSettings.width)
  .attr("height", graphSettings.height)
  .attr('style', "position:absolute;margin-left:"+(graphSettings.marginLeft)+"px;margin-top:"+graphSettings.marginTop+"px");


var gg = svg.append("g");
    
    



let zoom = d3.zoom()
  .scaleExtent([0.5, 10])
	.on('zoom', Function_zoom);
	
	
	

function Function_zoom(e) {
	  gg.attr('transform', e.transform);


    graphSettings.gy.call(graphSettings.yAxis.scale(e.transform.rescaleY(graphSettings.yScale)));
    //graphSettings.gx.call(graphSettings.xAxis.scale(e.transform.rescaleX(graphSettings.dateX)));
    
}

function initZoom() {

		svg.call(zoom);
}


function addGraphPoints() {

		gg.selectAll('circle')
		.data(data)
		.join('circle')
		.attr('cx', function(d,i) { return getCoordPx(i)[0]; })
		.attr('cy', function(d,i) { return getCoordPx(i)[1]; })
		.attr('r', graphSettings.pointSize)
		.attr('fill', graphSettings.pointColor);
}


function getCoordPx(i){
  var coord = [0,0];
  
  coord[0] = graphSettings.dateX(new Date(DataArrays.xdata[i]));
  coord[1] = graphSettings.yScale(DataArrays.ydata[i]);
  

    return coord;

}



function addAxis() {
  
  graphSettings.yAxis = d3.axisLeft(graphSettings.yScale).ticks(15);
  
  graphSettings.gy = back.append('svg')
                          .attr('style', "width:"+graphSettings.width+"px;height:"+graphSettings.height+"px;margin-top:"+graphSettings.marginTop+";margin-left:"+(-5)+"px")
                          .append('g')
                          .attr('transform', 'translate('+(graphSettings.marginLeft)+', 0)')
                          .attr("class", "axis")
  	                      .call(graphSettings.yAxis);
  
  /*graphSettings.xAxis = d3.axisBottom(dateX).tickFormat(d3.timeFormat("%M:%S")).ticks(10)
  graphSettings.gx = svg.append('g').attr('transform', 'translate('+0+','+(graphSettings.marginTop+graphSettings.height)+')')
    .attr("class", "axis")
  	.call(graphSettings.xAxis);*/
}





function dataLoading(data01){
  
  data01.forEach(element => {
    DataArrays.ydata.push(element.BCIConfidence);
    DataArrays.xdata.push(element.Timestamp);
  });
  
  DataArrays.xMin = new Date(d3.extent(DataArrays.xdata)[0]);
  DataArrays.xMax = new Date(d3.extent(DataArrays.xdata)[1]);
  
  DataArrays.yMin = Math.min(...DataArrays.ydata);
  DataArrays.yMax = Math.max(...DataArrays.ydata);
  
  
  
  graphSettings.yScale = d3.scaleLinear()
    			.domain([(DataArrays.yMin), (DataArrays.yMax)]) 
    			.range([(0), (graphSettings.height)]);
    			
			
  graphSettings.dateX = d3.scaleTime()
    .domain([new Date(DataArrays.xMin),new Date(DataArrays.xMax)])
    .range([(0), (graphSettings.width)]);
    

      		
  
}













initZoom();
dataLoading(data);
addGraphPoints();
addAxis();




/////////////////////


