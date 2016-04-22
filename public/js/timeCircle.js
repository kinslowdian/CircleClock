var trace = function(msg){ console.log(msg); };

var timeData;
var clock;
var enterFrame;

function time_init(event)
{
	trace(this);

	preloader = document.querySelector(".preloader");

	timeData 						= {};
	timeData.data 			= new Date(Date.now());
	timeData.read 			= {};
	timeData.read.h 		= timeData.data.getHours();
	timeData.read.m 		= timeData.data.getMinutes();
	timeData.read.s 		= timeData.data.getSeconds();
	timeData.current 		= {};
	timeData.current.h	= 0;
	timeData.current.m	= 0;
	timeData.current.s 	= 0;

	clock 									= {};
	clock.hour 							= {};
	clock.mins 							= {};
	clock.secs 							= {};

	clock.hour.gfx					= document.querySelector("#display .timeBarH .unitWrapper");
	clock.hour.percentage 	= 100 / 24;

	clock.mins.gfx					= document.querySelector("#display .timeBarM .unitWrapper");
	clock.mins.percentage 	= 100 / 60;

	clock.secs.gfx					= document.querySelector("#display .timeBarS .unitWrapper");
	clock.secs.percentage 	= 100 / 60;

	enterFrame = {};
	enterFrame.instance = null;
	enterFrame.loop = false;

	// START LOOP
	enterFrame_init(true);
}

function enterFrame_init(run)
{
	if(run)
	{
		enterFrame.loop = true;
		enterFrame.instance = window.requestAnimationFrame(enterFrame_loop);
	}

	else
	{
		enterFrame.loop = false;
		window.cancelAnimationFrame(enterFrame.instance);
	}
}

function enterFrame_loop()
{
	timeData.data = new Date(Date.now());

	timeData.read.h = timeData.data.getHours();
	timeData.read.m = timeData.data.getMinutes();
	timeData.read.s = timeData.data.getSeconds();

	// SECOND UPDATE
	if(timeData.read.s != timeData.current.s)
	{
		time_check();
	}

	// REFRESH
	if(enterFrame.loop)
	{
		enterFrame.instance = window.requestAnimationFrame(enterFrame_loop);
	}
}

function time_check()
{
	var amend = false;

	// HOUR
	if(timeData.read.h != timeData.current.h)
	{
		clock.hour.gfx.style.transform = "scale(" + (timeData.read.h * clock.hour.percentage) / 100 + ")";

		timeData.current.h = timeData.read.h;
	}

	// MINS
	if(timeData.read.m != timeData.current.m)
	{
		clock.mins.gfx.style.transform = "scale(" + (timeData.read.m * clock.mins.percentage) / 100 + ")";

		timeData.current.m = timeData.read.m;
	}

	// SECS
	if(timeData.read.s != timeData.current.s)
	{
		clock.secs.gfx.style.transform = "scale(" + (timeData.read.s * clock.secs.percentage) / 100 + ")";

		timeData.current.s = timeData.read.s;
	}
}


