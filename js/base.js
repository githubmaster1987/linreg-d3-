var center_x = 300;
var center_y = 300;
var base_x = 50;
var base_y = 50;
var width = 500;
var height = 500;
var button_width = 200;
var button_height = 100;
var front_svgContainer;
var svgContainer;
var larget_show = false;
var json_obj = [
				{"first" : "BASE", "second" : 0},
                {"first" : "PA", "second" : 0},
				{"first" : "AB", "second" : 0},
				{"first" : "H", "second" : 0},
				{"first" : "RUN", "second" : 0},
				{"first" : "RBI", "second" : 0},
				{"first" : "1B", "second" : 0},
                {"first" : "2B", "second" : 0},
				{"first" : "3B", "second" : 0},
				{"first" : "HR", "second" : 0},
				{"first" : "BB", "second" : 0},
				{"first" : "SAC", "second" : 0},
				{"first" : "OUT", "second" : 0},
			];

var set_json = function(key, value)
{
	var flg = false
    for(i = 0; i < json_obj.length; i++)
    {
        if(json_obj[i]["first"] == key) {
            json_obj[i]["second"] = value;
            flg = true;
      //      console.log(key + " :" + value);
            return;
        }
    }
    //if(!flg)	console.log(key + " is failed");
}
var draw_json_content = function()
{
    var span = $("#content")[0];
    var str = "";
    for (i = 0; i < json_obj.length; i++)
        str += json_obj[i].first + " : " + json_obj[i].second + "<br/>";
    span.innerHTML = str;
}

var set_json_value = function(text_content)
{
    set_json("PA", 1);

    if(text_content == "1B")
    {
        set_json("AB", 1);
        set_json("H", 1);
        set_json("1B", 1);
    }
    else if(text_content == "2B")
    {
        set_json("AB", 1);
        set_json("H", 1);
        set_json("2B", 1);
    }
    else if(text_content == "3B")
    {
        set_json("AB", 1);
        set_json("H", 1);
        set_json("3B", 1);
    }
    else if(text_content == "HR")
    {
        set_json("AB", 1);
        set_json("H", 1);
        set_json("HR", 1);
    }
    else if(text_content == "BB")
    {
        set_json("BB", 1);
    }
    else if(text_content == "SAC")
    {
        set_json("SAC", 1);
        set_json("OUT", 1);
    }
    else if((text_content == "K") || (text_content == "GO") || (text_content == "LO") 
        || (text_content == "PO") || (text_content == "FO") || (text_content == "GIDP") 
        || (text_content == "LIDP") || (text_content == "FC")  || (text_content == "FR"))
    {
        set_json("OUT", 1);
        set_json("AB", 1);
    }
}