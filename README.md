# stopwatch
This is a Javascript stopwatch.
Basic usage example: 


            $(".timer").stopwatch({
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

A timer with all available options:

		$(".timer").stopwatch({
                    id :                "timer1",
                    limit:              3600,
                    elapsed:            1800,
                    countdown:          true,                    
                    onLimitReached:     function(id, jsInterval){},
                    onStart:            function(id, jsInterval){},
                    onStop:             function(data){},
                    stopwatchTemplate:  "an html template here",
                    splitTimeString:    false,
                    replaceElements:    {
                        timeValue:  {
                            selector:   "#timer-1",
                            type:       "val"
                        },
                        hours:      {
                            selector:   "#timer-hours-1",
                            type:       "html"
                        },
                        minutes:    {
                            selector:   "#timer-minutes-1",
                            type:       "html"
                        },
                        seconds:    {
                            selector:   "#timer-seconds-1",
                            type:       "html"
                        },
                        sign:       {
                            selector:   "#timer-sign-1",
                            type:       "html"
                        }
                    }
          });
Optionis:
**id** - Is an id to identify the timer element

**limit** - A limit in seconds. It is similar to an end time for the stop watch. The timer will keep counting anyway until the stop button is pressed, but if a callback is set for the *onLimitReached* event, then the callback will be executed. 

If **countdown**  is set to *true*, the counting will go down starting from the **elapsed** until the **limit** is reached. Then a minus sign would appear in front of the timer. It will execute the *onLimitReached* callback and continue to count beneath zero.

**stopwatchTemplate** - an html template that would replace the default template. Just make sure you use the data attributes in there and the **replaceElements** - the default or your own elements.
If **splitTimeString** is set to *true*, the time string will be divided into: sign, hours, minutes and seconds and the plugin will fill the ***replaceElements*** defined for these fields with their values. If it is set to false, only the ***timeValue*** will be used. The ***type*** of the replaceElements determines whether to use the jQuery val() function to fill the value of the given replaceElement or the jQuery html() function to fill the inner html of that element.

**onStart** - callback to execute when the timer starts counting.

**onStop** - callback to execute when the timer stops counting.

**onLimitReached** - callback to execute when the **limit** has been reached. 

The ***jsInterval*** from the parameters a regular javascript interval that can be stopped by calling *clearInterval(jsInterval);*

If no optioins will be given for the  **replaceElements** the default behavior will be to replace the numbers at the end in this example with the **id**, so "#timer-hours-1" will be "#timer-hours-timer1".

The default html for the **stopwatchTemplate** looks like this: 
<pre>
<code>
<div class="btn-group">
        <button class="btn btn-success start-count" id="start-{{id}}" data-timer_id="{{id}}" type="button">"
                <i class="glyphicon glyphicon-time"></i> <i class="glyphicon glyphicon-play"></i>
        </button>
        <button class="btn btn-warning stop-count disabled" id="stop-{{id}}" data-timer_id="{{id}}">
                <i class="glyphicon glyphicon-stop"></i>
        </button>
</div>
<input class="timer form-control pull-right" id="timer-{{id}}" data-limit="{{limit}}" data-elapsed="{{elapsed}}" type="text"/>
</code>
</pre>
