

class Slideshow {

    constructor (data) {

        var intervalTimer;
        this.intervalTimer = intervalTimer;
        var scope = this;
        scope.id = data.id;

        // var globalData = window['slideData_' + data.id] = {
        //     index: 0,
        //     id: data.id,
        //     total: data.images.length,
        //     location: data.images
        // }

       // scope.data = globalData;

        var cardHolder = new Sprite({
            id:data.id,
            class:      data.class,
            container:data.container
        });

        this.cardHolder = cardHolder;
        this.obj = cardHolder;
        
        cardHolder.counter = data.counter;
        cardHolder.numberOfitem = data.images.length;
        cardHolder.counter = data.images.length;

        var eachImgWidth;

        if (data.responsive) {
            eachImgWidth = data.container.offsetWidth;

            window.addEventListener("resize", function () {
                eachImgWidth = data.container.offsetWidth;
                scope.resize({width: eachImgWidth});
            });
        }
        else {
            eachImgWidth = data.width;
        }

        if (data.auto) {

            var countTracker = 0;
            var slideMoveDuration = 0.75;

            if (data.auto.duration) {slideMoveDuration = Number(data.auto.duration / 1000);}

            if (data.auto.initialdelay) {
                setTimeout(function(){ 
                    lauchAutoSlideshow ();
                 }, data.auto.initialdelay);
            }

            else { lauchAutoSlideshow (); }

            function lauchAutoSlideshow () {
                scope.intervalTimer = setInterval(function(){ 
                    scope.move({
                        direction: data.auto.direction,
                        duration: slideMoveDuration,
                        pause: false
                    });

                    if (data.auto.count > 0) {
                        countTracker ++;
                        if (countTracker == data.auto.count) {
                            clearInterval(scope.intervalTimer);
                        }
                    }

                }, data.auto.delay);
            }
        }

        if (data.nav) {
            var rightNav = data.nav.left;
            var leftNav = data.nav.right;

            leftNav.addEventListener('click', function() {
                console.log("left nav clicked");
               
                scope.move({
                    direction: "reverse",
                    duration: 0.75
                }); // move left

                if (data.platform) {
                    if (data.platform == "sizmek") {
                        window.EB.userActionCounter("nav-left");
                    }
                }


            },false);

            rightNav.addEventListener('click', function() {
                console.log("right nav clicked");
                scope.move({
                    direction: "forward",
                    duration: 0.75
                }); // move left

                if (data.platform) {
                    if (data.platform == "sizmek") {
                        window.EB.userActionCounter("nav-right");
                    }
                }
            },false);
        }

        if (data.counter) {
            var scope = this;
            var idForPM = String(data.id);
         //  console.log("data counter: ", data.counter);
           // window.addEventListener("message", data.counter, false);
           cardHolder.obj.addEventListener("custom", data.counter, false);
        }

        if (data.dots) {
            scope.dots(data);
        }

        //console.log(eachImgWidth);

        var _i = 0;
        for (var j = 0; j < 3; j++)
        {
            for (var i = 0; i < data.images.length; i++) {
                var box = new Sprite({
                    id:data.id + "-cardHolder-box-" + _i,
                    class: "ss-box-style",
                    container:cardHolder.obj,
                    width: eachImgWidth
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

        var element = cardHolder.obj.querySelector('.ss-box-style');
        var style = getComputedStyle(element);
      //  console.log("computed style: ",style.width);
        var computedWidth = style.width;
        var tempStringtoprocess = computedWidth.length - 2;
        var tempres = computedWidth.substr(0,tempStringtoprocess);

        TweenMax.set(cardHolder.obj, {delay:0,x:-(data.images.length * tempres)});

        if (data.width) {cardHolder.width = data.width;}
        else {cardHolder.width = tempres;}
        //return cardHolder;
        
        return this;
    }


    dots (data) {
       // console.log("create dots " ,data.dots);

        var scope = this;

        var dotHolder = new Sprite({
            id:data.id + "-dotHolder",
            element: "div",
            class: data.dots.background,
            container: data.container
        });

        var dotHolder = new Sprite({
            id:data.id + "-dotHolder",
            element: "ul",
            class: data.dots.class,
            container: data.container
        });

        for (var i = 0; i < data.images.length; i++) {

            var eachDots = new Sprite({
                id:data.id + "-dot-" + i,
                element: "li",
                container: dotHolder.obj
            });  
            
            if (data.dots.interactive) {
                eachDots.obj.addEventListener('click', function() {
                    scope.jumptoframe();
                },false);
            }

            if (i == 0) {
                eachDots.obj.style.backgroundColor = data.dots.active;
            }
            else {
                eachDots.obj.style.backgroundColor = data.dots.inactive;
            }
            

            eachDots.obj.setAttribute('data-active', data.dots.active);
            eachDots.obj.setAttribute('data-inactive', data.dots.inactive);
            eachDots.obj.setAttribute('data-index-number', i);
            eachDots.obj.setAttribute('data-parent', scope.cardHolder.obj.id);
            eachDots.obj.setAttribute('data-total', data.images.length);

         //   console.log(eachDots.obj.id);
        }
    }

    updateDotPosition (data) {
        var scope = this;
       // console.log(data);
        var currentIndex = Number((data.selected % data.total));
        for (var i = 0; i < data.total; i++) {
            var tempDot = document.getElementById(data.parent + "-dot-" + i);
            if (tempDot.dataset) {
                var activeColor = tempDot.dataset.active;
                var inActiveColor = tempDot.dataset.inactive;
                if (i != currentIndex) {
                    tempDot.style.backgroundColor = inActiveColor;
                }
                else {
                    tempDot.style.backgroundColor = activeColor;
                }
            }
            
        }
    }

    jumptoframe () {
      //  console.log(event.target);
        var parent = event.target.dataset.parent;
        var totalSlides = event.target.dataset.total;
        var currentCounter = Number(event.target.dataset.indexNumber);

        console.log(parent);

        this.jump(event);

        this.updateDotPosition({
             parent: parent,
             total: totalSlides,
             selected: currentCounter
        });

        try {
            var e = new CustomEvent("custom", {detail: currentCounter});
            document.getElementById(parent).dispatchEvent(e);
        } catch(Error) {console.error(Error);} 
    }


    jump (event) {
        var scope = this;
        var parent = event.target.dataset.parent;
        var totalSlides = event.target.dataset.total;
        var parentElement = document.getElementById(parent);
        var currentCounter = event.target.dataset.indexNumber;
        var element = parentElement.querySelector('.ss-box-style');
        var style = getComputedStyle(element);
        var computedWidth = style.width;
        var tempStringtoprocess = computedWidth.length - 2;
        var tempres = computedWidth.substr(0,tempStringtoprocess);
        var totalOffset = -((tempres  * currentCounter));
        TweenMax.to(parentElement,0.5, {delay:0,x:totalOffset});
    }
    


    move (data) {
        var cardHolder = this.cardHolder;
        var animationDuration;
        var displacement;
        var whichDirection = data.direction;
        var element = cardHolder.obj.querySelector('.ss-box-style');
        var style = getComputedStyle(element);
        var computedWidth = style.width;
        var tempStringtoprocess = computedWidth.length - 2;
        var tempres = computedWidth.substr(0,tempStringtoprocess);
        
        if (data.duration) { animationDuration = data.duration;} else { animationDuration = 0.75; }
        if (data.delta) { displacement = data.delta; } else { displacement = tempres;}
        if (data.pause == false) {

        }
        else {
           // console.log("pause now");
            clearInterval(this.intervalTimer);
        }
        
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
            if (deltaX <= -(displacement * (ss.numberOfitem + 1)))
            {
                ss.counter = 1;
                TweenMax.set(ss.obj,{x:-displacement});
            }
            if (deltaX >= 0)
            {
                ss.counter = ss.numberOfitem;
                TweenMax.set(ss.obj,{x:-(displacement * ss.numberOfitem)});
            }
        }

        if (data.dots) {
            this.updateDotPosition({
                parent: cardHolder.obj.id,
                total: cardHolder.numberOfitem,
                selected: cardHolder.counter
            });
        }

      

        var sIndex = Number(cardHolder.counter % cardHolder.numberOfitem);

        if (sIndex >= 0) {
            try {
                var event = new CustomEvent("custom", {detail: sIndex});
                cardHolder.obj.dispatchEvent(event);
    
            } catch(Error) {console.error(Error);}     
        }
        else {
            try {
                var event = new CustomEvent("custom", {detail: 0});
                cardHolder.obj.dispatchEvent(event);

                this.updateDotPosition({
                    parent: cardHolder.obj.id,
                    total: cardHolder.numberOfitem,
                    selected: 0
                });
    
            } catch(Error) {console.error(Error);}  
        }
    } 

    resize (data) {
        
        var cardHolder = this.cardHolder;
        var currentCounter = cardHolder.counter;
        var numberOfImagesinSSx3 = cardHolder.obj.childElementCount;
        
        for (var i = 0; i < numberOfImagesinSSx3; i++) {
            var tempItems = cardHolder.obj.children[i];
            tempItems.style.width = data.width + "px";
        }
        var element = cardHolder.obj.querySelector('.ss-box-style');
        var style = getComputedStyle(element);
       // console.log("computed style: ",style.width);
        var computedWidth = style.width;
        var tempStringtoprocess = computedWidth.length - 2;
        var tempres = computedWidth.substr(0,tempStringtoprocess);
        if (data.width) {cardHolder.width = data.width;}
        else {cardHolder.width = tempres;}
        var totalOffset = -((tempres  * currentCounter));
        TweenMax.set(cardHolder.obj, {delay:0,x:totalOffset});

    }
}
	
	

	