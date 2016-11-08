

var tl = new TimelineMax();
pauseBtn = document.getElementById("pause"),
restartBtn = document.getElementById("restart")
var tl = new TimelineLite();

tl.to(".cute",0.1,{y:0, x:0})
.to(".blok", 1, {x:-100, opacity: 1, ease: Power2.easeOut},0)
.to(".start2",1,{opacity:1})

.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut},2.5)
.to(".cute", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".cute", 0.3, {opacity: 1, ease: Power2.easeOut})

.to(".thisisyou", 2, {opacity: 1, ease: Power2.easeOut},3.5)
.to(".thisisyou", 0.3, {opacity: 0, ease: Power2.easeOut})
.to(".controls", 2, {opacity: 1, ease: Power2.easeOut})
.to(".goleft", 1, {opacity: 1, ease: Power2.easeOut})
.to(".cute",0.1,{opacity:0})
.to(".schild",0.1,{opacity: 1})
.to(".schild",0.5,{x:-150})
.to(".cute",0.1,{x:-150})
.to(".schild",0.1,{opacity:0})
.to(".cute",0.1,{opacity:1})
.to(".cute",0.1,{opacity:0},"+=2")
.to(".goright", 1, {opacity: 1, ease: Power2.easeOut},"-=1")
.to(".schild",0.1,{opacity:1})
.to(".schild",0.5,{x:0})
.to(".cute",0.1,{x:0})
.to(".schild",0.1,{opacity:0})
.to(".cute",0.1,{opacity:1})
.to(".jump", 1, {opacity: 1, ease: Power2.easeOut})
.to(".cute",0.6,{y:-100,ease: Back.easeOut.config(2)})
.to(".cute",0.3,{y:0,ease: Power3.easeOut},"-=0.2")

.to(".blok", 1, {x:0, opacity: 0, ease: Power2.easeOut})
.to(".controls", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".goleft", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".goright", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".jump", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")

.to(".blok", 1, {x:-100, opacity: 1, ease: Power2.easeOut})
.to(".goal", 2, {opacity: 1, ease: Power2.easeOut})
.to(".collect", 1, {opacity: 1, ease: Power2.easeOut},"-=1")
.to(".buritto2", 1, {opacity: 1, ease: Power2.easeOut},"-=1")

.to(".cute",0.1,{opacity:0})
.to(".schild",0.1,{opacity: 1})
.to(".schild",0.5,{x:190})
.to(".buritto2",0.1,{opacity:0})
.to(".cute",0.1,{x:190})
.to(".schild",0.1,{opacity:0})
.to(".cute",0.1,{opacity:1})

.to(".blok", 1, {x:0, opacity: 0, ease: Power2.easeOut})
.to(".goal", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".collect", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".blok", 1, {x:-100, opacity: 1, ease: Power2.easeOut})
.to(".beware", 2, {opacity: 1, ease: Power2.easeOut})
.to(".watchout", 1, {opacity: 1, ease: Power2.easeOut},"-=1")

.to(".vlam",2,{y:540},"+=2")
.to(".vlam",0.2,{opacity:0},"-=0.5")
.to(".cute",0.1,{opacity:0},"-=0.4")

.to(".blok", 1, {x:0, opacity: 0, ease: Power2.easeOut})
.to(".beware", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".watchout", 1, {x:100, opacity: 0, ease: Power2.easeOut},"-=1")
.to(".blok", 1, {x:-100, opacity: 1, ease: Power2.easeOut})
.to(".press", 2, {opacity: 1, ease: Power2.easeOut})


$("#restart").click(function() {
        tl.restart();
});

pause.onclick = function() {
  tl.paused(!tl.paused());
  pauseBtn.innerHTML = tl.paused() ? "Play" : "Pause";
}

        


tl.eventCallback("onUpdate", updateSlider);
    
$("#slider").slider({
  range: false,
  min: 0,
  max: 100,
  step:.1,
  slide: function ( event, ui ) {
    tl.pause();
    //adjust the timeline's progress() based on slider value
    tl.progress( ui.value/100 );
    }
}); 
        
function updateSlider() {
  $("#slider").slider("value", tl.progress() *100);
}   

tl.progress(0)



var tl9 = new TimelineMax({repeat:-1});
tl9.to(".shine",2,{opacity:0, ease: Back.easeOut.config(1.7)})
tl9.to(".shine",3,{opacity:1, ease: Back.easeOut.config(1.7)})

var tl5 = new TimelineMax({repeat:-1});
tl5.to(".sterretjes",3,{opacity:0.3, ease: Back.easeOut.config(1.7)})
tl5.to(".sterretjes",3,{opacity:1, ease: Back.easeOut.config(1.7)})

var tl4 = new TimelineMax();
tl4.from(".start",1,{x:60, autoAlpha:0, ease: Power1.easeOut},0)
tl4.from(".howtoplay",1, {x:-60,autoAlpha:0,ease: Power1.easeOut},0.2)
tl4.from(".highscore",1,{x:60,autoAlpha:0,ease: Power1.easeOut},0.4)

var tl11 = new TimelineMax({repeat:-1});
tl11.to(".schild",0.1,{rotation: 90},0)

$(".start").hover(over, out);
function over(){
  TweenMax.to(this, 0.5, {x:20})
}
function out(){
  TweenMax.to(this, 0.5, {x:0})
}

$(".start2").hover(over, out);
function over(){
  TweenMax.to(this, 0.5, {x:20})
}
function out(){
  TweenMax.to(this, 0.5, {x:0})
}

$(".howtoplay").hover(over, out);
function over(){
  TweenMax.to(this, 0.5, {x:20})
}
function out(){
  TweenMax.to(this, 0.5, {x:0})
}

$(".highscore").hover(over, out);
function over(){
  TweenMax.to(this, 0.5, {x:20})
}
function out(){
  TweenMax.to(this, 0.5, {x:0})
}

function onRepeat(){
	count++;
}


TweenLite.defaultEase = Linear.easeNone;
var tl7 = new TimelineLite()

tl7.to(".undertale", 3.05, {x:700, repeat:-1, yoyo:true})
  .to(".undertale", 3.4, {y:500, repeat:-1, yoyo:true}, 0)


//http://greensock.com/forums/topic/14252-randommovementofdomelementsbyusinggreensock/



