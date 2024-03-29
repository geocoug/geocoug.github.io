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
         $(repos).each(function() {
             if (this.name != (username.toLowerCase()+'.github.com')) {
                 if (this.name == 'Task-Tracker') {}
                 else {
                     list.append('<dt><strong><a href="'+ (this.homepage?this.homepage:this.html_url) +'" target="_blank">' + this.name + '</a></strong> <em>'+(this.language?('('+this.language+')'):'')+'</em></dt>');
                     if (this.description == null) {
                         list.append('<dd style="margin-bottom:20px;"></dd>')
                     }
                     else {
                         list.append('<dd style="margin-bottom:20px;">' + this.description +'</dd>');
                     }
                 }
             }
         });
       });
 
     function sortByName(repos) {
         repos.sort(function(a,b) {
         return a.name - b.name;
        });
     }
 };
 