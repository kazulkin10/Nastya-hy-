// Данные маршрутов
const routes = [
    {
        name: "Раменское → Казанский вокзал",
        stations: [
            "Раменское",
            "Быково",
            "Ильинская",
            "Казанский вокзал"
        ],
        messages: [
            "Настя, пусть твой день начинается с улыбки и позитива!",
            "Помни, что ты способна на великие свершения!",
            "Каждый твой шаг приближает к успеху — продолжай в том же духе!",
            "Ты заслуживаешь самого лучшего, что может предложить этот мир!"
        ]
    },
    {
        name: "Казанский → Павелецкий вокзал",
        stations: [
            "Казанский вокзал",
            "Павелецкий вокзал"
        ],
        messages: [
            "Настя, твоя внутренняя сила восхищает!",
            "Ты уникальна и неповторима — никогда не забывай об этом!"
        ]
    },
    {
        name: "Павелецкий → Дагестан",
        stations: [
            "Павелецкий вокзал",
            "Рязань",
            "Тамбов",
            "Волгоград",
            "Астрахань",
            "Махачкала"
        ],
        messages: [
            "Настя, пусть каждая дорога открывает перед тобой новые возможности!",
            "Твоя уверенность в себе — ключ к любым дверям!",
            "Помни, что ты сильнее, чем думаешь, и умнее, чем кажешься!",
            "Каждый день — это шанс стать лучше, чем вчера!",
            "Твоё упорство достойно восхищения — так держать!",
            "Ты заслуживаешь всего самого светлого и прекрасного!"
        ]
    }
];

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Создаем искры
    function createSparkles() {
        const container = document.querySelector('.container');
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // Случайная позиция
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 6 + 4;
            const delay = Math.random() * 5;
            
            sparkle.style.left = `${left}%`;
            sparkle.style.top = `${top}%`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.animationDelay = `${delay}s`;
            
            container.appendChild(sparkle);
        }
    }
    createSparkles();
    
    // Инициализация Three.js сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(document.getElementById('scene').offsetWidth, document.getElementById('scene').offsetHeight);
    document.getElementById('scene').appendChild(renderer.domElement);
    
    // Настройка камеры
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = 0;
    
    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);
    
    // Создаем "рельсы" (дорожку)
    const railGeometry = new THREE.BoxGeometry(30, 0.1, 0.5);
    const railMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const rails = new THREE.Mesh(railGeometry, railMaterial);
    rails.position.y = -1;
    scene.add(rails);
    
    // Создаем шпалы
    const sleeperGeometry = new THREE.BoxGeometry(0.2, 0.1, 2);
    const sleeperMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
    
    for (let i = -14; i <= 14; i += 1.5) {
        const sleeper = new THREE.Mesh(sleeperGeometry, sleeperMaterial);
        sleeper.position.set(i, -1.05, 0);
        scene.add(sleeper);
    }
    
    // Создаем простую модель поезда
    function createTrain() {
        const trainGroup = new THREE.Group();
        
        // Основной корпус
        const bodyGeometry = new THREE.BoxGeometry(2, 1, 1);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3498db,
            metalness: 0.3,
            roughness: 0.4
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        trainGroup.add(body);
        
        // Кабина
        const cabinGeometry = new THREE.BoxGeometry(1, 0.8, 1);
        const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x2980b9 });
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.set(-1.2, 0.9, 0);
        trainGroup.add(cabin);
        
        // Окна
        const windowGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.01);
        const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
        window1.position.set(0.4, 0.7, 0.51);
        trainGroup.add(window1);
        
        const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
        window2.position.set(-0.4, 0.7, 0.51);
        trainGroup.add(window2);
        
        // Колеса
        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
        wheelGeometry.rotateZ(Math.PI/2);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
        
        const wheelPositions = [
            [1, -0.3, 0.6],
            [1, -0.3, -0.6],
            [-1, -0.3, 0.6],
            [-1, -0.3, -0.6]
        ];
        
        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(pos[0], pos[1], pos[2]);
            trainGroup.add(wheel);
        });
        
        // Дымовая труба
        const chimneyGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.5, 16);
        const chimneyMaterial = new THREE.MeshStandardMaterial({ color: 0x7f8c8d });
        const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
        chimney.position.set(-1.5, 1.4, 0);
        trainGroup.add(chimney);
        
        // Дым
        const smokeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const smokeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xecf0f1,
            transparent: true,
            opacity: 0.6
        });
        const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smoke.position.set(-1.5, 1.9, 0);
        trainGroup.add(smoke);
        
        return trainGroup;
    }
    
    const train = createTrain();
    train.position.x = -12;
    scene.add(train);
    
    // Анимация дыма
    function animateSmoke() {
        const smoke = train.children.find(child => child.position.y > 1.8);
        if (smoke) {
            smoke.scale.x = Math.sin(Date.now() * 0.002) * 0.2 + 1;
            smoke.scale.y = Math.sin(Date.now() * 0.0015) * 0.3 + 1;
            smoke.position.y += 0.01;
            
            if (smoke.position.y > 2.5) {
                smoke.position.y = 1.9;
            }
        }
    }
    
    // Анимация колес
    function animateWheels() {
        train.children.forEach(child => {
            if (child.type === 'Mesh' && child.position.y === -0.3) {
                child.rotation.x += 0.1;
            }
        });
    }
    
    // Анимация
    function animate() {
        requestAnimationFrame(animate);
        
        animateSmoke();
        animateWheels();
        
        // Плавное перемещение камеры
        camera.position.x += (train.position.x - camera.position.x + 3) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        camera.aspect = document.getElementById('scene').offsetWidth / document.getElementById('scene').offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(document.getElementById('scene').offsetWidth, document.getElementById('scene').offsetHeight);
    });
    
    let currentRoute = 0;
    let currentStation = 0;
    let isPlaying = false;
    let animationInterval;
    
    // Обновляем информацию о станции
    function updateStationInfo() {
        document.getElementById('route-name').textContent = routes[currentRoute].name;
        document.getElementById('current-route').textContent = routes[currentRoute].name;
        document.getElementById('current-station').textContent = routes[currentRoute].stations[currentStation];
        
        if (currentStation < routes[currentRoute].stations.length - 1) {
            document.getElementById('next-station').textContent = routes[currentRoute].stations[currentStation + 1];
        } else {
            document.getElementById('next-station').textContent = "Конечная станция";
        }
        
        document.getElementById('message').textContent = routes[currentRoute].messages[currentStation];
        
        // Обновляем прогресс
        const progress = (currentStation / (routes[currentRoute].stations.length - 1)) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }
    
    // Переключение на следующую станцию
    function nextStation() {
        if (currentStation < routes[currentRoute].stations.length - 1) {
            currentStation++;
            updateStationInfo();
            
            // Анимация поезда
            const targetX = -12 + (24 * (currentStation / (routes[currentRoute].stations.length - 1)));
            animateTrainTo(targetX);
        } else {
            pauseJourney();
            document.getElementById('message').textContent = "Маршрут завершён! Настя, твоё путешествие только начинается!";
        }
    }
    
    // Анимация движения поезда
    function animateTrainTo(targetX) {
        const startX = train.position.x;
        const duration = 3000;
        const startTime = Date.now();
        
        function moveTrain() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            train.position.x = startX + (targetX - startX) * progress;
            
            if (progress < 1) {
                requestAnimationFrame(moveTrain);
            }
        }
        
        moveTrain();
    }
    
    // Запуск путешествия
    function startJourney() {
        if (isPlaying) return;
        
        isPlaying = true;
        document.getElementById('play-btn').classList.add('active');
        document.getElementById('pause-btn').classList.remove('active');
        
        animationInterval = setInterval(() => {
            nextStation();
            
            // Если достигли конца маршрута
            if (currentStation >= routes[currentRoute].stations.length - 1) {
                pauseJourney();
            }
        }, 5000);
    }
    
    // Пауза
    function pauseJourney() {
        isPlaying = false;
        clearInterval(animationInterval);
        document.getElementById('play-btn').classList.remove('active');
        document.getElementById('pause-btn').classList.add('active');
    }
    
    // Переключение маршрута
    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentRoute = parseInt(btn.dataset.route);
            currentStation = 0;
            updateStationInfo();
            
            // Перемещаем поезд в начало
            train.position.x = -12;
            
            pauseJourney();
        });
    });
    
    // Кнопки управления
    document.getElementById('play-btn').addEventListener('click', startJourney);
    document.getElementById('pause-btn').addEventListener('click', pauseJourney);
    document.getElementById('next-btn').addEventListener('click', nextStation);
    
    // Инициализация
    updateStationInfo();
});
