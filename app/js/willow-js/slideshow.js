



class Slideshow {
    constructor (data) {
        var cardHolder = new Sprite({
            id:data.id + "-cardHolder",
            class:      data.class,
            container:data.container
        });

        this.cardHolder = cardHolder;
        this.obj = cardHolder;
        
        cardHolder.counter = data.counter;
        cardHolder.numberOfitem = data.images.length;
        cardHolder.width = data.width;
        //cardHolder.height = data.height;
        cardHolder.counter = data.images.length;

        var _i = 0;
        for (var j = 0; j < 3; j++)
        {
            for (var i = 0; i < data.images.length; i++)
            {
            var box = new Sprite({
                id:data.id + "-cardHolder-box-" + _i,
                class: "ss-box-style",
                container:cardHolder.obj,
                width: data.width
                });

                box.obj.setAttribute('data-index-number', _i);

                var cardPic = new Sprite({
                    id: data.id + "-cardHolder-box-cardpic-" + _i,
                    container:box.obj,
                    image: data.images[i],
                    class: "picStyle"
                });
                _i ++;
            }
        }


        TweenMax.set(cardHolder.obj, {delay:0,x:-(data.images.length * data.width)});
        //return cardHolder;
        return this;
    }

    move (data) {
        var cardHolder = this.cardHolder;
        var animationDuration;
        var displacement;

        var whichDirection = data.direction;
        
        if (data.duration) { animationDuration = data.duration;} else { animationDuration = 0.75; }
        if (data.delta) { displacement = data.delta; } else { displacement = cardHolder.width;}
        
        if ((whichDirection == "forward") || (whichDirection == "left")) {cardHolder.counter --;}
        else if ((whichDirection == "reverse") || (whichDirection == "right")) {cardHolder.counter ++;}

    
        TweenMax.to(cardHolder.obj, animationDuration, {
        x: -(cardHolder.counter * displacement), 
        ease:Power4.easeInOut,
        onComplete:checkForDeltaX,
        onCompleteParams:[cardHolder]
        });
        

        function checkForDeltaX (ss) {

            function calculateMatrixX_Distance (whichOne) {
                var stripStyle = window.getComputedStyle(whichOne, null);
                var stripTransform = stripStyle.getPropertyValue("-webkit-transform") ||
                                    stripStyle.getPropertyValue("-moz-transform") ||
                                    stripStyle.getPropertyValue("-ms-transform") ||
                                    stripStyle.getPropertyValue("-o-transform") ||
                                    stripStyle.getPropertyValue("transform");
    
                if (stripTransform){
                    var values = stripTransform.split('(')[1];
                    values = values.split(')')[0];
                    values = values.split(',');
                    return values[4];
                }
            }
    
            var deltaX = calculateMatrixX_Distance (ss.obj);
            if (deltaX <= -(ss.width * (ss.numberOfitem + 1)))
            {
                ss.counter = 1;
                TweenMax.set(ss.obj,{x:-ss.width});
            }
            if (deltaX >= 0)
            {
                ss.counter = ss.numberOfitem;
                TweenMax.set(ss.obj,{x:-(ss.width * ss.numberOfitem)});
            }
        }
    
    } 
}
	
	
	// Usage 
	
	
            
            
            
/*. scss style for this



*/
    
	
	
	