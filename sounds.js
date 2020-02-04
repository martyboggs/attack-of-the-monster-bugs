var music = $buzz({
	src: 'sounds/nokia.wav',
	loop: true,
	volume: 0.5,
	preload: true,
});
music.play();

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
