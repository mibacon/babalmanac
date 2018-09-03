console.log("hello world")

$(function () { 


	var totalHeight = window.innerHeight
	var totalWidth = window.innerWidth
	
	d3.json("data.json", function(data){
		
				
		var div = d3.select("body").append("div")
			    .attr("class", "tooltip")
			    .style("opacity", 0);
	
		var margin = {top:0, right:50, bottom:40, left:15},
	    	width = 500- margin.left - margin.right,
			height = totalHeight - margin.top - margin.bottom;
		
		var numPerRow = 53
		var size = 5
	

		var scale = d3.scaleLinear()
			.domain([0, numPerRow -1])
		  	.range([0, size * numPerRow])
		  	
		  	
		var draw = function(field) {
		

			var nest = d3.nest()
				.key(function(d) { return d.Babylonian_Almanac})
				.key(function(d) { return d.ALL})
				.sortKeys(d3.ascending)
			 	.entries(data);
			   	
			
			nest.stats = {}

			nest.forEach(function(v,k) {
				v.stats = {}

				v.values.forEach(function(val,ke) {
					val.stats = {}
					val.stats["total"] = val.values.length
					
					var bcount = 0
					var ncount = 0
					var xcount = 0
					

					v.stats[val.key] = val.values.length

					
					val.values.forEach(function(value, keys) {
						if (value.new_eth == "b") {
							bcount ++
						} else if (value.new_eth == "n") {
							ncount ++
						} else {
							xcount ++
						}
					})
					
					var bper = Math.floor((bcount/val.values.length)*100)
					var nper = Math.floor((ncount/val.values.length)*100)
					var xper = Math.floor((xcount/val.values.length)*100)
					
					val.stats["perBab"] = bper + "%"
					val.stats["perNonB"] = nper + "%"
					val.stats["perX"] = xper + "%"
					
					if(nest.stats[val.key]) {
						if(nest.stats[val.key] < v.stats[val.key]) {
							nest.stats[val.key] = v.stats[val.key]
						}
					} else {
						nest.stats[val.key] = v.stats[val.key]
					}


					
				})

				
			})

			console.log(nest)
			
		    var svg = d3.select(".right").selectAll(".dayType")
		    	.data(nest)
		    	.enter()
		    	.append("div")
		    	.attr("class", "dayType")
		    	.attr("id", function(d) {
		    		if(d.key == "+") {
		    			return "Positive"
		    		} else if (d.key == "-") {
		    			return "Negative"
		    		} else {
		    			return "Ambiguous"
		    		}
		    	})

		    	
		    svg.append("div").attr("class","title_bar").append("text")
		    	.text(function(d) {
		    		if(d.key == "+") {
		    			return "POSITIVE DAYS"
		    		} else if (d.key == "-") {
		    			return "NEGATIVE DAYS"
		    		} else {
		    			return "AMBIGUOUS DAYS"
		    		}})
		    	.attr("transform", "translate(" + margin.left + "," + 15 + ")")
		    	
		    	
			    
			var subSvg = svg.selectAll(".selectedGroups")
				.data(function(d) {return d.values})
				.enter()
				.append("svg")
				.attr("class", "selectedGroups")
				.attr("height", function(d) {
					return (nest.stats[d.key]/numPerRow*7) + 30
				})
					

						
			subSvg.append("text")
				.text(function(d) { return d.key})
				.attr("transform", "translate(" + margin.left + "," + 25 + ")")
				.attr("font-size", "14px")
				
			subSvg.append("text")
				.text(function(d) { 
					return "Bab:" + d.stats.perBab + " NonBab:" + d.stats.perNonB
				})
				.attr("transform", "translate(" + 270 + "," + 25 + ")")
				.attr("text-anchor", "end")
				.attr("font-size", "10px")
				

						
			
			var waffle = subSvg.append("g")
		        .attr("class", "waffle")
		        .attr("transform", "translate(" + margin.left + "," + 30 + ")");
	

			var cells = waffle.selectAll("rect")
				.data(function(d) {return d.values})
				.enter().append('rect')
				.sort(function(x, y){
				   return d3.ascending(x.new_eth, y.new_eth);
				})
				.attr('x', (d, i) => {
			    	var n = i % numPerRow
			    	return scale(n)
			  	})
			  	.attr('y', (d, i) => {
			    	var n = Math.floor(i / numPerRow)
			    	return scale(n)
				  	}) 
			  	.attr('width', size)
			  	.attr('height', size)
			  	.attr('fill', function(d) {
			  		if(d.new_eth == "b") {
			  			return "#299AE8"
			  		} else if (d.new_eth == "n") {
			  			return "#20DFFF"
			  		} else if( d.new_eth == "x") {
			  			return "silver"
			  		} else {
			  			return "white"
			  		}
			  	})
		  		.attr('stroke-width', 1)
		  		.attr('stroke', 'white')
		  		.attr('class', function(d){ 
		  			if(d.Text_Publication_Number == "BE9_37"){
		  				return "blue"
		  			}})
		  		.style("opacity", 1)
				.on("mouseover", function(d) {
			       div.transition()
			         .duration(200)
			         .style("opacity", .9);
			       div.html("Document:" + d.Text_Publication_Number + "<br/> Date:" + d.Date_MMDD)
			         .style("left", (d3.event.pageX) + "px")
			         .style("top", (d3.event.pageY - 28) + "px");
			       })
			     .on("mouseout", function(d) {
			       div.transition()
			         .duration(500)
			         .style("opacity", 0);
			       })

		svg.exit().remove();
		}

		draw()

		var update = function(field){

			var month_order = ["Nisannu", "Ayyaru", "Simanu", "Du'uzu", "Abu", "Elulu", "Tasritu", "Arahsamnu", "Kislimu", "Tebetu", "Sabatu", "Addaru"];

			var nest = d3.nest()
				.key(function(d) { return d.Babylonian_Almanac})
				.key(function(d) { return d[field]})
				.sortKeys(function(a,b) { 
					if(field == "Month") {
						return month_order.indexOf(a) - month_order.indexOf(b); 
					} else {
						return d3.ascending(a,b)
					}
				})
			   	.entries(data);

			var updated = d3.select(".right").selectAll(".dayType")
				.data(nest)

			

			updated.enter()
		    	.append("div")
		    	.attr("class", "dayType")
		    	.attr("id", function(d) {
		    		if(d.key == "+") {
		    			return "Positive"
		    		} else if (d.key == "-") {
		    			return "Negative"
		    		} else {
		    			return "Ambiguous"
		    		}
		    	})
		}

		


		$('button').on("click", function(){
			if(!$(this).hasClass("clicked")) {
				$('.clicked').removeClass()
				$(this).addClass("clicked")

				var selection = $(this).attr("id")
				

				update(selection)

			}
		})

	



	}) //end of data

}) //end of jquery

