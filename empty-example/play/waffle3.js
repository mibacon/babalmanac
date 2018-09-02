
$(function () { 

	var svg = d3.select("body").append("svg")
		.attr("width", "1200px")
		.attr("height", "400px")
		

	d3.json('testdata.json', function(data) {

		console.log(data)
		var g = svg.append("g").attr("transform", "translate(" + 150 + "," + 100 + ")");
		
		var section = g.selectAll("div")
			.data(data)
			.enter()
			.append("div")
			.attr("class", "first")
			.text(function(d) {return  "DIV "+ d.Month})

			section.append("circle")
				.attr("cx", function(d, i) {return i*100})
				.attr("cy", 100)
				.attr("r", function(d) {return d.Month *10})

			d3.select("body").append("button")
				.text("click me")
				.on("click", function() {
					var reduced = g.selectAll("div")
						.data([0,1,2])

				
					reduced.exit().remove();

					reduced.enter().append("div")
						
					reduced.attr("class", "second")
						.text(function(d) {return "DIV " + d})
					
					reduced.append("circle")
						.attr("cx", function(d, i) {return i*100})
						.attr("cy", 100)
						.attr("r", function(d) {return d *10})

				})

		

	}) //end of data



}) //end of jquery









