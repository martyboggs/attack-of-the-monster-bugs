var music = $buzz({
	src: 'sounds/nokia.wav',
	loop: true,
	volume: 0.5,
	preload: true,
});
music.play();

var blip = $buzz({
	src: 'sounds/blip.wav',
	volume: 0.5,
	preload: true,
});

var bad = $buzz({
	src: 'sounds/bad.wav',
	volume: 0.5,
	preload: true,
});

var good1 = $buzz({
	src: 'sounds/good1.wav',
	volume: 0.5,
	preload: true,
});

var good2 = $buzz({
	src: 'sounds/good2.wav',
	volume: 0.5,
	preload: true,
});

var good3 = $buzz({
	src: 'sounds/good3.wav',
	volume: 0.5,
	preload: true,
});

var good4 = $buzz({
	src: 'sounds/good4.wav',
	volume: 0.5,
	preload: true,
});

var gun = $buzz({
	src: 'sounds/gun.wav',
	volume: 0.5,
	preload: true,
});





// document.body.addEventListener('keydown', audioFixer, {once: true});
// document.body.addEventListener('click', audioFixer, {once: true});
// var audioFixed = false;
// function audioFixer(e) {
// 	if (audioFixed) return;
// 	audioFixed = true
// 	$buzz.context().resume().then(function () {
// 		state = 'title';
// 		music.play()
// 	});
// }
