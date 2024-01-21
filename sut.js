import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const playerGeometry = new THREE.BoxGeometry();
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

const bullets = [];

function createBullet() {
    const bulletGeometry = new THREE.SphereGeometry(0.1);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.position.copy(player.position);
    scene.add(bullet);
    bullets.push(bullet);
}

const keyStates = {};
document.addEventListener('keydown', (event) => {
    keyStates[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keyStates[event.code] = false;
});

function animate() {
    requestAnimationFrame(animate);

    // Обработка движения игрока
    if (keyStates['ArrowUp']) player.position.y += 0.1;
    if (keyStates['ArrowDown']) player.position.y -= 0.1;
    if (keyStates['ArrowLeft']) player.position.x -= 0.1;
    if (keyStates['ArrowRight']) player.position.x += 0.1;

    if (keyStates['Space']) createBullet();

    bullets.forEach(bullet => {
        bullet.position.y += 0.2;
        if (bullet.position.y > 5) {
            scene.remove(bullet);
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });

    renderer.render(scene, camera);
}

animate();
