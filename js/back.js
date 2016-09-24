$(function(){
		var prev_circle_pos = 0;
		var rbi_cnt = 0;
		var total_cnt = 0;

		svgContainer = d3.select("#svg_container").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 600);

       
		//Draw the Rectangle
		var rectangle = svgContainer.append("rect")
		                             .attr("x", base_x)
		                             .attr("y", base_y)
		                            .attr("width", width)
		                            .attr("height", height)
		                            .attr("stroke-width", 10)
                                    .attr("id" , "whole_rect");

		var circle_x = width - 30;
        var circle_y = height - 20;
        var circle_left_offset = 35;
		var r = 15;
       
		var rand_color = "#000";

		
		var poly_offset = 80; 
        var cx = new Array((width / 2) + base_x , width + base_x - poly_offset, (width / 2) + base_x,  poly_offset + base_x);
        var cy = new Array(height + base_y - poly_offset ,(height / 2) + base_y,poly_offset + base_y,(height / 2) + base_y);

        var polygon_data = [];
        for(i = 0;i <4; i++)
        {
        	var item = {"x": cx[i], "y": cy[i]};
        	polygon_data.push(item);
        }
        polygon_data.push({"x": cx[0], "y": cy[0]});

		var lineFunction = d3.svg.line()
                 .x(function(d) { return d.x; })
                 .y(function(d) { return d.y; })
                 .interpolate("linear");

		var lineGraph = svgContainer.append("path")
                    .attr("d", lineFunction(polygon_data))
                    .attr("stroke-width", 2)
                    .attr("fill", "#ccc")
                    .attr("stroke", "#ccc")
                    .attr("display", "none")
                    .attr("id", "path");

		var textData = [
		   { "cx": cx[1] - 30, "cy": cy[1], "radius": 20, "color" : "green", "text" : "1" },
		   { "cx": cx[1] - 30, "cy": cy[1], "radius": 20, "color" : "green", "text" : "1" },
		   { "cx": cx[2] + 20, "cy": cy[2], "radius": 20, "color" : "green", "text" : "2" },
		   { "cx": cx[3] + 20, "cy": cy[3], "radius": 20, "color" : "green", "text" : "3" },
		   { "cx": cx[0] + 20, "cy": cy[0], "radius": 20, "color" : "green", "text" : "4" },
		];

		var line_add = function(fir, sec){
         	var line = svgContainer.append("line")
                  .attr("x1", cx[fir -1]).attr("y1", cy[fir -1])
                  .attr("x2", cx[sec - 1]).attr("y2", cy[sec -1])
                  .attr("stroke-width", 5)
                  .attr("id", "line_add" + fir)
                  .attr("display", "none")
                  .attr("stroke", "#ccc")
                  .attr("line_type", "add");
         }
         
 		var line_fut_add = function(fir, sec){
         	var line = svgContainer.append("line")
                  .attr("x1", cx[fir -1] ).attr("y1", cy[fir -1])
                  .attr("x2", cx[sec - 1] ).attr("y2", cy[sec -1])
                  .attr("stroke-width", 5)
                  .attr("id", "line_fut_add" + fir)
                  .attr("display", "none")
                  .attr("stroke", "#ccc")
                  .attr("line_type", "future");
         }
         
        line_fut_add(1, 2);
 		line_fut_add(2, 3);
 		line_fut_add(3, 4);
 		line_fut_add(4, 1);
		
		line_add(1, 2);
 		line_add(2, 3);
 		line_add(3, 4);
 		line_add(4, 1);


		for(i = 0; i < 4; i++)
	 	{
	 		r = 15;
	 		svgContainer.append("circle")
             .attr("cx", circle_x - i * circle_left_offset)
             .attr("cy", circle_y)
             .attr("r", r)
             .attr("stroke-width", 3)
             .attr("id", "rbi_circle")
             .attr("circle_type", "round_circle")
             .attr("display", "none")
             .attr("stroke", "#ccc");

            r=20;
            var circle1 = svgContainer.append("circle")
             .attr("cx", cx[i]).attr("cy", cy[i]).attr("r", r)
             .attr("stroke-width", 1)
             .attr("id", "hover_pink_circle" + (i + 1))
             .attr("fill", "pink")
             .attr("stroke", "pink")
             .attr("color","pink")
             .attr("stroke","pink")
             .attr("circle_id", (i+1))
             .attr("circle_type", "hover_circle")
             .attr("display", "none");

            r = 15;
         	var circle = svgContainer.append("circle")
             .attr("cx", cx[i]).attr("cy", cy[i]).attr("r", r)
             .attr("stroke-width", 1)
             .attr("id", "hover_grey_circle" + (i + 1))	
             .attr("circle_id", (i + 1))
             .attr("fill", "#ccc")
             .attr("stroke", "#ccc")
             .attr("circle_type", "hover_grey_circle")
             .attr("display", "none");
	 	}

        var rectangle_btn = svgContainer.append("rect")
                         .attr("x", center_x - button_width / 2)
                         .attr("y", center_y - button_height / 2)
                        .attr("width", button_width)
                        .attr("height", button_height)
                        .attr("stroke-width", 10)
                        .attr("stroke", "#ccc")
                        .attr("stroke-width", "3")
                        .attr("id", "rect_btn")
                        .attr("display", "none");


        var at_bat_text = svgContainer.append("text")
                        .text("AT-BAT")
                        .attr("x", center_x)
                        .attr("y", center_y)
                        .attr("font-size", 26)
                        .attr("stroke-width", "1")
                        .attr("stroke", "#ccc")
                        .attr("fill", "#ccc")
                        .attr("text-anchor", "middle")
                        .attr("display", "none")
                        .attr("id", "at_btn");
        
        var pink_circle_hover = function(ind)
        {
         	for(i = 0; i < 4; i++) {
         		var id = "#pink_circle" + i;
         		$(id).css('opacity', '0');
         		if(i == ind)
         			$(id).css('opacity', '1');
         	}
        }

        var show_items = function(bShow)
        {
        	if(bShow)
        	{
            	svgContainer.selectAll("circle[circle_type ='hover_grey_circle']")
             	.attr("display", "");

             	svgContainer.selectAll("circle[circle_type ='round_circle']")
             	.attr("display", "");	

                svgContainer.selectAll("#at_btn").attr("display", "");   
                svgContainer.selectAll("#rect_btn").attr("display", "");   
        	}
        	else
        	{
            	svgContainer.selectAll("circle[circle_type ='hover_grey_circle']")
             	.attr("display", "none");

             	svgContainer.selectAll("circle[circle_type ='round_circle']")
             	.attr("display", "none");	

                svgContainer.selectAll("#at_btn").attr("display", "none");   
                svgContainer.selectAll("#rect_btn").attr("display", "none");   
        	}
        }

        var show_fut_line = function(bShow, id)
        {
        	if(!bShow)
        	{
				svgContainer.selectAll("line[line_type ='future']").attr("display", "none");
        	}
        	else
        	{
				var line_id = "line_fut_add" + id;
				svgContainer.selectAll("#"+line_id).attr("display", "");
        	}
        }

        var check_rbi_count = function()
        {
			$('#dummy').css('color','#000');
        	var color = $('#dummy').css('color');
        	rbi_cnt = 0;

        	svgContainer.selectAll("circle[circle_type='round_circle']")
        	.each(function() {
        		var fill_color = $(this).css("fill");

            	if(fill_color == color)
            		rbi_cnt++;
        	});
        }

        var show_line = function(bShow, id)
        {
        	if(!bShow)
        	{
				svgContainer.selectAll("line[line_type ='add']").attr("display", "none")
				.attr("stroke", "#ccc")
				.attr("fill", "#ccc");

				svgContainer.selectAll("circle[circle_type = 'hover_grey_circle']")
				.attr("stroke", "#ccc")
				.attr("fill", "#ccc");
        	}
        	else
        	{
				var line_id = "line_add" + id;
			
				svgContainer.selectAll("#"+line_id).attr("display", "")
				.attr("stroke", "#000")
				.attr("fill", "#000");

				svgContainer.selectAll("#hover_grey_circle" + id)
				.attr("stroke", "#000")
				.attr("fill", "#000");
        	}
        }

		var draw_content = function()
		{
			var run=0, rbi=0, base=0;
			base = total_cnt;
			rbi = rbi_cnt;

			if((rbi_cnt + base) > 0)
				set_json("PA", 1);

			if(base == 4)
				run = 1;

			var span = $("#content")[0];

			set_json("BASE", base);
            set_json("RBI", rbi);
            set_json("RUN", run);

			var str = "";
			for (i = 0; i < json_obj.length; i++)
				str += json_obj[i].first + " : " + json_obj[i].second + "<br/>";
			span.innerHTML = str;
		}

		var draw_rbi = function()
		{
			svgContainer.selectAll("#rbi_circle").each(function() {
				$('#dummy').css('color','#000');
            	var color = $('#dummy').css('color');

            	var fill_color = $(this).css("fill");

            	if(fill_color != color)
			 		$(this).attr("stroke", "#ccc");
        	});
		}

		var count_lines = function()
		{
			var line_cnt = 0;
			svgContainer.selectAll("line[line_type ='add']").each(function()
			{
				var display = $(this).css("display");
				
				if(display != "none") {
					line_cnt++;
				}
			});						
			return line_cnt;
		}

        svgContainer.selectAll("#whole_rect").on("mouseover" , function() {
            var text_content = svgContainer.selectAll("#at_btn").text();
            set_json_value(text_content);
            
            draw_json_content();

        	draw_rbi();
         	show_items(true);
        });

        svgContainer.selectAll("#whole_rect").on("mouseout" , function() {
            svgContainer.selectAll("#rbi_circle").each(function() {
                $('#dummy').css('color','#000');
                var color = $('#dummy').css('color');

                var fill_color = $(this).css("fill");

                if(fill_color != color)
                    $(this).attr("stroke", "white");
            });
            
//            $("#svg_container #at_btn").css("font-size", "26");
//            $("#svg_container #at_btn").attr("y", "300");
//            svgContainer.selectAll("#at_btn").text("AT-BAT");

            if((prev_circle_pos > 0) || (rbi_cnt > 0)) return;

//            for(i = 0;i < json_obj.length; i++)
//                json_obj[i]["second"] = 0;

            draw_content();            
            
            show_items(false);
        });

        var draw_black_rect = function()
        {
            draw_rbi();
            show_items(true);
            svgContainer.selectAll("#at_btn").attr("stroke", "#000").attr("fill", "#000");
            svgContainer.selectAll("#rect_btn").attr("stroke", "#000");
        }

        var draw_grey_rect = function()
        {
            draw_rbi();
            show_items(true);
            svgContainer.selectAll("#at_btn").attr("stroke", "#ccc").attr("fill", "#ccc");
            svgContainer.selectAll("#rect_btn").attr("stroke", "#ccc");
        }

        svgContainer.selectAll("#rect_btn").on("mouseover" , function() {
            var text_content = svgContainer.selectAll("#at_btn").text();
            set_json_value(text_content);
            
            draw_json_content();

            draw_black_rect();
        });

        svgContainer.selectAll("#rect_btn").on("mouseout" , function() {
            draw_grey_rect();
        });

        svgContainer.selectAll("#at_btn").on("mouseover" , function() {
            var text_content = $(this).text();
            set_json_value(text_content);
            
            draw_json_content();
            
            draw_black_rect();            
        });

        svgContainer.selectAll("#at_btn").on("mouseoout" , function() {
            var text_val =  $(this).text();

            if(text_val == "AT-BAT")
                draw_grey_rect();
            else
                draw_black_rect();
        });
        
       svgContainer.selectAll("#rect_btn").on("click" , function() {
            $("#svg_container").fadeTo(0, 0.1);
            $("#svg_front_container").css("display" , "");
        });

        svgContainer.selectAll("#at_btn").on("click" , function() {
            $("#svg_container").fadeTo(0, 0.1);
            $("#svg_front_container").css("display" , "");
        });

        svgContainer.selectAll("circle[circle_type ='hover_grey_circle']").on("click", function(d) {
         	var id = $(this).attr("circle_id");
         	prev_circle_pos = id;
			
			if(id == 1) 
			{
				if(total_cnt == 4)
             	{
             		total_cnt = 0;
             		prev_circle_pos = 0;
             		show_line(false, 0);
             		show_fut_line(false, 0);
             		draw_content();
            		$(this).attr("stroke", "#ccc").attr("fill","#ccc"); 		
            		$("#path").attr("display", "none");
             		return;
             	}
             	else{
             		id =5;
             		$("#path").attr("display", "");
             	}
			}

			show_fut_line(false, id);
			show_line(false, id);

			total_cnt = 0;
			for(i = 1; i<id; i++)
			{
				total_cnt++;
				show_line(true, i);
			}
			
			draw_content();
			$(this).attr("stroke", "#000").attr("fill","#000");
		 });

        var check_related_line = function(id)
        {
        	if(id == 0)	return true;
        	var line_id = "line_add" + id;

			var line_display = svgContainer.selectAll("#"+line_id).attr("display");
			if(line_display != "none")
				return true;	
			else
				return false;

        }

		svgContainer.selectAll("circle[circle_type ='hover_grey_circle']").on("mouseover", function() {
            var text_content = svgContainer.selectAll("#at_btn").text();
            set_json_value(text_content);
            
            draw_json_content();

			draw_rbi();
		 	var id = $(this).attr("circle_id");

		 	show_items(true);

     		$("#hover_pink_circle" + id).attr("display", "");
     		             		
 			var grey_end_line_id = 0, grey_start_line_id = 0;
 			var add_end_line_id = 0, add_start_line_id = 0;

 			start_line_id = 1;

 			if(total_cnt == 4)
     		{
     			if(id == 1)
     			{
             		grey_start_line_id = 1;
     				grey_end_line_id = 5;	

     				add_start_line_id = 0;
 					add_end_line_id = 0;
     			}
     			else
     			{
					grey_start_line_id = 1;
     				grey_end_line_id = id;	

     				add_start_line_id = 1;
 					add_end_line_id = id;
     			}
     			$("#path").attr("display", "none");
     		}
     		else
     		{
         		if(id == 1) {
         			id =5;
         		}

     			if(id > prev_circle_pos) {
     				
     				grey_start_line_id = 1;
     				grey_end_line_id = id;

     				add_start_line_id = 1;
     				add_end_line_id = prev_circle_pos;
     				if(id == 5)
     					$("#path").attr("display", "");
     				else
     					$("#path").attr("display", "none");
     			}
     			else
     			{
     				grey_start_line_id = 1;
     				grey_end_line_id = id;

     				add_start_line_id = 1;
     				add_end_line_id = id;
     				$("#path").attr("display", "none");
     			}
     		}
			
			show_fut_line(false, 0);
			show_line(false, 0);

 			for(i = grey_start_line_id;i <grey_end_line_id; i++)
     			show_fut_line(true, i);

     		for(i = add_start_line_id;i <add_end_line_id; i++) {
     			show_line(true, i);
     			$("#hover_grey_circle" + i).attr("stroke", "#000").attr("fill","#000");	
     			$("#hover_grey_circle" + (i + 1)).attr("stroke", "#000").attr("fill","#000");	
     		}
         	
         	//$("#path").attr("display", "none");	
         	$(this).attr("stroke", "#000").attr("fill","#000");	
		 });

		 svgContainer.selectAll("circle[circle_type ='hover_grey_circle']").on("mouseout", function(){
		 	draw_rbi();
		 	svgContainer.selectAll("circle[circle_type ='hover_circle']")
         	.attr("display", "none");

         	svgContainer.selectAll("circle[circle_type ='hover_grey_circle']")
         	.attr("stroke", "#ccc").attr("fill", "#ccc");

         	show_fut_line(false, 0);

         	var id = $(this).attr("circle_id");
         	var related_line = check_related_line(id - 1);

         	for(i = 1; i <= total_cnt; i++) {
         		show_line(true, i);
         		var fir_id = i, sec_id = i+1;
         		$("#hover_grey_circle" + fir_id).attr("stroke", "#000").attr("fill","#000");
         		$("#hover_grey_circle" + sec_id).attr("stroke", "#000").attr("fill","#000");
         	}
         	if(total_cnt == 4)
         		$("#path").attr("display", "");
         	else
         		$("#path").attr("display", "none");
		 });

		 svgContainer.selectAll("#rbi_circle").on("mouseover", function(d) {
            var text_content = svgContainer.selectAll("#at_btn").text();
            set_json_value(text_content);
            
            draw_json_content();
		 	draw_rbi();
			$(this).attr("stroke", "#000") ;

		 	show_items(true);
		 });

		 svgContainer.selectAll("line").on("mouseout", function(){
		 	draw_rbi();
		 });

		 svgContainer.selectAll("line").on("mouseover", function(d) {
            var text_content = svgContainer.selectAll("#at_btn").text();
            set_json_value(text_content);
            
            draw_json_content();
		 	draw_rbi();
		 });

		 svgContainer.selectAll("#rbi_circle").on("mouseout", function(d) {
		 	$('#dummy').css('color','#000');
        	var color = $('#dummy').css('color');

        	var fill_color = $(this).css("fill");

        	if(fill_color != color)
		 		$(this).attr("stroke", "#ccc") ;

		 	show_items(true);
		 });
		
		svgContainer.selectAll("#rbi_circle").on("click", function(d) {
			$(this).attr("stroke", "#000") ;
        	show_items(true);

        	$('#dummy').css('color','white');
        	var color = $('#dummy').css('color');

        	var fill_color = $(this).css("fill");

        	if(fill_color == color)
        		$(this).css("fill", "#000");
        	else
        		$(this).css("fill", "white");

        	check_rbi_count();
        	draw_content();
		 });
		draw_content();
});