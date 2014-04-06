var api_root = "http://c2952e3a-4e6a01aaa4c0.my.apitools.com/1.1/";

var Tweets  = {
	getTrendingTopics: function(cb){
		// var api_url = "https://api.twitter.com/1.1/trends/place.json?id=2487956"; //SF id
		var api_url = api_root+"trends/place.json?id=2487956"
		$.ajax({
	        type: "GET",
	        url: api_url,
	        dataType: "jsonp",
	        success: function (response, status, xhr) {
              cb(response[0].trends);
	        },
	        error: function (xhr, err) {
	          console.log(xhr);
	          console.log(xhr.statusText);
	        }
		});
	},
	getLocatedTweets: function(query,nb,cb){
		var lat =37.7833;
		var lon = -122.4167;
		var radius = 5;
		console.log(query);
		var api_url = api_root+"search/tweets.json";
		api_url+="?q="+encodeURIComponent(query);
		var geoloc = lat+","+lon+","+radius+"km"
		api_url+="&geocode="+encodeURIComponent(geoloc);
		api_url+="&count="+nb;
		api_url+="&result_type=popular";
		console.log(api_url);
		$.ajax({
	        type: "GET",
	        url: api_url,
	        dataType: "jsonp",
	        success: function (response, status, xhr) {
              cb(response.statuses);
	        },
	        error: function (xhr, err) {
	          console.log(xhr);
	          console.log(xhr.statusText);
	        }
		});

	},
	getTweetsByTag: function(query,nb,cb){
		var api_url = api_root+"search/tweets.json";
		api_url+="?q="+encodeURIComponent(query);
		api_url+="&count="+nb;
		api_url+="&result_type=popular";
		console.log("getTweetsByTag", api_url);
		$.ajax({
	        type: "GET",
	        url: api_url,
	        dataType: "jsonp",
	        success: function (response, status, xhr) {
              cb(response.statuses)
	        },
	        error: function (xhr, err) {
	          console.log(xhr);
	          console.log(xhr.statusText);
	        }
		});
	},
	getManyTweets: function(nb, cb){
		var all_tweets=[];
		var allDone = barrier(9,function(){
			console.log("ALL TWEETS", all_tweets);
			cb(all_tweets);
		});

		// Tweets.getTrendingTopics(function(data){
			//FAKE DATA
			var data =[
			    {
			        "trends": [
			            {
			                "name": "#BuyBuckWildOniTunes",
			                "query": "%23BuyBuckWildOniTunes",
			                "url": "http://twitter.com/search?q=%23BuyBuckWildOniTunes",
			                "promoted_content": null
			            },
			            {
			                "name": "#WWEHOF",
			                "query": "%23WWEHOF",
			                "url": "http://twitter.com/search?q=%23WWEHOF",
			                "promoted_content": null
			            },
			            {
			                "name": "Yuvi",
			                "query": "Yuvi",
			                "url": "http://twitter.com/search?q=Yuvi",
			                "promoted_content": null
			            },
			            {
			                "name": "Aaron Harrison",
			                "query": "%22Aaron+Harrison%22",
			                "url": "http://twitter.com/search?q=%22Aaron+Harrison%22",
			                "promoted_content": null
			            },
			            {
			                "name": "Captain America",
			                "query": "%22Captain+America%22",
			                "url": "http://twitter.com/search?q=%22Captain+America%22",
			                "promoted_content": null
			            },
			            {
			                "name": "#FinalFour",
			                "query": "%23FinalFour",
			                "url": "http://twitter.com/search?q=%23FinalFour",
			                "promoted_content": null
			            },
			            {
			                "name": "Kentucky",
			                "query": "Kentucky",
			                "url": "http://twitter.com/search?q=Kentucky",
			                "promoted_content": null
			            },
			            {
			                "name": "Starbucks",
			                "query": "Starbucks",
			                "url": "http://twitter.com/search?q=Starbucks",
			                "promoted_content": null
			            },
			            {
			                "name": "#UConn",
			                "query": "%23UConn",
			                "url": "http://twitter.com/search?q=%23UConn",
			                "promoted_content": null
			            },
			            {
			                "name": "Taco Bell",
			                "query": "%22Taco+Bell%22",
			                "url": "http://twitter.com/search?q=%22Taco+Bell%22",
			                "promoted_content": null
			            }
			        ],
			        "as_of": "2014-04-06T18:46:18Z",
			        "created_at": "2014-04-06T18:40:30Z",
			        "locations": [
			            {
			                "name": "San Francisco",
			                "woeid": 2487956
			            }
			        ]
			    }
			];
			var trending_topics = data;
			for(var i=0;i<trending_topics.length-1;i++){
				console.log('trending',trending_topics[i]);
				var tweets =Tweets.getLocatedTweets(trending_topics[i].name,nb,function(tweets_data){
					all_tweets= all_tweets.concat(tweets_data);
					allDone();
				});
			}
	}
}
