"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stage =
/*#__PURE__*/
function () {
  function Stage(data) {
    _classCallCheck(this, Stage);

    var stage = document.createElement('div');

    if (data.id) {
      stage.setAttribute('id', data.id);
    } else {
      stage.setAttribute('id', "willow-ad-stage");
    }

    if (data.class) {
      stage.className += data.class;
    }

    this.stage = stage; // this.stageDefaultStyle();

    if (data.container) {
      var adContainer = document.querySelector(data.container);
      adContainer.appendChild(stage);
    } else {
      document.body.setAttribute('id', "ad-body");
      document.body.appendChild(stage);
    }

    return stage;
  }

  _createClass(Stage, [{
    key: "stageDefaultStyle",
    value: function stageDefaultStyle() {
      // console.log("this.stage: ", this.stage);
      this.stage.style.margin = "0px";
      this.stage.style.padding = "0px";
    }
  }]);

  return Stage;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//console.log("sprite is here ------- ");
var Sprite =
/*#__PURE__*/
function () {
  function Sprite(data) {
    _classCallCheck(this, Sprite);

    var obj;

    if (data.element) {
      obj = document.createElement(data.element);
    } else {
      obj = document.createElement('div');
    }

    this.obj = obj;

    if (data.id) {
      obj.setAttribute('id', data.id);
    } else {
      obj.setAttribute('id', '');
    }

    if (data.class) {
      obj.className += data.class;
    }

    if (data.position) {
      obj.style.position = data.position;
    }

    if (data.display) {
      obj.style.display = data.display;
    }

    if (data.index) {
      obj.setAttribute('data-index-number', data.index.toString());
    }

    if (data.width) {
      obj.width = data.width;
      obj.style.width = data.width + 'px';
    } else {
      this.width = 0;
    }

    if (data.height) {
      obj.height = data.height;
      obj.style.height = data.height + 'px';
    } else {
      this.height = 0;
    }

    if (data.image) {
      var imgW = data.width + 'px';
      var imgH = data.height + 'px';
      var style = obj.style;
      style.width = imgW;
      style.height = imgH;
      style.backgroundImage = 'url(' + data.image + ')';
      style.backgroundRepeat = 'no-repeat';

      if (!data.cover) {
        style.backgroundSize = imgW + ' ' + imgH;
      }
    }

    if (data.button) {
      var btn = document.createElement("button");

      if (data.button.text) {
        btn.innerHTML = data.button.text;
      }

      obj.appendChild(btn);
    } // text: {content:"Read More",color:"white",size:"14px",width:"200px",lineHeight:"100px",fontFamily:"Arial"}


    if (data.text) {
      if (data.text.color) {
        obj.style.color = data.text.color;
      }

      if (data.text.fontSize) {
        obj.style.fontSize = data.text.fontSize;
      }

      if (data.text.fontFamily) {
        obj.style.fontFamily = data.text.fontFamily;
      }

      if (data.text.maxWidth) {
        obj.style.maxWidth = data.text.width;
      }

      if (data.text.lineHeight) {
        obj.style.lineHeight = data.text.lineHeight;
      }

      if (data.text.fontWeight) {
        obj.style.fontWeight = data.text.fontWeight;
      }

      obj.innerHTML = data.text.content;
    }

    if (data.color) {
      var imgW = data.width + 'px';
      var imgH = data.height + 'px';
      var style = obj.style;
      style.width = imgW;
      style.height = imgH;
      style.backgroundColor = data.color;
    } // gradient: {width:1024, height: 650, direction: "right", color1: "rgba(255,255,0,0)", color2: "rgba(255,10,0,1)" }


    if (data.gradient) {
      var style = this.obj.style;
      style.width = data.gradient.width + "px";
      style.height = data.gradient.height + "px";
      style.background = '-webkit-linear-gradient(' + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 + ')';
      style.background = '-o-linear-gradient(' + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 + ')';
      style.background = '-moz-linear-gradient(' + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 + ')';
      style.background = 'linear-gradient(' + data.gradient.direction + ',' + data.gradient.color1 + ', ' + data.gradient.color2 + ')';
    }

    if (data.container) {
      data.container.appendChild(obj);
    }

    if (data.border) {
      var borderObj = document.createElement('div');
      borderObj.setAttribute('id', data.id + "-Border");
      borderObj.style.width = data.width + 'px';
      borderObj.style.height = data.height + 'px';
      borderObj.style.position = 'absolute';
      borderObj.style.margin = '0px';
      borderObj.style.zIndex = 999999;
      borderObj.style.border = data.border.thickness + "px solid " + data.border.color + "";
      borderObj.style.boxSizing = "border-box";
      borderObj.style.pointerEvents = "none";

      if (data.border.radius) {
        borderObj.style.borderRadius = data.border.radius;
      }

      obj.appendChild(borderObj);
    }

    if (data.click) {
      var obj = this.obj;
      obj.addEventListener('click', data.click.function, false);
      obj.style.cursor = "pointer";
    }

    if (data.over) {
      var obj = this.obj;
      obj.addEventListener('mouseover', data.over.function, false);
      obj.style.cursor = "pointer";
    }

    if (data.out) {
      var obj = this.obj;
      obj.addEventListener('mouseout', data.out.function, false);
      obj.style.cursor = "pointer";
    }

    if (data.mousemove) {
      var obj = this.obj;
      obj.addEventListener('mousemove', data.mousemove.function, false); // obj.style.cursor="pointer";
    }

    var xval = 0;
    var yval = 0; // var rotationval = 0;

    if (data.x) {
      xval = data.x;
    }

    if (data.y) {
      yval = data.y;
    }

    if (data.z) {
      var style = obj.style;
      style.zIndex = data.z;
    }

    if (data.x || data.y) {
      obj.style.transform = "translate(" + xval + "px," + yval + "px)";
    }

    if (data.mask) {
      obj.style.clip = 'rect(' + data.mask.y + 'px,' + (data.mask.x + data.mask.width) + 'px,' + (data.mask.y + data.mask.height) + 'px,' + data.mask.x + 'px)';
    }
  }

  _createClass(Sprite, [{
    key: "click",
    value: function click(f) {
      var obj = this.obj;
      obj.addEventListener('click', f);
      obj.style.cursor = "pointer";
    }
  }, {
    key: "over",
    value: function over(func) {
      var obj = this.obj;
      obj.addEventListener('mouseover', func);
      obj.style.cursor = "pointer";
    }
  }, {
    key: "out",
    value: function out(func) {
      var obj = this.obj;
      obj.addEventListener('mousemove', func);
    }
  }, {
    key: "html",
    value: function html(newtext) {
      var obj = this.obj;
      obj.innerHTML = newtext;
    }
  }, {
    key: "text",
    value: function text(newtext) {
      var obj = this.obj;
      obj.innerText = newtext;
    }
  }]);

  return Sprite;
}();
"use strict";

// -------- ******* UTILITY ******* --------- 
function createClass(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.media = 'all';
  document.getElementsByTagName('head')[0].appendChild(style);

  if (!(style.sheet || {}).insertRule) {
    (style.styleSheet || style.sheet).addRule(name, rules);
  } else {
    style.sheet.insertRule(name + "{" + rules + "}", 0);
  }
}

function arrayOfset(array) {
  var tempArray = [];

  for (var i = 0; i < array.length - 1; i++) {
    tempArray.push(array[i + 1]);
  }

  tempArray.push(array[0]);
  return tempArray;
}

function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slideshow =
/*#__PURE__*/
function () {
  function Slideshow(data) {
    _classCallCheck(this, Slideshow);

    var intervalTimer;
    this.intervalTimer = intervalTimer;
    var scope = this;
    scope.id = data.id; // var globalData = window['slideData_' + data.id] = {
    //     index: 0,
    //     id: data.id,
    //     total: data.images.length,
    //     location: data.images
    // }
    // scope.data = globalData;

    var cardHolder = new Sprite({
      id: data.id,
      class: data.class,
      container: data.container
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
        scope.resize({
          width: eachImgWidth
        });
      });
    } else {
      eachImgWidth = data.width;
    }

    if (data.auto) {
      var lauchAutoSlideshow = function lauchAutoSlideshow() {
        scope.intervalTimer = setInterval(function () {
          scope.move({
            direction: data.auto.direction,
            duration: slideMoveDuration,
            pause: false
          });

          if (data.auto.count > 0) {
            countTracker++;

            if (countTracker == data.auto.count) {
              clearInterval(scope.intervalTimer);
            }
          }
        }, data.auto.delay);
      };

      var countTracker = 0;
      var slideMoveDuration = 0.75;

      if (data.auto.duration) {
        slideMoveDuration = Number(data.auto.duration / 1000);
      }

      if (data.auto.initialdelay) {
        setTimeout(function () {
          lauchAutoSlideshow();
        }, data.auto.initialdelay);
      } else {
        lauchAutoSlideshow();
      }
    }

    if (data.nav) {
      var rightNav = data.nav.left;
      var leftNav = data.nav.right;
      leftNav.addEventListener('click', function () {
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
      }, false);
      rightNav.addEventListener('click', function () {
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
      }, false);
    }

    if (data.counter) {
      var scope = this;
      var idForPM = String(data.id); //  console.log("data counter: ", data.counter);
      // window.addEventListener("message", data.counter, false);

      cardHolder.obj.addEventListener("custom", data.counter, false);
    }

    if (data.dots) {
      scope.dots(data);
    } //console.log(eachImgWidth);


    var _i = 0;

    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < data.images.length; i++) {
        var box = new Sprite({
          id: data.id + "-cardHolder-box-" + _i,
          class: "ss-box-style",
          container: cardHolder.obj,
          width: eachImgWidth
        });
        box.obj.setAttribute('data-index-number', _i);
        var cardPic = new Sprite({
          id: data.id + "-cardHolder-box-cardpic-" + _i,
          container: box.obj,
          image: data.images[i],
          class: "picStyle"
        });
        _i++;
      }
    }

    var element = cardHolder.obj.querySelector('.ss-box-style');
    var style = getComputedStyle(element); //  console.log("computed style: ",style.width);

    var computedWidth = style.width;
    var tempStringtoprocess = computedWidth.length - 2;
    var tempres = computedWidth.substr(0, tempStringtoprocess);
    TweenMax.set(cardHolder.obj, {
      delay: 0,
      x: -(data.images.length * tempres)
    });

    if (data.width) {
      cardHolder.width = data.width;
    } else {
      cardHolder.width = tempres;
    } //return cardHolder;


    return this;
  }

  _createClass(Slideshow, [{
    key: "dots",
    value: function dots(data) {
      // console.log("create dots " ,data.dots);
      var scope = this;
      var dotHolderBG = new Sprite({
        id: data.id + "-dotHolder-bg",
        element: "div",
        class: data.dots.background,
        container: data.container
      });
      var dotHolder = new Sprite({
        id: data.id + "-dotHolder",
        element: "ul",
        class: data.dots.class,
        container: data.container
      });

      for (var i = 0; i < data.images.length; i++) {
        var eachDots = new Sprite({
          id: data.id + "-dot-" + i,
          element: "li",
          container: dotHolder.obj
        });

        if (data.dots.interactive) {
          eachDots.obj.addEventListener('click', function () {
            scope.jumptoframe();
          }, false);
        }

        if (i == 0) {
          eachDots.obj.style.backgroundColor = data.dots.active;
        } else {
          eachDots.obj.style.backgroundColor = data.dots.inactive;
        }

        eachDots.obj.setAttribute('data-active', data.dots.active);
        eachDots.obj.setAttribute('data-inactive', data.dots.inactive);
        eachDots.obj.setAttribute('data-index-number', i);
        eachDots.obj.setAttribute('data-parent', scope.cardHolder.obj.id);
        eachDots.obj.setAttribute('data-total', data.images.length); //   console.log(eachDots.obj.id);
      }
    }
  }, {
    key: "updateDotPosition",
    value: function updateDotPosition(data) {
      var scope = this; // console.log(data);

      var currentIndex = Number(data.selected % data.total);

      for (var i = 0; i < data.total; i++) {
        var tempDot = document.getElementById(data.parent + "-dot-" + i);

        if (tempDot.dataset) {
          var activeColor = tempDot.dataset.active;
          var inActiveColor = tempDot.dataset.inactive;

          if (i != currentIndex) {
            tempDot.style.backgroundColor = inActiveColor;
          } else {
            tempDot.style.backgroundColor = activeColor;
          }
        }
      }
    }
  }, {
    key: "jumptoframe",
    value: function jumptoframe() {
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
        var e = new CustomEvent("custom", {
          detail: currentCounter
        });
        document.getElementById(parent).dispatchEvent(e);
      } catch (Error) {
        console.error(Error);
      }
    }
  }, {
    key: "jump",
    value: function jump(event) {
      var scope = this;
      var parent = event.target.dataset.parent;
      var totalSlides = event.target.dataset.total;
      var parentElement = document.getElementById(parent);
      var currentCounter = event.target.dataset.indexNumber;
      var element = parentElement.querySelector('.ss-box-style');
      var style = getComputedStyle(element);
      var computedWidth = style.width;
      var tempStringtoprocess = computedWidth.length - 2;
      var tempres = computedWidth.substr(0, tempStringtoprocess);
      var totalOffset = -(tempres * currentCounter);
      TweenMax.to(parentElement, 0.5, {
        delay: 0,
        x: totalOffset
      });
    }
  }, {
    key: "move",
    value: function move(data) {
      var cardHolder = this.cardHolder;
      var currentSlideShow = document.getElementById(cardHolder.obj.id); // console.log("display property",currentSlideShow.style.display);

      var animationDuration;
      var displacement;
      var whichDirection = data.direction;
      var element = cardHolder.obj.querySelector('.ss-box-style');
      var style = getComputedStyle(element);
      var computedWidth = style.width;
      var tempStringtoprocess = computedWidth.length - 2;
      var tempres = computedWidth.substr(0, tempStringtoprocess);

      if (data.duration) {
        animationDuration = data.duration;
      } else {
        animationDuration = 0.75;
      }

      if (data.delta) {
        displacement = data.delta;
      } else {
        displacement = tempres;
      }

      if (data.pause == false) {} else {
        // console.log("pause now");
        clearInterval(this.intervalTimer);
      }

      if (whichDirection == "forward" || whichDirection == "left") {
        cardHolder.counter--;
      } else if (whichDirection == "reverse" || whichDirection == "right") {
        cardHolder.counter++;
      }

      TweenMax.to(cardHolder.obj, animationDuration, {
        x: -(cardHolder.counter * displacement),
        ease: Power4.easeInOut,
        onComplete: checkForDeltaX,
        onCompleteParams: [cardHolder]
      });

      function checkForDeltaX(ss) {
        function calculateMatrixX_Distance(whichOne) {
          var stripStyle = window.getComputedStyle(whichOne, null);
          var stripTransform = stripStyle.getPropertyValue("-webkit-transform") || stripStyle.getPropertyValue("-moz-transform") || stripStyle.getPropertyValue("-ms-transform") || stripStyle.getPropertyValue("-o-transform") || stripStyle.getPropertyValue("transform");

          if (stripTransform) {
            var values = stripTransform.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');
            return values[4];
          }
        }

        try {
          var deltaX = calculateMatrixX_Distance(ss.obj);

          if (deltaX <= -(displacement * (ss.numberOfitem + 1))) {
            ss.counter = 1;
            TweenMax.set(ss.obj, {
              x: -displacement
            });
          }

          if (deltaX >= 0) {
            ss.counter = ss.numberOfitem;
            TweenMax.set(ss.obj, {
              x: -(displacement * ss.numberOfitem)
            });
          }
        } catch (Error) {}
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
          var event = new CustomEvent("custom", {
            detail: sIndex
          });
          cardHolder.obj.dispatchEvent(event);
        } catch (Error) {
          console.error(Error);
        }
      } else {
        try {
          var event = new CustomEvent("custom", {
            detail: 0
          });
          cardHolder.obj.dispatchEvent(event);
          this.updateDotPosition({
            parent: cardHolder.obj.id,
            total: cardHolder.numberOfitem,
            selected: 0
          });
        } catch (Error) {
          console.error(Error);
        }
      }
    }
  }, {
    key: "resize",
    value: function resize(data) {
      var cardHolder = this.cardHolder;
      var currentCounter = cardHolder.counter;
      var numberOfImagesinSSx3 = cardHolder.obj.childElementCount;

      for (var i = 0; i < numberOfImagesinSSx3; i++) {
        var tempItems = cardHolder.obj.children[i];
        tempItems.style.width = data.width + "px";
      }

      var element = cardHolder.obj.querySelector('.ss-box-style');
      var style = getComputedStyle(element); // console.log("computed style: ",style.width);

      var computedWidth = style.width;
      var tempStringtoprocess = computedWidth.length - 2;
      var tempres = computedWidth.substr(0, tempStringtoprocess);

      if (data.width) {
        cardHolder.width = data.width;
      } else {
        cardHolder.width = tempres;
      }

      var totalOffset = -(tempres * currentCounter);
      TweenMax.set(cardHolder.obj, {
        delay: 0,
        x: totalOffset
      });
    }
  }]);

  return Slideshow;
}();
"use strict";

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

for (var i = 0; i < numberOfSlides; i++) {
  currentQueue.push(i);
}

var randomIndex = shuffle(currentQueue);
var shiftenIndex = arrayOfset(randomIndex);

for (var i = 0; i < randomIndex.length; i++) {
  var tempIndex = randomIndex[i];
  var tempData = {};
  tempData = newData[newData.unit].slides[tempIndex];
  tempData.index = Number(i + 1);
  randomizedData.push(tempData); // console.log("current temp index: ", tempData);
}

for (var i = 0; i < numberOfSlides; i++) {
  imgQueue.push(randomizedData[i].image_desktop);
  imgQueueMobile.push(randomizedData[i].image_mobile);
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

try {
  var widthOftheContainer = document.body.ownerDocument.defaultView.frameElement.parentElement.parentElement.parentElement.offsetWidth;
} catch (Error) {}

var heightOftheContainer = undefined;
var slideTrackerInt = 1; //var totalSlideCount = newData[newData.unit].slides.length;
//console.log("total number of products: ",totalSlideCount);

if (newData.DEBUG) {
  console.group("Custom-Slideshow");
  console.log("---- PREVIEW MODE ----");
  console.log("total number of slides: ", numberOfSlides);
}

var intervalTimer = 2;
var intervalCount = 0;
var fireMetrics = true;
var autoAnimationStatus = true;
var slide1exitindex = randomizedData[0].index;
var slide3exitindex = randomizedData[1].index; //console.log(numberOfSlides,currentQueue,randomIndex,shiftenIndex);

function init(all) {
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
      click: {
        function: bgClicked
      },
      index: randomizedData[i].index
    });
    var slideCopy = new Sprite({
      id: "slideCopy-" + i,
      class: "slideCopy-style",
      index: randomizedData[i].index,
      container: slideContent.obj
    });

    if (i != 0) {
      TweenMax.set([slideCopy.obj, slideBG.obj], {
        autoAlpha: 0
      });
    }

    var header = new Sprite({
      id: "header-" + i,
      class: "header-style",
      container: slideCopy.obj,
      click: {
        function: messagingClicked
      },
      text: {
        content: randomizedData[i].header
      },
      index: randomizedData[i].index
    });
    var summary = new Sprite({
      id: "summary-" + i,
      class: "summary-style",
      container: slideCopy.obj,
      click: {
        function: messagingClicked
      },
      text: {
        content: randomizedData[i].subheader
      },
      index: randomizedData[i].index
    });
    var cta = new Sprite({
      id: "cta",
      class: "cta-style",
      container: slideCopy.obj,
      click: {
        function: ctaClicked
      },
      text: {
        content: randomizedData[i].cta
      },
      index: randomizedData[i].index
    }); //  slideBG.obj.setAttribute('data-index-number', i);
  }

  var logo = new Sprite({
    id: "logo",
    class: "logo-style",
    container: hero.obj,
    image: newData.logo,
    click: {
      function: function _function() {
        autoAnimationStatus = false;
        fireMetrics = true;

        try {
          clearInterval(autoRunInterval);
        } catch (Error) {}

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
    text: {
      content: slideTrackerInt + " of " + numberOfSlides
    }
  });
  var nav_left = new Sprite({
    id: "nav_left",
    class: "nav_left-style",
    container: nav.obj,
    click: {
      function: function _function() {
        autoAnimationStatus = false;
        fireMetrics = true;

        try {
          clearInterval(autoRunInterval);
        } catch (Error) {}

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
      function: function _function() {
        autoAnimationStatus = false;
        fireMetrics = true;

        try {
          clearInterval(autoRunInterval);
        } catch (Error) {}

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
    counter: function counter(event) {
      // console.log("dot value: ",event.detail + 1);
      updateDotPosition({
        selected: event.detail,
        total: numberOfSlides
      });
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
    counter: function counter(event) {// console.log(event.detail + 1);
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

  function updateDotPosition(data) {
    var currentIndex = Number(data.selected % data.total);

    for (var i = 0; i < data.total; i++) {
      var tempDot = document.getElementById("product-galleryM" + "-dot-" + i);

      if (tempDot.dataset) {
        var activeColor = tempDot.dataset.active;
        var inActiveColor = tempDot.dataset.inactive;

        if (i != currentIndex) {
          tempDot.style.backgroundColor = inActiveColor;
        } else {
          tempDot.style.backgroundColor = activeColor;
        }
      }
    }
  }

  function eventForProducts() {
    var totalProductinSlides = numberOfSlides * 3;

    for (var i = 0; i < totalProductinSlides; i++) {
      var currentItemGalleryM = document.getElementById("product-galleryM-cardHolder-box-" + i);
      var currentItemGallery1 = document.getElementById("product-gallery1-cardHolder-box-" + i);
      var currentItemGallery3 = document.getElementById("product-gallery3-cardHolder-box-" + i);

      try {
        currentItemGalleryM.addEventListener("click", productGallery1Click);
      } catch (Error) {}

      try {
        currentItemGallery1.addEventListener("click", productGallery1Click);
      } catch (Error) {}

      try {
        currentItemGallery3.addEventListener("click", productGallery3Click);
      } catch (Error) {}
    }
  }

  function productGallery1Click(event) {
    window.EB.clickthrough("Slide_" + slide1exitindex + "_Click");
  }

  function productGallery3Click(event) {
    //window.EB.clickthrough("product-" + slide3exitindex);
    window.EB.clickthrough("Slide_" + slide3exitindex + "_Click");
  }

  eventForProducts();

  function updateCounter(whichDirection) {
    var tempOffset;

    if (navBlock == false) {
      //customMetrics(whichDirection);
      if (whichDirection == "left") {
        slideTrackerInt--;

        if (slideTrackerInt < 1) {
          slideTrackerInt = numberOfSlides;
        }

        window.EB.userActionCounter("Previous_Slide");
      } else {
        slideTrackerInt++;

        if (slideTrackerInt > numberOfSlides) {
          slideTrackerInt = 1;
        }

        window.EB.userActionCounter("Next_Slide");
      }

      if (numberOfSlides <= slideTrackerInt) {
        tempOffset = 0;
      } else {
        tempOffset = slideTrackerInt;
      }

      slide1exitindex = randomizedData[slideTrackerInt - 1].index;
      slide3exitindex = randomizedData[tempOffset].index;
      navCopy.obj.innerHTML = slideTrackerInt + " of " + numberOfSlides;
      var IdxForCopy = Number(slideTrackerInt - 1);
      updateCopySlides(IdxForCopy);
    }
  }

  function updateCopySlides(whichSlide) {
    if (copyBlock == false) {
      if (navBlock == false) {
        // console.log("update copy ", whichSlide);
        copyBlock = true; //customMetrics(whichSlide);

        for (var i = 0; i < numberOfSlides; i++) {
          var tempSlide = document.getElementById("slideCopy-" + i);
          var tempBG = document.getElementById("slideBG-" + i);

          if (i != whichSlide) {
            TweenMax.to([tempSlide, tempBG], 0.25, {
              autoAlpha: 0
            });
          } else {
            TweenMax.to([tempSlide, tempBG], 0.25, {
              delay: 0.1,
              autoAlpha: 1,
              onComplete: function onComplete() {
                navBlock = false;
                copyBlock = false;
              }
            });
          }
        }

        try {
          var calval = Number(numberOfSlides - whichSlide) - 1; // console.log("customMetrics-",calval);
          // console.log("whichOne-",whichSlide);

          if (fireMetrics == true) {// window.EB.userActionCounter("view-product-" + calval);
          }
        } catch (Error) {
          console.log(Error);
        }
      }
    }
  }

  function dummyTracking() {
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

  function bgClicked(event) {
    var tempCTAindex;
    var tempIndex = event.target.dataset.indexNumber;
    window.EB.clickthrough("Background_" + tempIndex + "_Click");
  }

  function ctaClicked(event) {
    var tempCTAindex;
    var tempIndex = event.target.dataset.indexNumber;
    window.EB.clickthrough("Slide_" + tempIndex + "_Click");
  }

  function messagingClicked(event) {
    // console.log("cta clicked");
    var tempCTAindex; // console.log(event.target.dataset.indexNumber);

    var tempIndex = event.target.dataset.indexNumber;
    window.EB.clickthrough("Messaging_" + tempIndex + "_Click");
  }

  function productExit(whichOne) {
    if (whichOne != undefined) {
      autoAnimationStatus = false;
      fireMetrics = true;

      try {
        clearInterval(autoRunInterval);
      } catch (Error) {} //  console.log("product exit: ", whichOne);


      window.EB.clickthrough("product-" + whichOne % numberOfSlides);
    }
  }

  function automation() {
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

      try {
        clearInterval(autoRunInterval);
      } catch (Error) {}
    }
  } //  automation();
  // var autoRunInterval = setTimeout(function(){ automation(); }, 700);
  // var autoRunInterval = setInterval(function(){ automation (); }, 3000);

}
"use strict";

var creativeId = "HTMLResponsiveRichMediaBanner";
var creativeVersion = "1.1.0";
var lastModified = "2018-01-10";
var lastUploaded = "2018-01-10";
var templateVersion = "1.0.01";
var scrollPos = {
  x: undefined,
  y: undefined
};
var adId, rnd, uid, versionID;
var listenerQueue;
var creativeIFrameId;
var USE_RESIZE_LISTENER = false;
var isMobile = /Mobi/i.test(navigator.userAgent);
var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
/*---------------------------*/

/*-----> SIZMEK CODES  <-----*/

/*---------------------------*/

function initializeLocalPreview() {
  var ua = navigator.userAgent;
  window.EB = {
    _adConfig: {
      adId: 0,
      rnd: 0,
      uid: 0,
      customJSVars: {}
    },
    clickthrough: function clickthrough() {
      if (newData.DEBUG) {
        console.log("EB.clickthrough: ", arguments);
      }
    },
    userActionCounter: function userActionCounter() {
      if (newData.DEBUG) {
        console.log("EB.userActionCounter: ", arguments);
      }
    },
    _sendMessage: function _sendMessage() {
      return;
    },
    API: {
      browser: {
        webkit: ua.match(/webkit/i) !== null,
        firefox: ua.match(/firefox/i) !== null
      },
      os: {
        ios: ua.match(/ipod|iphone|ipad/i) !== null,
        android: ua.match(/android/i) !== null,
        windowphone: ua.match(/windows phone/i) !== null,
        mobile: ua.match(/ipod|iphone|ipad|android|windows phone/i) !== null
      },
      setStyle: function setStyle(obj, styles) {
        for (var style in styles) {
          if (!styles.hasOwnProperty(style)) continue;
          obj.style[style] = styles[style];
        }
      },
      getCustomVar: function getCustomVar(name) {
        return window.EB._adConfig.customJSVars[name];
      }
    },
    Comm: {
      setName: function setName(name) {
        return name;
      },
      isConnected: function isConnected(name) {
        return false;
      }
    },
    getSDKData: function getSDKData() {
      return false;
    },
    expand: function expand() {
      return false;
    },
    collapse: function collapse() {
      return false;
    }
  };
  window.EBG = {
    px: function px(n) {
      if (n.toString().match(/^\d$|^\d+$/) !== null) {
        return n + "px";
      }

      return n;
    }
  };
}

function addCustomScriptEventListener(eventName, callback, interAd) {
  listenerQueue = listenerQueue || {};
  var data = {
    uid: uid,
    listenerId: Math.ceil(Math.random() * 1000000000),
    eventName: eventName,
    interAd: !!interAd,
    creativeIFrameId: creativeIFrameId
  };

  window.EB._sendMessage("addCustomScriptEventListener", data);

  data.callback = callback;
  listenerQueue[data.listenerId] = data;
  return data.listenerId;
}

function dispatchCustomScriptEvent(eventName, params) {
  params = params || {};
  params.uid = uid;
  params.eventName = eventName;
  params.creativeIFrameId = creativeIFrameId;

  window.EB._sendMessage("dispatchCustomScriptEvent", params);
}

function removeCustomScriptEventListener(listenerId) {
  var params = {
    uid: uid,
    listenerId: listenerId,
    creativeIFrameId: creativeIFrameId
  };

  window.EB._sendMessage("removeCustomScriptEventListener", params);

  if (listenerQueue[listenerId]) delete listenerQueue[listenerId];
}

function eventManager(event) {
  var msg = JSON.parse(event.data);

  if (msg.type && msg.data && (!uid || msg.data.uid && msg.data.uid == uid)) {
    switch (msg.type) {
      case "sendCreativeId":
        creativeIFrameId = msg.data.creativeIFrameId;
        addCustomScriptEventListener('pageScroll', onPageScroll); // addCustomScriptEventListener('creativeResize', sizeContentArea);

        addCustomScriptEventListener('debugLog', function (e) {
          var log = e.text;
          console.log(log);

          if (!document.getElementById("debugWindow")) {
            var dw = document.createElement("div");
            dw.id = "debugWindow";
            dw.setAttribute("state", "collapsed");
            dw.style.width = "60px";
            dw.style.height = "60px";
            dw.style.position = "absolute";
            dw.style.top = "0%";
            dw.style.left = "0%";
            dw.style.zIndex = "9999999";
            dw.style.backgroundColor = "#eee";
            dw.style.color = "black";
            dw.style.overflow = "scroll";
            document.getElementsByTagName("body")[0].appendChild(dw);
            dw.addEventListener("click", function (e) {
              if (dw.getAttribute("state") === "collapsed") {
                dw.style.width = "100%";
                dw.style.height = "100%";
                dw.setAttribute("state", "expanded");
              } else {
                dw.style.width = "60px";
                dw.style.height = "60px";
                dw.setAttribute("state", "collapsed");
              }
            }, false);
          }

          document.getElementById("debugWindow").innerHTML += "<br>";
          document.getElementById("debugWindow").innerHTML += log;
          document.getElementById("debugWindow").innerHTML += "<br>";
        }); //sdf

        window.EB._sendMessage("dispatchScrollPos", {
          uid: uid
        });

        if (creativeContainerReady) creativeContainerReady();
        break;

      case "eventCallback":
        // Handle Callback
        var list = msg.data.listenerIds;
        var length = list.length;

        for (var i = 0; i < length; i++) {
          try {
            var t = listenerQueue[list[i]];
            if (!t) continue;
            t.callback(msg.data);
          } catch (Error) {}
        }

        break;
    }
  }
}

function setCreativeVersion() {
  EB._sendMessage("setCreativeVersion", {
    creativeId: creativeId,
    creativeVersion: creativeVersion,
    creativeLastModified: lastModified,
    uid: uid
  });
}

function onPageScroll(event) {
  // use scrollPos anywhere to know the current x/y coordinates.
  scrollPos.x = event.scrollXPercent;
  scrollPos.y = event.scrollYPercent; // console.log("scroll position Y: " + scrollPos.y);
}

function initializeGlobalVariables() {
  try {
    adId = window.EB._adConfig.adId;
  } catch (Error) {}

  try {
    rnd = window.EB._adConfig.rnd;
  } catch (Error) {}

  try {
    uid = window.EB._adConfig.uid;
  } catch (Error) {}

  try {
    versionID = window.EB._adConfig.massVersioning.adVersions.split("_")[0];
  } catch (Error) {
    versionID = "";
  }
}
/*-----> TRACKING <-----*/


function fireNounTracking(interaction, noun) {
  // MDX 2.0 and MDX NXT use different noun tracking URLs
  // The below will auto detect which platform the unit is running and set the appropriate base URL
  var isNXT = adId.toString().length >= 10;
  var baseURL = isNXT ? "https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16478984&PluID=0&ord=%time%&rtu=-1&pcp=$$adID=" + adId + "|vId=" + versionID + "|interactionName=" : "https://bs.serving-sys.com/Serving/adServer.bs?cn=display&c=19&pli=1073952795&adid=1073972634&ord=[timestamp]&rtu=-1&pcp=$$adID=" + adId + "|vID=" + versionID + "|interactionName=";
  var pixel = new Image();
  pixel.src = baseURL + interaction + "|noun=" + noun + "$$";

  try {
    if (localPreview === true) {
      console.log(baseURL + interaction + "|noun=" + noun + "$$");
    }
  } catch (Error) {}
}
/*----------------------------*/

/*-----> INITIALIZATION <-----*/

/*----------------------------*/


function checkIfAdKitReady(event) {
  if (!window.adkit) {
    if (window.localPreview) {
      console.log("this is not a sizmek ad");
    }

    init(window);
  } else {
    //console.log("adkit: ",adkit);
    // if (window.localPreview) {console.log("this is a sizmek ad");}
    try {
      if (window.localPreview) {
        adkit.onReady(function () {
          window.initializeLocalPreview();
          USE_RESIZE_LISTENER = true;
          initializeCreative();
        });
        return;
      }
    } catch (e) {}

    adkit.onReady(initializeCreative);
  }
}

function initializeCreative() {
  initializeGlobalVariables();
  setCreativeVersion();
  init(window);
}

window.addEventListener("message", function () {
  try {
    eventManager.apply(this, arguments);
  } catch (e) {}
}, false);
window.addEventListener("load", function (event) {
  checkIfAdKitReady();
});

//# sourceMappingURL=app-min.js.map
