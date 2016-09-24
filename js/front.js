$(function(){
        var prev_circle_pos = 0;
        var rbi_cnt = 0;
        var total_cnt = 0;
        front_svgContainer = d3.select("#svg_front_container").append("svg")
                                 .attr("width", 600)
                                 .attr("height", 600);

        var rectangle = front_svgContainer.append("rect")
                         .attr("x", base_x)
                         .attr("y", base_y)
                        .attr("width", width)
                        .attr("height", height)
                        .attr("stroke-width", 10)
                        .attr("fill-opacity", "0.1");

        var rectangle_close = front_svgContainer.append("rect")
                         .attr("x", base_x + width - 50)
                         .attr("y", base_y + 10)
                        .attr("width", 40)
                        .attr("height", 40)
                        .attr("stroke-width", 2)
                        .attr("stroke", "#ccc")
                        .attr("rect_type", "close");

        var line_close1 = front_svgContainer.append("line")
                         .attr("x1", base_x + width - 40)
                         .attr("y1", base_y + 20)
                         .attr("x2", base_x + width - 20)
                         .attr("y2", base_y + 40)
                         .attr("stroke-width", "2")
                         .attr("line_type", "close");
        
        var line_close2 = front_svgContainer.append("line")
                         .attr("x1", base_x + width - 20)
                         .attr("y1", base_y + 20)
                         .attr("x2", base_x + width - 40)
                         .attr("y2", base_y + 40)
                         .attr("stroke-width", "2")
                         .attr("line_type", "close");                         
        
        var hits_text = front_svgContainer.append("text")
                        .text("HITS")
                        .attr("dx", function(d){return -20})
                        .attr("x", base_x + 60)
                        .attr("y", base_y + 60)
                        .attr("font-size", 26)
                        .attr("stroke-width", "1")
                        .attr("stroke", "#ccc")
                        .attr("fill", "#ccc")
                        .attr("text-decoration", "underline");

        var outs_text = front_svgContainer.append("text")
                        .text("OUTS")
                        .attr("dx", function(d){return -20})
                        .attr("x", base_x + width - 200)
                        .attr("y", base_y + 60)
                        .attr("font-size", 26)
                        .attr("stroke-width", "1")
                        .attr("stroke", "#ccc")
                        .attr("fill", "#ccc")
                        .attr("text-decoration", "underline");
        
        var text_array = new Array("1B", "K", "SAC", "2B", "GO", "GIDP", "3B", "LO", "LIDP", "HR", "PO", "FC", "BB", "FO", "FR");
        var text_pos_offset = 180;
        var text_obj_array = [];
        var rect_obj_array = [];

        for(i = 0; i < 15; i++) {
                rect_obj_array[i] = front_svgContainer.append("rect")
                         .attr("x", base_x + text_pos_offset * (i % 3) + 25)
                         .attr("y", base_y + Math.trunc(i / 3) * 70 + 110)
                        .attr("width", 90)
                        .attr("height", 50)
                        .attr("stroke-width", 2)
                        .attr("stroke", "#fff")
                        .attr("id", i)
                        .attr("fill-opacity", "0")
                        .attr("stroke-opacity", "0")
                        .attr("rect_type", "text_rect");

                text_obj_array[i] = front_svgContainer.append("text")
                        .text(text_array[i])
                        .attr("x", base_x + text_pos_offset * (i % 3) + 70)
                        .attr("y", base_y + Math.trunc(i / 3) * 70 + 150)
                        .attr("font-size", 30)
                        .attr("stroke-width", "1")
                        .attr("stroke", "#000")
                        .attr("fill", "#000")
                        .attr("text-anchor", "middle")
                        .attr("id", i)
                        .attr("text_type", "text");
        }
    
        var close = function()
        {
            $("#svg_container").fadeTo(0, 1);
            $("#svg_front_container").css("display" , "none");
            front_svgContainer.selectAll("rect[rect_type='text_rect']").attr("stroke", "#fff").attr("fill", "#fff").attr("stroke-opacity", "0").attr("fill-opacity", "0");
            front_svgContainer.selectAll("text[text_type='text']").attr("fill", "#000").attr("stroke", "#000");
        }


        front_svgContainer.selectAll("text[text_type='text']").on("mouseover" , function() {
            var text_id = $(this).attr("id");
             $(this).attr("fill", "#fff").attr("stroke", "#fff");
            front_svgContainer.selectAll("rect[id='" + text_id + "']").attr("stroke", "#FF69B4").attr("fill", "#FF69B4").attr("stroke-opacity", "1").attr("fill-opacity", "1");
        });

        front_svgContainer.selectAll("text[text_type='text']").on("mouseout" , function() {
            var text_id = $(this).attr("id");
            $('#dummy').css('color','#000');
            var color = $('#dummy').css('color');

            var fill_color = $(this).css("fill");

            if(fill_color == color)
                return;               
            
            $(this).attr("stroke", "#000").attr("fill", "#000").attr("stroke-opacity", "1").attr("fill-opacity", "1");
            front_svgContainer.selectAll("rect[id='" + text_id + "']").attr("fill", "#fff").attr("stroke", "#fff").attr("stroke-opacity", "0").attr("fill-opacity", "0");
        });

        front_svgContainer.selectAll("text[text_type='text']").on("click" , function() {
            var text_id = $(this).attr("id");

            front_svgContainer.selectAll("rect[rect_type='text_rect']").attr("stroke", "#fff").attr("fill", "#fff").attr("stroke-opacity", "0").attr("fill-opacity", "0");
            front_svgContainer.selectAll("text[text_type='text']").attr("fill", "#000").attr("stroke", "#000");
            //front_svgContainer.selectAll("rect[id='" + text_id + "']").attr("fill", "#FF69B4").attr("stroke-opacity", "1").attr("fill-opacity", "1");;
            $("#svg_container #at_btn").html($(this).text());
            $("#svg_container #at_btn").css("font-size", "60");
            $("#svg_container #at_btn").attr("y", "320");
            //$(this).attr("stroke", "#fff").attr("fill", "#fff");

            var text_content = $(this).text();
            set_json_value(text_content);
            draw_json_content();

            $("#svg_container").fadeTo(0, 1);
            $("#svg_front_container").css("display" , "none");
        });

        
        front_svgContainer.selectAll("rect[rect_type='close']").on("click" , function() {
            close();
        });

        front_svgContainer.selectAll("line[line_type='close']").on("click" , function() {
            close();
        });

       
});