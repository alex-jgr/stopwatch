(function ( $ ) {
    var timers = [];
    $.fn.stopwatch = function(options) {
        var defaultTemplate = "<div class=\"btn-group\">"
                            +      "<button class=\"btn btn-success start-count\" id=\"start-{{id}}\" data-timer_id=\"{{id}}\" type=\"button\">"
                            +          "<i class=\"glyphicon glyphicon-time\"></i> <i class=\"glyphicon glyphicon-play\"></i>"
                            +      "</button>"
                            +      "<button class=\"btn btn-warning stop-count disabled\" id=\"stop-{{id}}\" data-timer_id=\"{{id}}\">"
                            +          "<i class=\"glyphicon glyphicon-stop\"></i>"
                            +      "</button>"
                            +  "</div>"
                            +  "<input class=\"timer form-control pull-right\" id=\"timer-{{id}}\" data-limit=\"{{limit}}\" data-elapsed=\"{{elapsed}}\" type=\"text\"/>";
        var settings;
        
        if (!$(this).hasClass("has-timer")) {
            var timer = new initStopwatch(this, options);
            timers[timer.timerId] = timer;
        } else {
            if (options === "getTimeValue") {
                return timers[$(this).attr("id")].getTimeValue;
            }
        }
               

        
        function initStopwatch(element, options) {
            
            var elementId = $(element).data("id");
            
            settings = $.extend({
                id :                elementId,
                limit:              parseInt($(element).data("limit")),
                elapsed:            parseInt($(element).data("elapsed")),
                countdown:          $(element).data("countdown"),
                hiddenInput:        true,
                onLimitReached:     function(){},
                onStart:            function(){},
                onStop:             function(){},
                stopwatchTemplate:  defaultTemplate,
                splitTimeString:    false,
                replaceElements:    {
                    timeValue:  {
                        selector:   "#timer-" + elementId,
                        type:       "val"
                    },
                    hours:      {
                        selector:   "#timer-hours-" + elementId,
                        type:       "html"
                    },
                    minutes:    {
                        selector:   "#timer-minutes-" + elementId,
                        type:       "html"
                    },
                    seconds:    {
                        selector:   "#timer-seconds-" + elementId,
                        type:       "html"
                    },
                    sign:       {
                        selector:   "#timer-sign-" + elementId,
                        type:       "html"
                    }
                }
            }, options);
            
            if ($(element).html().length < 10) {
                var timeValue = getTimeValue();
                var html = settings.stopwatchTemplate.replace(/{{id}}/g, settings.id);
                html = html.replace(/{{limit}}/g, settings.limit);
                html = html.replace(/{{elapsed}}/g, settings.elapsed);
                $(element).html(html);
                
                if (settings.splitTimeString) {
                    
                    if (settings.replaceElements.hours.type === "val") {
                        $(settings.replaceElements.hours.selector).val(timeValue.hours);
                    } else {
                        $(settings.replaceElements.hours.selector).html(timeValue.hours);
                    }
                    
                    if (settings.replaceElements.minutes.type === "val") {
                        $(settings.replaceElements.minutes.selector).val(timeValue.minutes);
                    } else {
                        $(settings.replaceElements.minutes.selector).html(timeValue.minutes);
                    }
                    
                    if (settings.replaceElements.seconds.type === "val") {
                        $(settings.replaceElements.seconds.selector).val(timeValue.seconds);
                    } else {
                        $(settings.replaceElements.seconds.selector).html(timeValue.seconds);
                    }
                    
                    if (settings.replaceElements.sign.type === "val") {
                        $(settings.replaceElements.sign.selector).val(timeValue.sign);
                    } else {
                        $(settings.replaceElements.sign.selector).html(timeValue.sign);
                    }
                    
                } else {
                    if (settings.replaceElements.timeValue.type === "val") {
                        $(settings.replaceElements.timeValue.selector).val(timeValue);
                    } else {
                        $(settings.replaceElements.timeValue.selector).html(timeValue);
                    }
                }
            }
            
            function startCounting() {
                return setInterval(function(){count();}, 1000);
            }

            function getTimeValue()
            {
                var time, hours, minutes, seconds;
                var minus = "";
                if (settings.countdown === true) {
                    if (settings.limit >= settings.elapsed) {
                        time    = new Date((settings.limit - settings.elapsed) * 1000);
                    } else {
                        time    = new Date((settings.limit - settings.elapsed) * (-1000));
                        minus   = "-";
                    }
                } else {
                    time    = new Date(settings.elapsed * 1000);
                }
                if (settings.limit === settings.elapsed) {
                    settings.onLimitReached(settings.id);
                }
                hours   = time.getUTCHours();
                minutes = time.getUTCMinutes();
                seconds = time.getUTCSeconds();
                
                if (settings.splitTimeString) {
                    this.timeValue = {
                        hours:      (hours < 10)    ? ("0" + hours)     : hours,
                        minutes:    (minutes < 10)  ? ("0" + minutes)   : minutes,
                        seconds:    (seconds < 10)  ? ("0" + seconds)   : seconds,
                        sign:       minus
                    };
                    return this.timeValue;
                } else {
                    this.timeValue = minus + ((hours < 10) ? ("0" + hours) : hours) + ":" + ((minutes < 10) ? ("0" + minutes) : minutes) + ":" + ((seconds < 10) ? ("0" + seconds) : seconds);
                    return this.timeValue;
                }
            }
            
            this.getTimeValue = getTimeValue();
            
            function count(){
                var display = getTimeValue();
                $("#timer-" + settings.id).val(display);
                settings.elapsed ++;
            }
            
            $(element).addClass("task-timer-" + settings.id);
            $(element).addClass("has-timer");
            
            $(".task-timer-" + settings.id).on("click", "#start-" + settings.id, function(){
                settings.counter = startCounting();
                $("#start-" + settings.id).addClass("disabled");
                $("#stop-" + settings.id).removeClass("disabled");
                settings.onStart(settings.id);
            });

            $(".task-timer-" + settings.id).on("click", "#stop-" + settings.id, function(){
                clearInterval(settings.counter);
                $("#start-" + settings.id).removeClass("disabled");
                $("#stop-" + settings.id).addClass("disabled");
                settings.onStop({id: settings.id, elapsed: settings.elapsed});
            });
            
            this.timerId = "task-timer-" + settings.id;
        }
    };
}(jQuery));