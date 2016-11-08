



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
tl7.to(".undertale", 3.4, {y:500, repeat:-1, yoyo:true}, 0)


//http://greensock.com/forums/topic/14252-randommovementofdomelementsbyusinggreensock/



