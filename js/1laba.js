
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

    const sun_geometry = new THREE.SphereGeometry(2300, 80, 80);
    const sun_material = new THREE.MeshNormalMaterial({ wireframe: true });
    const sun = new THREE.Mesh(sun_geometry, sun_material);
    scene.add(sun);
    sun.position.y = 0;
    sun.position.x = 0;
    sun.position.z = 0;

    const createSphere = (geometry = [size, width, height], position = 0) => {
        if (geometry.length < 3) {
            throw new Error('Cannot create empty object!');
        }

        const obj = new THREE.Mesh(
            new THREE.SphereGeometry(...geometry),
            new THREE.MeshNormalMaterial()
        );

        obj.position.x = -1 * position;

        scene.add(obj);

        return obj;
    }

    const earth = createSphere([100, 40, 40], 7500);
    const mercury = createSphere([60, 20, 20], 4000);
    const venus = createSphere([90, 20, 20], 5500);
    const mars = createSphere([80, 20, 20], 8000);

    console.log(earth,mercury);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();


    const rotate = (planet, deg, speed, multiplier = 1) => {
        planet.position.x += Math.sin(deg * Math.PI / 180) * 1 * 50 * speed * multiplier;
        planet.position.z += Math.cos(deg * Math.PI / 180) * 1 * 50 * speed * multiplier;
    };

    let degree = 0;
    const rendering = function () {
        degree += 1.5;
        sun.rotation.y += 0.001;


        rotate(earth, degree, 3.5);
        rotate(mercury, degree, 2);
        rotate(venus, degree, 2.75);
        rotate(mars, degree, 4);

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(rendering);
    }

    camera.position.z = 15000;
    requestAnimationFrame(rendering);


}

