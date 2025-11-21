// Lógica: audio (subida local), letras editables, frases interactivas
const audioEl = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');

// Frases en español (puedes editarlas). Añadí más frases y emojis.
const phrases = [
	'Eres mi lugar favorito en este mundo. 🌙',
	'Cuando sonríes, el tiempo se detiene sólo para nosotros. 😊💕',
	'Cada día a tu lado es un poema que no termina. ✨📜',
	'Tu voz es la canción que quiero escuchar siempre. 🎶❤️',
	'En tus ojos encuentro mi hogar y mil aventuras. 🏡🌟',
	'Eres la calma después de la tormenta. 🌧️➡️🌤️',
	'Tu risa es mi melodía favorita. 😂🎵',
	'Contigo todo sabe a verano eterno. ☀️🌺',
	'Si me pierdo, que sea entre tus brazos. 🤍🤗',
	'Gracias por ser mi paz y mi locura. 🌸🔥'
];
let phraseIndex = 0;

const phraseBox = document.getElementById('phraseBox');
const nextPhraseBtn = document.getElementById('nextPhrase');
const randomPhraseBtn = document.getElementById('randomPhrase');

const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');


function showPhrase(i){
	phraseBox.classList.remove('show');
	void phraseBox.offsetWidth;
	// Insert colorful gradient text
	phraseBox.innerHTML = `<span class="text-gradient">${phrases[i]}</span>`;
	phraseBox.classList.add('show');
	phraseBox.classList.add('float');
	createBurst();
}

nextPhraseBtn.addEventListener('click', ()=>{
	phraseIndex = (phraseIndex + 1) % phrases.length;
	showPhrase(phraseIndex);
	if(effectsEnabled){
		const r = phraseBox.getBoundingClientRect();
		burstHearts(r.left + r.width/2, r.top + r.height/2, 10);
	}
});

randomPhraseBtn.addEventListener('click', ()=>{
	const r = Math.floor(Math.random()*phrases.length);
	phraseIndex = r;
	showPhrase(r);
	if(effectsEnabled){
		const rct = phraseBox.getBoundingClientRect();
		burstHearts(rct.left + rct.width/2, rct.top + rct.height/2, 10);
	}
});

let playing = false;
playBtn.addEventListener('click', ()=>{
	if(!audioEl.src){
		alert('La pista aún no está disponible. Asegúrate de que `background.mp3` esté en la carpeta del proyecto.');
		return;
	}
	if(playing){
		audioEl.pause();
		playBtn.textContent = '▶︎ Reproducir';
	} else {
		audioEl.play();
		playBtn.textContent = '⏸ Pausar';
	}
});

	audioEl.addEventListener('play', ()=> playing = true);
	audioEl.addEventListener('pause', ()=> playing = false);

// --- Phrase burst animation ---
function createBurst(){
	// remove old pieces
	const old = phraseBox.querySelectorAll('.burst-piece');
	old.forEach(o=>o.remove());
	const colors = ['#ff6fa3','#ffd3e6','#a78bd7','#7be4d6','#ffd16a'];
	for(let i=0;i<12;i++){
		const p = document.createElement('div');
		p.className = 'burst-piece';
		p.style.background = colors[i % colors.length];
		const tx = (Math.random()*220-110).toFixed(0)+'px';
		const ty = (Math.random()*180-90).toFixed(0)+'px';
		p.style.setProperty('--tx', tx);
		p.style.setProperty('--ty', ty);
		phraseBox.appendChild(p);
		requestAnimationFrame(()=>{ p.classList.add('animate'); });
		setTimeout(()=>{ try{ p.remove(); }catch(e){} }, 900);
	}
}

// Iniciar con una frase inicial
showPhrase(0);

// --- Heart particles functions ---
function spawnHeart(x, y, size = 'med', emoji = '❤️'){
	if(!effectsEnabled || !heartsContainer) return;
	const el = document.createElement('div');
	el.className = 'heart-particle ' + (size || 'med');
	el.textContent = emoji;
	el.style.left = x + 'px'; el.style.top = y + 'px';
	heartsContainer.appendChild(el);
	// trigger animation
	requestAnimationFrame(()=> el.classList.add('animate'));
	el.addEventListener('animationend', ()=>{ try{ el.remove(); }catch(e){} });
}

function burstHearts(cx, cy, count = 12){
	if(!effectsEnabled || !heartsContainer) return;
	const emojis = ['❤️','💖','💕','🌸','💫'];
	for(let i=0;i<count;i++){
		const rx = cx + (Math.random()*160-80);
		const ry = cy + (Math.random()*120-60);
		const sz = Math.random()<0.5 ? 'small' : (Math.random()<0.7 ? 'med' : 'large');
		spawnHeart(rx, ry, sz, emojis[Math.floor(Math.random()*emojis.length)]);
	}
}

// Sweep light effect (large translucent band that moves across)
function sweepLight(fromX = -200, toX = window.innerWidth + 200){
	if(!effectsEnabled) return;
	const s = document.createElement('div');
	s.className = 'sweep';
	document.body.appendChild(s);
	// start position
	s.style.left = fromX + 'px';
	// trigger animation via transform
	requestAnimationFrame(()=>{
		s.style.transform = `translateX(${toX - fromX}px)`;
		s.style.opacity = '1';
	});
	setTimeout(()=>{ s.style.opacity = '0'; }, 700);
	setTimeout(()=>{ try{ s.remove(); }catch(e){} }, 1200);
}

// Sparkles (tiny particles) for extra sheen
function createSparkle(x,y){
	if(!effectsEnabled || !lumensContainer) return;
	const sp = document.createElement('div');
	sp.className = 'sparkle';
	sp.style.left = x + 'px'; sp.style.top = y + 'px';
	lumensContainer.appendChild(sp);
	requestAnimationFrame(()=> sp.classList.add('pop'));
	setTimeout(()=>{ try{ sp.remove(); }catch(e){} }, 900);
}

// shimmer the big heart briefly
function shimmerHeart(){
	const heart = document.querySelector('.big-heart');
	if(!heart) return;
	heart.classList.remove('shimmer');
	void heart.offsetWidth;
	heart.classList.add('shimmer');
}

// --- WebAudio ambient synth (fallback / background music si no hay audio subido) ---
let audioCtx, masterGain, ambientNodes = [];
let analyser = null;
let analyserData = null;
let lumensContainer = document.getElementById('lumens');
let lumens = [];
let heartsContainer = document.getElementById('hearts');
let effectsEnabled = true; // siempre activados por defecto (botón quitado)
let lastAudioHeart = 0;

// Ensure containers visible by default
if(heartsContainer) heartsContainer.style.display = 'block';
if(lumensContainer) lumensContainer.style.display = 'block';
function createAmbient(){
	try{
		audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		masterGain = audioCtx.createGain();
		masterGain.gain.value = 0.12;
		masterGain.connect(audioCtx.destination);

		// Create two detuned oscillators with gentle LFO on filter
		const now = audioCtx.currentTime;
		const osc1 = audioCtx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 220;
		const osc2 = audioCtx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 277; // a fifth-ish
		const g1 = audioCtx.createGain(); g1.gain.value = 0.6;
		const g2 = audioCtx.createGain(); g2.gain.value = 0.5;

		const filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1200;

		osc1.connect(g1); g1.connect(filter);
		osc2.connect(g2); g2.connect(filter);
		filter.connect(masterGain);

		// gentle LFO to modulate filter
		const lfo = audioCtx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.08;
		const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 300; // frequency modulation depth
		lfo.connect(lfoGain); lfoGain.connect(filter.frequency);

		osc1.start(now); osc2.start(now); lfo.start(now);

		ambientNodes = [osc1, osc2, lfo, g1, g2, filter];
		return true;
	}catch(e){
		console.warn('WebAudio no disponible', e);
		return false;
	}
}

function stopAmbient(){
	if(!audioCtx) return;
	try{ ambientNodes.forEach(n=>{ if(n && n.stop) try{n.stop()}catch(e){}}); }catch(e){}
	try{ masterGain.disconnect(); }catch(e){}
	audioCtx = null; ambientNodes = [];
}

// Setup analyser for audio (works with ambient synth or media element)
function setupAnalyserForAmbient(){
	if(!audioCtx) return;
	if(analyser) return;
	analyser = audioCtx.createAnalyser();
	analyser.fftSize = 256;
	const bufferLen = analyser.frequencyBinCount;
	analyserData = new Uint8Array(bufferLen);
	// reconnect masterGain -> analyser -> destination
	try{ masterGain.disconnect(); }catch(e){}
	masterGain.connect(analyser);
	analyser.connect(audioCtx.destination);
}

function setupAnalyserForMedia(){
	if(analyser) return;
	try{
		audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const src = audioCtx.createMediaElementSource(audioEl);
		analyser = audioCtx.createAnalyser(); analyser.fftSize = 256;
		analyserData = new Uint8Array(analyser.frequencyBinCount);
		src.connect(analyser);
		analyser.connect(audioCtx.destination);
	}catch(e){ console.warn('No se pudo crear analyser para media', e); }
}

// Intentar autoplay al cargar: si hay audio subido, reproducirlo; si no, crear ambient.
function tryAutoplay(){
	// preferir archivo subido
	if(audioEl.src){
		audioEl.play().then(()=>{
			// prepare analyser connected to media element
			setupAnalyserForMedia();
			playBtn.textContent = '⏸ Pausar';
		}).catch(()=>{
			// mostrar overlay para interacción del usuario
			startOverlay.setAttribute('aria-hidden','false');
		});
		return;
	}

	const ok = createAmbient();
	if(!ok){ startOverlay.setAttribute('aria-hidden','false'); return; }
	// Attempt resume/play
	if(audioCtx && audioCtx.state === 'suspended'){
		audioCtx.resume().then(()=>{
			setupAnalyserForAmbient();
		}).catch(()=> startOverlay.setAttribute('aria-hidden','false'));
	}
}

// Start button handler (user gesture to enable audio if autoplay blocked)
startBtn.addEventListener('click', ()=>{
	startOverlay.setAttribute('aria-hidden','true');
	if(audioEl.src){
		audioEl.play().then(()=>{ playBtn.textContent='⏸ Pausar'; setupAnalyserForMedia(); });
	} else {
		if(!audioCtx) createAmbient();
		if(audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
		setupAnalyserForAmbient();
	}
});

// Lumens: create floating lights
function createLumens(count = 10){
	if(!lumensContainer) return;
	lumensContainer.innerHTML = '';
	lumens = [];
	const w = window.innerWidth; const h = window.innerHeight;
	for(let i=0;i<count;i++){
		const el = document.createElement('div');
		el.className = 'lumen';
		// choose size
		const sz = Math.random();
		if(sz < 0.4) el.classList.add('small');
		else if(sz < 0.8) el.classList.add('med');
		else el.classList.add('big');
		// random color from vars
		const colors = ['var(--lumen-color-1)','var(--lumen-color-2)','var(--lumen-color-3)','var(--lumen-color-4)','var(--lumen-color-5)'];
		el.style.background = colors[Math.floor(Math.random()*colors.length)];
		const x = Math.random()*w; const y = Math.random()*h;
		el.style.left = x + 'px'; el.style.top = y + 'px';
		el.dataset.vx = (Math.random()*0.6-0.3).toFixed(3);
		el.dataset.vy = (Math.random()*0.4-0.2).toFixed(3);
		lumensContainer.appendChild(el);
		lumens.push(el);
	}
}

// animate lumens responding to analyser data and mouse parallax
let lumenAnimId = null;
function animateLumens(){
	if(analyser && analyserData){
		analyser.getByteFrequencyData(analyserData);
		// compute average
		let sum = 0; for(let i=0;i<analyserData.length;i++) sum += analyserData[i];
		const avg = sum / analyserData.length / 255; // 0..1

		// occasional small hearts on stronger audio peaks
		const now = Date.now();
		if(effectsEnabled && avg > 0.35 && now - lastAudioHeart > 300 + Math.random()*400){
			// spawn a few small hearts around center
			const cx = window.innerWidth/2; const cy = window.innerHeight/2;
			for(let h=0; h< (1 + Math.floor(avg*3)); h++){
				spawnHeart(cx + (Math.random()*200-100), cy + (Math.random()*160-80), Math.random()<0.6?'small':'med', Math.random()<0.6?'💖':'❤');
			}
			lastAudioHeart = now;
		}

		// sparkles and sweep on stronger peaks
		if(effectsEnabled && avg > 0.6 && Math.random() > 0.5){
			// create some sparkles near center and sweep
			const cx2 = window.innerWidth/2; const cy2 = window.innerHeight/2;
			for(let s=0;s<6;s++) createSparkle(cx2 + (Math.random()*240-120), cy2 + (Math.random()*160-80));
			// occasional sweep
			if(Math.random() > 0.4) sweepLight(-300, window.innerWidth + 300);
		}

		// shimmer heart on moderate peaks
		if(effectsEnabled && avg > 0.4 && Math.random() > 0.7) shimmerHeart();
		// scale lumens and adjust blur/opacity
		lumens.forEach((el,i)=>{
			const s = 0.7 + avg * (0.7 + (i%3)*0.15);
			el.style.transform = `translate(-50%,-50%) scale(${s})`;
			el.style.opacity = (0.3 + avg*0.9).toFixed(2);
			const blur = 10 + avg*28;
			el.style.filter = `blur(${blur}px)`;
		});
		// heart glow based on avg
		const heart = document.querySelector('.big-heart');
		if(heart) heart.style.filter = `drop-shadow(0 0 ${8+avg*28}px rgba(255,111,163,${0.12+avg*0.3}))`;
	}
	// float movement
	lumens.forEach(el=>{
		const vx = parseFloat(el.dataset.vx); const vy = parseFloat(el.dataset.vy);
		let x = parseFloat(el.style.left); let y = parseFloat(el.style.top);
		x += vx; y += vy;
		if(x < -80) x = window.innerWidth + 80; if(x > window.innerWidth + 80) x = -80;
		if(y < -80) y = window.innerHeight + 80; if(y > window.innerHeight + 80) y = -80;
		el.style.left = x + 'px'; el.style.top = y + 'px';
	});
	lumenAnimId = requestAnimationFrame(animateLumens);
}

// start lumens and animation loop
createLumens(14);

// parallax effect with mouse
window.addEventListener('mousemove', (e)=>{
	const cx = window.innerWidth/2; const cy = window.innerHeight/2;
	const dx = (e.clientX - cx) / cx; const dy = (e.clientY - cy) / cy;
	const flowers = document.querySelector('.flowers');
	const big = document.querySelector('.big-anim');
	const phrasesEl = document.querySelector('.phrases');
	if(flowers) flowers.style.transform = `translate(${dx*6}px,${dy*6}px)`;
	if(big) big.style.transform = `translate(${dx*10}px,${dy*10}px)`;
	if(phrasesEl) phrasesEl.style.transform = `translate(${dx*4}px,${dy*4}px)`;
});

// spawn heart on click/tap
window.addEventListener('click', (e)=>{
    if(!effectsEnabled) return;
    spawnHeart(e.clientX, e.clientY, Math.random()<0.6?'small':'med', Math.random()<0.7?'💖':'💕');
});

// start/stop animation loop depending on analyser availability
function ensureLumenLoop(){
	if(!lumenAnimId) lumenAnimId = requestAnimationFrame(animateLumens);
}

ensureLumenLoop();

// Intento inicial al cargar la página
// Comprobar si existe `background.mp3` en la carpeta y usarla si está disponible.
function loadPackagedSong(){
	return fetch('background.mp3', {method: 'HEAD'}).then(res => {
		if(res.ok){
			audioEl.src = 'background.mp3';
			return true;
		}
		return false;
	}).catch(()=> false);
}

window.addEventListener('load', async ()=>{
	const found = await loadPackagedSong();
	// Si hay una canción empaquetada, intentamos autoplay con ella; si no, intentamos autoplay con ambient.
	tryAutoplay();
	// Mostrar un pequeño aviso en consola para pruebas
	if(found) console.log('background.mp3 encontrada en el paquete — intentando reproducirla.');
});

