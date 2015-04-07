# stopwatch
This is a Javascript stopwatch.
Basic usage example: 

$(".task-timer").each(function(){
        $(this).stopwatch({
            onStart: function(id){
              // your code here
            },
            onStop : function(data){
              // your code here
            },
            onLimitReached: function(id){
                // your code here
            }
        });
});
