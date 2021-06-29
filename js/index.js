window.onload = () => {
    const canvas = document.getElementById('canvas');
    const width = window.innerWidth;
    canvas.setAttribute('width', width);
    const height = window.innerHeight;
    canvas.setAttribute('height', height);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 30000);
    camera.position.set(0, 0, 4000);

    const scene = new THREE.Scene();

    const sun_loader = new THREE.TextureLoader();
    const sun_texture = sun_loader.load('./img/sun.jpg');

    const sun_geometry = new THREE.SphereGeometry(2300, 80, 80);
    const sun_material = new THREE.MeshPhongMaterial({ map: sun_texture, side: THREE.BackSide })
    const sun = new THREE.Mesh(sun_geometry, sun_material);

    sun.position.set(0, 0, 0)

    scene.add(sun);

    const createSphere = (geometry = [size, width, height], radius = 0, texture = null) => {
        if (geometry.length < 3) {
            throw new Error('Cannot create empty object!');
        }

        let material = new THREE.MeshNormalMaterial();
        if (texture) {
            const loader = new THREE.TextureLoader();
            material = new THREE.MeshPhongMaterial({ map: loader.load(texture) });
        }

        const obj = new THREE.Mesh(
            new THREE.SphereGeometry(...geometry),
            material
        );

        obj.position.x = -1 * radius;
        obj.castShadow = true;

        scene.add(obj);
        scene.add(createOrbit(radius))

        return obj;
    }
    
    function createOrbit(radius) {
        let geometry = new THREE.BufferGeometry();
        let material = new THREE.PointsMaterial({ color: 0xC0C0C0, size: 1, sizeAttenuation: false });
        let vertices = [];

        for (let i = 0; i < 20000; i++) {
            x = Math.sin(Math.PI / 180 * i) * radius;
            y = 0;
            z = Math.cos(Math.PI / 180 * i) * radius;
            vertices.push(x, y, z);
        }

        vertices = new Float32Array(vertices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        let orbit = new THREE.Line(geometry, material);
        // orbit.castShadow = true;

        return orbit;
    }

    let earth = createSphere([100, 40, 40], 7500, './img/earth.jpg');
    let mercury = createSphere([60, 20, 20], 4000, './img/mercury.jpg');
    let venus = createSphere([90, 20, 20], 5500, './img/venus.jpg');
    let mars = createSphere([80, 20, 20], 8000, './img/mars.jpg');
    let jupiter = createSphere([350, 20, 20], 10700, './img/jupiter.jpg');
    let saturn = createSphere([230, 20, 20], 12000, './img/saturn.jpg');

    let saturnRing = (() => {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ color: 0x3A3A3A, size: 1, sizeAttenuation: false });

        let vertices = [];
        for (let i = 0; i < 20000; i++)
            vertices.push(
                Math.sin(Math.PI / 180 * i) * (550 - i / 80),
                Math.random() * 20,
                Math.cos(Math.PI / 180 * i) * (550 - i / 80)
            );

        vertices = new Float32Array(vertices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const ring = new THREE.Points(geometry, material);
        ring.castShadow = true;
        scene.add(ring);
        return ring;
    })();

    let whiteStars = (() => {
        let geometry = new THREE.BufferGeometry();
        let vertices = [];

        let starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1, opacity: 0.1, sizeAttenuation: false });

        for (let i = 0; i < 40000; i++) {
            vertices.push(
                2000 * Math.random() - 1000,
                2000 * Math.random() - 1000,
                2000 * Math.random() - 1000);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        let stars = new THREE.Points(geometry, starsMaterial);
        stars.scale.set(80, 80, 80)
        scene.add(stars);
        return stars
    })();
    
    let blueStars = (() => {
        let geometry = new THREE.BufferGeometry();
        let vertices = [];

        let starsMaterial = new THREE.PointsMaterial({ color: 0xAAC1FF, size: 1, opacity: 0.1, sizeAttenuation: false });

        for (let i = 0; i < 10000; i++) {
            vertices.push(
                2000 * Math.random() - 1000,
                2000 * Math.random() - 1000,
                2000 * Math.random() - 1000);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        let stars = new THREE.Points(geometry, starsMaterial);
        stars.scale.set(80, 80, 80)
        scene.add(stars);
        return stars;
    })();


    const light = new THREE.AmbientLight(0x222222, 1);
    scene.add(light);

    const sun_light = new THREE.PointLight(0xffffff, 1.25, 200000);
    sun_light.position.set(0, 0, 0);
    sun_light.castShadow = false;
    sun_light.shadow.mapSize.width = 4096;
    sun_light.shadow.mapSize.height = 4096;

    scene.add(sun_light);

    const setPositionHelper = (counter) => (planet, multiplier, distance) => {
        planet.position.x = Math.sin(t * multiplier) * distance;
        planet.position.z = Math.cos(t * multiplier) * distance;
    }



    let t = 0;
    const rendering = function () {
        sun.rotation.y += 0.001;
        camera.position.y = 1000;
        camera.lookAt(0, 0, 0);

        const rotate = setPositionHelper(t);

        rotate(mercury, 0.3, 4000);
        rotate(venus, 0.2, 5500);
        rotate(earth, 0.1, 7500);
        rotate(mars, 0.08, 8000);
        rotate(jupiter, 0.08, 10700);
        rotate(saturn, 0.08, 12000);
        rotate(saturnRing, 0.08, 12000)

        earth.rotation.y += 0.004;

        renderer.render(scene, camera);
        requestAnimationFrame(rendering);
        t += Math.PI / 180 * 2;
    }

    camera.position.z = 15000;
    requestAnimationFrame(rendering);
}

