// Создаем функцию "canvas" и задаем формат игры 
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Создаем изображения и м загружаем их в игру 
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Создаем переменную и загружаем звук в игру 
var fly = new Audio();
var score_audio = new Audio();
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// Создаем переменную "gap" в которой прописываемрасстояние 90 px расстояние между верхней и нижней преградой для птички
var gap = 90;

// Создаем функцию нажатия клавиши и поднятие птички на определенной количество пикселей
document.addEventListener("keydown", moveUp);

function moveUp() {
	yPos -= 25;
	fly.play();

}
// Создаем преграды для птички верх
var pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0
}
// Задаем значение очков в игре "0"
var score = 0;

// Создаем переменную позицию птички в середине игрового экрена по координатам х, у
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// Создаем преграды вверху и внизу, что бы появлялись на разных высотах
function draw() {
	ctx.drawImage(bg, 0, 0);

	for (var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 50) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}
		// Создаем функцию, при которой прописываем, что если птичка соприкасается с припятствием, игра останавливается и начинаем заново
		if (xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
			location.reload();
		}

		// Создаем функцию перезапуска игры
		if (pipe[i].x == 5) {
			score++;
			//score_audio.play();
		}
	}
	// Рисуем обьекты в игре
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	// Создаем переменную гравитации
	yPos += grav;

	// Создаем шрифт и цвет счета плюс каждый раз будет прибавляться один при пролете птички через припятствия 
	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);


	// Вызов функции анимации в игре
	requestAnimationFrame(draw);

}
// Вызов функции изображений в игре
pipeBottom.onload = draw;
