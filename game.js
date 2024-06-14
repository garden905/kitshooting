const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// プレイヤーの設定
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

const bullets = [];
const enemies = [];

// キー入力とタッチ入力の設定
const keys = {
    right: false,
    left: false,
    space: false
};

// キー入力イベント
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'Space') keys.space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'Space') keys.space = false;
});

// タッチイベント
canvas.addEventListener('touchstart', (e) => {
    const touchX = e.touches[0].clientX - canvas.offsetLeft;
    if (touchX < player.x + player.width / 2) {
        keys.left = true;
    } else {
        keys.right = true;
    }
});

canvas.addEventListener('touchend', () => {
    keys.left = false;
    keys.right = false;
    keys.space = true;
});

// ゲームループ
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // プレイヤーの移動
    if (keys.right && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }

    // 弾の発射
    if (keys.space) {
        bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10, speed: 7 });
        keys.space = false;
    }

    // 弾の移動
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // プレイヤーの描画
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 弾の描画
    ctx.fillStyle = 'red';
    for (const bullet of bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

// ゲームの開始
gameLoop();
