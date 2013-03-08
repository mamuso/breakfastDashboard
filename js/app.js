var Dashboard = {

	// refresh every 20 seconds
	refresh: 10000,
	
	init:function() {
		for(i=0; i<Config["BusStop"].length; i++) {
			// generate a unique id
			var id = "Dashboard_" + Config["BusStop"][i]["StopId"] + "_" + (new Date().getTime());
			// paint the row
			this.paintRow(id, Config["BusStop"][i]["Alias"], (i%2 == 0 ? "even" : "odd"));
			// make it work!
			this.callAPI(Config["BusStop"][i]["StopId"], Config["BusStop"][i]["Lines"], id);
		};
	},
	
	paintRow:function(id, title, cls) {
		$('#tmplDashboard').tmpl({"id": id, "title": title, "class": cls}).appendTo($('#content'));
	},
	
	callAPI:function(stopId, lines, id) {
		// Using a Proxy to get the data
		var proxy = "http://ohmyjson.appspot.com/proxy?url=https%3A%2F%2Fservicios.emtmadrid.es%3A8443%2Fgeo%2Fservicegeo.asmx%2FgetArriveStop%3FidClient%3DWEB.PORTALMOVIL.OTROS%26passKey%3D0810DDE4-02FC-4C0E-A440-1BD171B397C8%26statistics%3D%26cultureInfo%3D%26idStop%3D";
		// Call!
		$.ajax({
		  type: 'GET',
		  url: proxy + stopId + "%26time=%3D" + (new Date().getTime()), // Avoid cache problems
		  dataType: 'jsonp',
		  success: function(data){
			var arrives = data["Arrives"]["Arrive"],
				a = 0;
			
				// reset
				$("#" + id + " i").html("");

			for(i=0;i<arrives.length;i++) {
				mins = ("0" + Math.floor(arrives[i]["TimeLeftBus"]["$"]/60)).slice(-2);
				mins = (mins > 20 ? "<b>+</b>20":mins);
				if(a < 2 && lines.indexOf(arrives[i]["idLine"]["$"]) > -1){
					if(a == 0) {
						$("#" + id + " strong").html(mins);
					} else {
						$("#" + id + " i").html("Next: " + mins + "m");
					}
					a++;
				}
			}
		  },
		  error: function(xhr, type){
		    console.log("Bad boy :/");
		  }
		});
		// Refresh!
		setTimeout(function(){Dashboard.callAPI(stopId, lines, id)}, Dashboard.refresh);
	}	
};

$(function($){
	Dashboard.init();
});
