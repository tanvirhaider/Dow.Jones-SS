

// @codekit-prepend  "willow-js/stage.js"
// @codekit-prepend  "willow-js/sprite.js"
// @codekit-prepend  "willow-js/utility.js"
// @codekit-prepend  "willow-js/slideshow-2.0.js"
// @codekit-append  "_Sizmek.js"


var numberOfSlides = newData[newData.unit].slides.length;
var currentQueue = [];
var randomizedData = [];
var imgQueue = [];
var randomQueue = [];
var imgQueueMobile = [];
var randomMobileQueue = [];
var offsetArray = [];
var currentRandomIndex;



for (var i = 0; i < numberOfSlides; i++) { currentQueue.push(i);}

var randomIndex = shuffle(currentQueue);
var shiftenIndex = arrayOfset(randomIndex);

for (var i = 0; i < randomIndex.length; i++) {
    var tempIndex = randomIndex[i];
    var tempData = {};
    tempData = newData[newData.unit].slides[tempIndex];
    tempData.index = Number( i + 1);
    
    randomizedData.push(tempData);

   // console.log("current temp index: ", tempData);
}

for (var i = 0; i < numberOfSlides; i++) {
    imgQueue.push (randomizedData[i].image_desktop);
    imgQueueMobile.push (randomizedData[i].image_mobile);
}

offsetArray = arrayOfset(imgQueue);



window.navBlock = false;
window.copyBlock = false;

var DEBUG = true;
var childIndex = 0;
var currentIndex = 0;
var adType;
var USE_RESIZE_LISTENER = true;
var stage, adContainer, Objects, Copy;

var localPreview = true;
localPreview = document.location === top.location;

try { var widthOftheContainer = document.body.ownerDocument.defaultView.frameElement.parentElement.parentElement.parentElement.offsetWidth; } catch (Error) { }
var heightOftheContainer = undefined;

var slideTrackerInt = 1;
//var totalSlideCount = newData[newData.unit].slides.length;
//console.log("total number of products: ",totalSlideCount);

if (newData.DEBUG) {
    console.group("Custom-Slideshow");
    console.log("---- PREVIEW MODE ----");
    console.log("total number of slides: ",numberOfSlides);
}



var intervalTimer = 2;
var intervalCount = 0;
var fireMetrics = true;
var autoAnimationStatus = true;

var slide1exitindex = randomizedData[0].index;
var slide3exitindex = randomizedData[1].index;


//console.log(numberOfSlides,currentQueue,randomIndex,shiftenIndex);



function init (all) {

    stage = new Stage({
        id: "willow-ad-stage",
        class: "stageStyle",
        margin: "auto"
    });

    adContainer = new Sprite({
        id: "adContainer",
        class: "adContainerStyle",
        container: stage
    });

    var adWidth = document.getElementById("adContainer").offsetWidth;

    var ss1item = new Sprite({
        id: "ss1item",
        class: "ss1item-style",
        container: adContainer.obj
    });

    var ssMitem = new Sprite({
        id: "ssMitem",
        class: "ssMitem-style",
        container: adContainer.obj
    });

    var hero = new Sprite({
        id: "hero",
        class: "hero-style",
        container: adContainer.obj
    });

    var heroBG = new Sprite({
        id: "heroBG",
        class: "heroBG-style",
        container: hero.obj
    });

    var slideCopyContainer = new Sprite({
        id: "slideCopyContainer",
        class: "slideCopyContainer-style",
        container: hero.obj
    });


    for (var i = 0; i < numberOfSlides; i++) {

        var slideContent = new Sprite({
            id: "slideContent-" + i,
            class: "slideContent-style",
            index: randomizedData[i].index,
            container: slideCopyContainer.obj
        });

        var slideBG = new Sprite({
            id: "slideBG-" + i,
            class: "slideBG-style",
            container: slideContent.obj,
            click: { function: bgClicked },
            index: randomizedData[i].index
        });

        var slideCopy = new Sprite({
            id: "slideCopy-" + i,
            class: "slideCopy-style",
            index: randomizedData[i].index,
            container: slideContent.obj
        });

        if (i != 0) {TweenMax.set([slideCopy.obj,slideBG.obj], { autoAlpha: 0 });}

        var header = new Sprite({
            id: "header-" + i,
            class: "header-style",
            container: slideCopy.obj,
            click: { function: messagingClicked },
            text: { content: randomizedData[i].header },
            index: randomizedData[i].index
        });

        var summary = new Sprite({
            id: "summary-" + i,
            class: "summary-style",
            container: slideCopy.obj,
            click: { function: messagingClicked },
            text: { content: randomizedData[i].subheader },
            index: randomizedData[i].index
        });

        var cta = new Sprite({
            id: "cta",
            class: "cta-style",
            container: slideCopy.obj,
            click: { function: ctaClicked },
            text: { content: randomizedData[i].cta },
            index: randomizedData[i].index
        });

      //  slideBG.obj.setAttribute('data-index-number', i);
    }

  
    var logo = new Sprite({
        id: "logo",
        class: "logo-style",
        container: hero.obj,
        image: newData.logo,
        click: {
            function: function () {
                autoAnimationStatus = false;
                fireMetrics = true;
                try { clearInterval(autoRunInterval); } catch (Error) { }
                window.EB.clickthrough("Logo_Click");
            }
        }
    });

    var nav = new Sprite({
        id: "nav",
        class: "nav-style",
        container: hero.obj
    });

    var navCopy = new Sprite({
        id: "navCopy",
        class: "navCopy-style",
        container: nav.obj,
        text: { content: slideTrackerInt + " of " + numberOfSlides },
    });

    var nav_left = new Sprite({
        id: "nav_left",
        class: "nav_left-style",
        container: nav.obj,
        click: {
            function: function () {
                autoAnimationStatus = false;
                fireMetrics = true;
                try { clearInterval(autoRunInterval); } catch (Error) { }
                updateCounter("left");

                if (navBlock == false) {
                    CLM.move({
                        direction: "forward",
                        delta: adWidth,
                        duration: 0.85
                    }); // move left


                    CL1.move({
                        direction: "forward",
                        //delta: 260,
                        duration: 0.85
                    }); // move left


                    CL3.move({
                        direction: "forward",
                        //delta: 260,
                        duration: 0.75
                    }); // move left

                    navBlock = true;
                }
            }
        }
    });

    var nav_right = new Sprite({
        id: "nav_right",
        class: "nav_right-style",
        container: nav.obj,
        click: {
            function: function () {
                autoAnimationStatus = false;
                fireMetrics = true;
                try { clearInterval(autoRunInterval); } catch (Error) { }

                updateCounter("right");

                if (navBlock == false) {
                    CLM.move({
                        direction: "reverse",
                        delta: adWidth,
                        duration: 0.75
                    }); // move left

                    CL1.move({
                        direction: "reverse",
                       // delta: 260,
                        duration: 0.75
                    }); // move left


                    CL3.move({
                        direction: "reverse",
                       // delta: 260,
                        duration: 0.85
                    }); // move left

                    navBlock = true;
                }
            }
        }
    });

    var ss3item = new Sprite({
        id: "ss3item",
        class: "ss3item-style",
        container: adContainer.obj
    });



    var CLM = new Slideshow({
        images: imgQueueMobile,
        width: adWidth,
        responsive: true,
        height: 380,
        id: "product-galleryM",
        class: "ss-card-style-M",
        container: ssMitem.obj,
        counter: function(event) {
           // console.log("dot value: ",event.detail + 1);
            updateDotPosition ({
                selected: event.detail,
                total: numberOfSlides
            })
            
        },
        dots: {
            class: "slideshow-dots-style",
            active: newData.dotactive,
            inactive: newData.dotinactive,
            background: "slideshow-dots-bg",
            interactive: false
        }

    });

    var bottomCover = new Sprite({
        id: "bottomCover",
        class: "bottomCover-style",
        container: ssMitem.obj
    });

    var CL1 = new Slideshow({
        platform: "sizmek",
        images: imgQueue,
       // width: 260,
        height: 270,
        responsive: true,
        id: "product-gallery1",
        class: "ss-card-style-1",
        container: ss1item.obj,
        counter: function(event) {
           // console.log(event.detail + 1);
        }
    });

    var CL3 = new Slideshow({
        platform: "sizmek",
        images: offsetArray,
        //width: 260,
        height: 270,
        responsive: true,
        id: "product-gallery3",
        class: "ss-card-style-3",
        container: ss3item.obj
    });

    function updateDotPosition (data) {
        var currentIndex = Number((data.selected % data.total));
        for (var i = 0; i < data.total; i++) {
            var tempDot = document.getElementById("product-galleryM" + "-dot-" + i);
            if (tempDot.dataset) {
                var activeColor = tempDot.dataset.active;
                var inActiveColor = tempDot.dataset.inactive;
                if (i != currentIndex) {tempDot.style.backgroundColor = inActiveColor;}
                else {tempDot.style.backgroundColor = activeColor;}
            }
        }
    }


    function eventForProducts () {
        var totalProductinSlides = numberOfSlides * 3;
        for (var i = 0; i < totalProductinSlides; i++) {
            var currentItemGalleryM = document.getElementById("product-galleryM-cardHolder-box-" + i);
            var currentItemGallery1 = document.getElementById("product-gallery1-cardHolder-box-" + i);
            var currentItemGallery3 = document.getElementById("product-gallery3-cardHolder-box-" + i);

            try {  currentItemGalleryM.addEventListener("click", productGallery1Click); } catch (Error) {}
            try {  currentItemGallery1.addEventListener("click", productGallery1Click);} catch (Error) {}
            try { currentItemGallery3.addEventListener("click", productGallery3Click); } catch (Error) {}
           
        }
    }

    function productGallery1Click (event) {
      window.EB.clickthrough("Slide_" + slide1exitindex + "_Click");
    }

    function productGallery3Click (event) {
        //window.EB.clickthrough("product-" + slide3exitindex);
        window.EB.clickthrough("Slide_" + slide3exitindex + "_Click");
    }

    eventForProducts();


    function updateCounter (whichDirection) {

        var tempOffset;

        if (navBlock == false) {
            //customMetrics(whichDirection);

            if (whichDirection == "left") {
                slideTrackerInt--;
                if (slideTrackerInt < 1) {
                    slideTrackerInt = numberOfSlides;
                }

                window.EB.userActionCounter("Previous_Slide");
            }
            else {
                slideTrackerInt++;
                if (slideTrackerInt > numberOfSlides) {
                    slideTrackerInt = 1;
                }

                window.EB.userActionCounter("Next_Slide");                

            }

            if (numberOfSlides <= slideTrackerInt) {
                tempOffset = 0;
            }

            else {
                tempOffset = slideTrackerInt;
            }

            slide1exitindex = randomizedData[slideTrackerInt - 1].index;
            slide3exitindex = randomizedData[tempOffset].index;

            navCopy.obj.innerHTML = slideTrackerInt + " of " + numberOfSlides;
            var IdxForCopy = Number(slideTrackerInt - 1);
            updateCopySlides(IdxForCopy);
        }
    }



    function updateCopySlides (whichSlide) {
        if (copyBlock == false) {
            if (navBlock == false) {
               // console.log("update copy ", whichSlide);
                copyBlock = true;

                //customMetrics(whichSlide);
                for (var i = 0; i < numberOfSlides; i++) {
                    var tempSlide = document.getElementById("slideCopy-" + i);
                    var tempBG = document.getElementById("slideBG-" + i);
                    if (i != whichSlide) {
                        TweenMax.to([tempSlide,tempBG], 0.25, { autoAlpha: 0 });
                    }
                    else {
                        TweenMax.to([tempSlide,tempBG], 0.25, {
                            delay: 0.1, autoAlpha: 1, onComplete: function () {
                                navBlock = false;
                                copyBlock = false;
                            }
                        });
                    }
                }

                try {
                    var calval = Number(numberOfSlides - whichSlide) - 1;
                   // console.log("customMetrics-",calval);
                   // console.log("whichOne-",whichSlide);
                    if (fireMetrics == true) {
                       // window.EB.userActionCounter("view-product-" + calval);
                    }  
                }
                catch (Error) {console.log(Error);}
            }
        }
    }


    function dummyTracking () {
        window.EB.clickthrough("Slide_1_Click");
        window.EB.clickthrough("Slide_2_Click");
        window.EB.clickthrough("Slide_3_Click");
        window.EB.clickthrough("Slide_4_Click");

        window.EB.clickthrough("Background_1_Click");
        window.EB.clickthrough("Background_2_Click");
        window.EB.clickthrough("Background_3_Click");
        window.EB.clickthrough("Background_4_Click");

        window.EB.clickthrough("Messaging_1_Click");
        window.EB.clickthrough("Messaging_2_Click");
        window.EB.clickthrough("Messaging_3_Click");
        window.EB.clickthrough("Messaging_4_Click");
        
        window.EB.userActionCounter("Previous_Slide");
        window.EB.userActionCounter("Next_Slide");
    }

    function bgClicked (event) {
        var tempCTAindex;
        var tempIndex = event.target.dataset.indexNumber;
        window.EB.clickthrough("Background_" + tempIndex + "_Click");
    }

    function ctaClicked (event) {
        var tempCTAindex;
        var tempIndex = event.target.dataset.indexNumber;
        window.EB.clickthrough("Slide_" + tempIndex + "_Click");
    }

    function messagingClicked (event) {
         // console.log("cta clicked");
         var tempCTAindex;
         // console.log(event.target.dataset.indexNumber);
          var tempIndex = event.target.dataset.indexNumber;
          window.EB.clickthrough("Messaging_" + tempIndex + "_Click");
    }


    function productExit (whichOne) {
        if (whichOne != undefined) {
            autoAnimationStatus = false;
            fireMetrics = true;
            try { clearInterval(autoRunInterval); } catch (Error) { }
          //  console.log("product exit: ", whichOne);
            window.EB.clickthrough("product-" + whichOne % numberOfSlides);
        }
    }


    function automation () {
        //console.log("automation init");
        intervalCount++;

        CLM.move({
            direction: "reverse",
            delta: adWidth,
            duration: 0.85
        }); // move left


        CL1.move({
            direction: "reverse",
            delta: 260,
            duration: 0.85
        }); // move left


        CL3.move({
            direction: "reverse",
            delta: 260,
            duration: 0.75
        }); // move left


        updateCounter("right");


        if (intervalCount == intervalTimer) {
            fireMetrics = true;
            autoAnimationStatus = false;
            try { clearInterval(autoRunInterval); } catch (Error) { }
        }
    }

  //  automation();
    // var autoRunInterval = setTimeout(function(){ automation(); }, 700);


    // var autoRunInterval = setInterval(function(){ automation (); }, 3000);

}

