window.onload = () => {
    const canvas = document.getElementById('canvas');
    const width = window.innerWidth;
    canvas.setAttribute('width', width);
    const height = window.innerHeight;
    canvas.setAttribute('height', height);

    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000);
    camera.position.set(-3, 5, 30);

    const scene = new THREE.Scene();

    {
        const geometry = new THREE.PlaneGeometry(5,5,12,12);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.y = 7;
        mesh.position.x = -2;
    }

    {
        const cubeSize = 4;
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.y = 10;
        mesh.position.x = 1;
        mesh.position.z = -2;
    }

    {
        // const cubeSize = 4;
        const geometry = new THREE.SphereGeometry(2.5,20,20);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.y = 10;
        mesh.position.x = -5;
        mesh.position.z = -3;
    }

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    renderer.render(scene, camera);

}

