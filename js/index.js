
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
    const sun_texture = sun_loader.load('https://avatars.mds.yandex.net/get-images-cbir/3776399/X0Kej21mbBm4oBTuhbN1DA4224/ocr');

    const sun_geometry = new THREE.SphereGeometry(2300, 80, 80);
    const sun_material = new THREE.MeshPhongMaterial({ map: sun_texture, side:THREE.BackSide})
    const sun = new THREE.Mesh(sun_geometry, sun_material);

    sun.position.set(0,0,0)

    scene.add(sun);

    const createSphere = (geometry = [size, width, height], position = 0, texture = null) => {
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

        obj.position.x = -1 * position;
        obj.castShadow = true;

        scene.add(obj);

        return obj;
    }

    let earth = createSphere([100, 40, 40], 7500, 'https://avatars.mds.yandex.net/get-images-cbir/4027797/6IQhm60wtfWE5fiQ5KxUXw2214/ocr');
    let mercury = createSphere([60, 20, 20], 4000, 'https://avatars.mds.yandex.net/get-images-cbir/4509884/K_arIdh1KM2gk3k25pAJRg2511/ocr');
    let venus = createSphere([90, 20, 20], 5500, 'https://avatars.mds.yandex.net/get-images-cbir/4576821/5GTZ2aUaCci8L8y92q9t2Q9656/ocr');
    let mars = createSphere([80, 20, 20], 8000, 'https://avatars.mds.yandex.net/get-images-cbir/4330622/ij5v83NbBTtp-ctdP6k2zw1454/ocr');
    let jupiter = createSphere([350, 20, 20], 10700, 'https://avatars.mds.yandex.net/get-images-cbir/4549353/il4xziJs5o9vf47UcegWrw9975/ocr');
    let saturn = createSphere([230, 20, 20], 12000, 'https://avatars.mds.yandex.net/get-images-cbir/4303061/ohpCpE9yJCa21CmiivNMjw3903/ocr');

    const light = new THREE.AmbientLight(0x222222, 0.7);
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

        earth.rotation.y += 0.004;

        // controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(rendering);
        t += Math.PI / 180 * 2;
    }

    camera.position.z = 15000;
    requestAnimationFrame(rendering);
}

