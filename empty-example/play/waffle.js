console.log("hello world")

var margin = {top:70, right:50, bottom:40, left:30},
    width = 300 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom;

//how many cells in each row
var numPerRow = 10
//how big each cell should be
var size = 15

//scale to place cells
var scale = d3.scaleLinear()
	.domain([0, numPerRow -1])
  	.range([0, size * numPerRow])

// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

d3.json("data.json", function(data){
	console.log(data.length)

	var nest = d3.nest()
      .key(function(d) { return d.bab; })
      .entries(data);

    console.log(nest)

    var svg = d3.select("body").selectAll("svg")
    	.data(nest)
    	.enter()
    	.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    // .attr("transform",
	          // "translate(" + margin.left + "," + margin.top + ")");
	
	
	
	var waffle = svg.append("g")
      .attr("class", "waffle")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// svg.selectAll('rect').data(data)
	waffle.selectAll("rect")
		.data(function(d) {return d.values})
		.enter().append('rect')
		.sort(function(x, y){
		   return d3.ascending(x.bab, y.bab);
		})
		.attr('x', (d, i) => {
	    	var n = i % numPerRow
	    	return scale(n)
	  	})
	  	.attr('y', (d, i) => {
	    	var n = Math.floor(i / 10)
	    	return scale(n)
		  	}) 
	  	.attr('width', size)
	  	.attr('height', size)
	  	.attr('fill', function(d) {
	  		if(d.bab == "+") {
	  			return "tomato"
	  		} else {
	  			return "gray"
	  		}
	  	})
  		.attr('stroke-width', 2)
  		.attr('stroke', 'white')
})



