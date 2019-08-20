


// @codekit-prepend "adData.js"
// @codekit-prepend "TweenMax.js"
// @codekit-prepend  "willow-js/stage.js"
// @codekit-prepend  "willow-js/sprite.js"
// @codekit-prepend  "willow-js/utility.js"
// @codekit-prepend  "willow-js/slideshow-2.0.js"
// @codekit-append  "_Sizmek.js"

var adData = {
    unit: "panthere",   // "panthere", "santos"
    panthere: {
        headlines: 
            [
               // "PANTHÈRE DE CARTIER WATCH", 
                "PANTHÈRE DE CARTIER WATCH", 
                "PANTHÈRE DE CARTIER WATCH", 
              //  "PANTHÈRE DE CARTIER WATCH", 
              //  "PANTHÈRE DE CARTIER WATCH", 
                "PANTHÈRE DE CARTIER WATCH"
            ],

        summaries: 
            [
               // "DOUBLE LOOP, YELLOW GOLD", 
                "RHODIUMIZED 18K WHITE GOLD", 
                "PINK GOLD, DIAMONDS", 
               // "PINK GOLD, DIAMONDS", 
               // "RHODIUMIZED WHITE GOLD, DIAMONDS", 
                "MINI, YELLOW GOLD"
            ],

        images: 
            [
              //  "assets/images/panthere-0.png", 
                "assets/images/panthere-1.png", 
                "assets/images/panthere-2.png", 
              //  "assets/images/panthere-3.png", 
              //  "assets/images/panthere-4.png", 
                "assets/images/panthere-5.png"
            ],
        
        logo: "assets/images/logo-panthere.png",

        imagesofset: []
    },
    santos: {
        headlines: 
            [
                "SANTOS DE CARTIER WATCH", 
               // "SANTOS DE CARTIER WATCH", 
                "SANTOS DE CARTIER WATCH", 
              //  "SANTOS DE CARTIER WATCH", 
                "SANTOS DE CARTIER WATCH"
            ],

        summaries: 
            [
                "LARGE MODEL, AUTOMATIC, PINK GOLD", 
               // "MEDIUM MODEL, AUTOMATIC, YELLOW GOLD", 
                "MEDIUM MODEL, AUTOMATIC, YELLOW GOLD", 
               // "MEDIUM MODEL, AUTOMATIC, YELLOW GOLD AND STEEL", 
                "SMALL MODEL, 18K PINK GOLD AND STEEL"
            ],

        images: 
            [
                "assets/images/santos-0.png", 
               // "assets/images/santos-1.png", 
                "assets/images/santos-2.png", 
              // "assets/images/santos-3.png", 
                "assets/images/santos-4.png"
            ],

            logo: "assets/images/logo-santos.png",

        imagesofset: []
    }
}


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




var offsetArray = [];



var slideTrackerInt = 1;
var totalSlideCount = newData[newData.unit].slides.length;
//console.log("total number of products: ",totalSlideCount);

var intervalTimer = 2;
var intervalCount = 0;
var fireMetrics = true;
var autoAnimationStatus = true;
var imgQueue = [];


function init (all) {

    for (var i = 0; i < totalSlideCount; i++) {
        imgQueue.push (newData[newData.unit].slides[i].image_desktop);
        // newData[newData.unit].slides[0].image_desktop
    }

    offsetArray = arrayOfset(imgQueue);
   // adData[adData["unit"]].imagesofset = offsetArray;

    // console.group("FXL");

    console.log(newData[newData.unit].slides[0].image_desktop);

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

  

    for (var i = 0; i < totalSlideCount; i++) {

        var slideCopy = new Sprite({
            id: "slideCopy-" + i,
            class: "slideCopy-style",
            container: slideCopyContainer.obj
        });

        // slideCopy.obj.style.visibility = "hidden";
        if (i != 0) {
            TweenMax.set(slideCopy.obj, { autoAlpha: 0 });
        }
       

        var slideBG = new Sprite({
            id: "slideBG-" + i,
            class: "slideBG-style",
            container: slideCopy.obj,
            click: { function: ctaClicked }
        });

        var header = new Sprite({
            id: "header-" + i,
            class: "header-style",
            container: slideCopy.obj,
            text: { content: newData[newData.unit].slides[i].header },
        });

        var summary = new Sprite({
            id: "summary-" + i,
            class: "summary-style",
            container: slideCopy.obj,
            text: { content: newData[newData.unit].slides[i].subheader },
        });

        var cta = new Sprite({
            id: "cta",
            class: "cta-style",
            container: slideCopy.obj,
            click: { function: ctaClicked },
            text: { content: newData[newData.unit].slides[i].cta }
        });

        slideBG.obj.setAttribute('data-index-number', i);
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
                window.EB.clickthrough("logo-click");
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
        text: { content: slideTrackerInt + " of " + totalSlideCount },
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
                    // CLM.move({
                    //     direction: "forward",
                    //     delta: adWidth,
                    //     duration: 0.85
                    // }); // move left


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
                    // CLM.move({
                    //     direction: "reverse",
                    //     delta: adWidth,
                    //     duration: 0.75
                    // }); // move left

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
        images: adData[adData["unit"]].images,
        width: adWidth,
        height: 380,
        id: "product-galleryM",
        class: "ss-card-style-M",
        container: ssMitem.obj
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
            console.log(event.detail + 1);
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


    function eventForProducts () {
        var totalProductinSlides = totalSlideCount * 3;
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
        console.log("gallery 1 clicked");
        var currentIdx = Number(event.target.dataset.indexNumber);
        productExit(currentIdx);
    }

    function productGallery3Click (event) {
        console.log("gallery 3 clicked");
        var currentIdx = Number(event.target.dataset.indexNumber) + 1;
        productExit(currentIdx);
    }

    eventForProducts();


    function updateCounter (whichDirection) {
        if (navBlock == false) {
            //customMetrics(whichDirection);

            if (whichDirection == "left") {
                slideTrackerInt--;
                if (slideTrackerInt < 1) {
                    slideTrackerInt = totalSlideCount;
                }

                window.EB.userActionCounter("Click-left-Nav");
            }
            else {
                slideTrackerInt++;
                if (slideTrackerInt > totalSlideCount) {
                    slideTrackerInt = 1;
                }

                window.EB.userActionCounter("Click-right-Nav");

            }

            navCopy.obj.innerHTML = slideTrackerInt + " of " + totalSlideCount;
            var IdxForCopy = Number(slideTrackerInt - 1);
            updateCopySlides(IdxForCopy);
        }
    }



    function updateCopySlides (whichSlide) {
        if (copyBlock == false) {
            if (navBlock == false) {
                console.log("update copy ", whichSlide);
                copyBlock = true;

                //customMetrics(whichSlide);
                for (var i = 0; i < totalSlideCount; i++) {
                    var tempSlide = document.getElementById("slideCopy-" + i);
                    if (i != whichSlide) {
                        TweenMax.to(tempSlide, 0.25, { autoAlpha: 0 });
                    }
                    else {
                        TweenMax.to(tempSlide, 0.25, {
                            delay: 0.1, autoAlpha: 1, onComplete: function () {
                                navBlock = false;
                                copyBlock = false;
                            }
                        });
                    }
                }

                try {
                    var calval = Number(totalSlideCount - whichSlide) - 1;
                    console.log("customMetrics-",calval);
                    console.log("whichOne-",whichSlide);
                    if (fireMetrics == true) {
                        window.EB.userActionCounter("view-product-" + calval);
                    }  
                }
                catch (Error) {console.log(Error);}
            }
        }
    }


    function dummyTracking () {
        window.EB.userActionCounter("view-product-0");
        window.EB.userActionCounter("view-product-1");
        window.EB.userActionCounter("view-product-2");
        //window.EB.userActionCounter("view-product-3");
        //window.EB.userActionCounter("view-product-4");
        //window.EB.userActionCounter("view-product-5");
        window.EB.clickthrough("product-0");
        window.EB.clickthrough("product-1");
        window.EB.clickthrough("product-2");
        //window.EB.clickthrough("product-3");
        //window.EB.clickthrough("product-4");
        //window.EB.clickthrough("product-5");
        window.EB.userActionCounter("Click-left-Nav");
        window.EB.userActionCounter("Click-right-Nav");
    }

    function ctaClicked (event) {
        console.log("cta clicked");
        var tempCTAindex;
        if (slideTrackerInt == 4) { tempCTAindex = 3; }
        if (slideTrackerInt == 2) { tempCTAindex = 1; }
        if (slideTrackerInt == 3) { tempCTAindex = 2; }
        if (slideTrackerInt == 1) { tempCTAindex = 4; }
        //productExit(tempCTAindex);
    }


    function productExit (whichOne) {
        if (whichOne != undefined) {
            autoAnimationStatus = false;
            fireMetrics = true;
            try { clearInterval(autoRunInterval); } catch (Error) { }
            console.log("product exit: ", whichOne);
            window.EB.clickthrough("product-" + whichOne % totalSlideCount);
        }
    }


    function automation () {
        //console.log("automation init");
        intervalCount++;

        // CLM.move({
        //     direction: "reverse",
        //     delta: adWidth,
        //     duration: 0.85
        // }); // move left


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

