jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        sortByName(repos);

        var list = $('<dl/>');
        target.empty().append(list);

        var col_index = 1;
        $(repos).each(function() {
            if (this.name != (username.toLowerCase()+'.github.com')) {
                var card_url = 'https://github-readme-stats.vercel.app/api/pin/?username=geocoug&repo=' + this.name + '&theme=dracula';
                list.append('<a href="' + this.html_url + '" style="text-decoration:none"><img style="margin:auto;padding:8px;" src="' + card_url + '" /></a>');
            }
        });
      });

    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};
