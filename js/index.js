
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
    sun_texture.anisotropy = 16;

    const sun_geometry = new THREE.SphereGeometry(2300, 80, 80);
    const sun_material = new THREE.MeshPhongMaterial({map: sun_texture, emissive: 0xff0000})
    const sun = new THREE.Mesh(sun_geometry, sun_material);
    scene.add(sun);
    sun.position.y = 0;
    sun.position.x = 0;
    sun.position.z = 0;

    const createSphere = (geometry = [size, width, height], position = 0, texture = null) => {
        if (geometry.length < 3) {
            throw new Error('Cannot create empty object!');
        }
        
        let material = new THREE.MeshNormalMaterial();
        if(texture) {
            const loader = new THREE.TextureLoader();
            material = new THREE.MeshPhongMaterial({map: loader.load(texture)});
        }

        const obj = new THREE.Mesh(
            new THREE.SphereGeometry(...geometry),
            material
        );

        obj.position.x = -1 * position;

        scene.add(obj);

        return obj;
    }

    const earth = createSphere([100, 40, 40], 7500, './img/earth.jpg');
    const mercury = createSphere([60, 20, 20], 4000, './img/mercury.jpg');
    const venus = createSphere([90, 20, 20], 5500,'./img/venus.jpg');
    const mars = createSphere([80, 20, 20], 8000, './img/mars.jpg');
    const jupiter = createSphere([350, 20, 20], 10700, './img/jupiter.jpg');
    const saturn = createSphere([230, 20, 20], 12000, './img/saturn.jpg');

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();


    let t = 0;
    const rendering = function () {
        sun.rotation.y += 0.001;

        camera.position.set(earth.position.x, 0, earth.position.z + 500);
        camera.lookAt(earth.position);

        mercury.position.x = Math.sin(t * 0.3) * 4000;
        mercury.position.z = Math.cos(t * 0.3) * 4000;

        venus.position.x = Math.sin(t * 0.2) * 5500;
        venus.position.z = Math.cos(t * 0.2) * 5500;
        
        earth.position.x = Math.sin(t * 0.1) * 7500;
        earth.position.z = Math.cos(t * 0.1) * 7500;
        earth.rotation.y += 0.004;


        mars.position.x = Math.sin(t * 0.08) * 8000;
        mars.position.z = Math.cos(t * 0.08) * 8000;

        jupiter.position.x = Math.sin(t * 0.08) * 10700;
        jupiter.position.z = Math.cos(t * 0.08) * 10700;

        saturn.position.x = Math.sin(t * 0.08) * 12000;
        saturn.position.z = Math.cos(t * 0.08) * 12000;

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(rendering);
        t+=Math.PI/180*2;
    }

    camera.position.z = 15000;
    requestAnimationFrame(rendering);


}

