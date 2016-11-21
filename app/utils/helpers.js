var axios = require('axios');

var helpers = {
	nyt : function(text, start, end) {
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ text +"&begin_date=" + start + "&end_date="+ end +"&api-key="
		return axios.get(url);
	}

}

module.exports = helpers;
