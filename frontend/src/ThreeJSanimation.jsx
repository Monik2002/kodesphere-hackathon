import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeJSAnimation() {
  const scene = useRef();
  const camera = useRef();
  const renderer = useRef();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const windowHalfX = useRef(window.innerWidth / 2);
  const windowHalfY = useRef(window.innerHeight / 2);
  const geometry = useRef();
  const position = useRef();
  const positionArray = useRef();
  const velocity = useRef();
  const velocityArray = useRef();
  const count = 5000;

  const animate = () => {
    for (let index = 0; index < count; index++) {
      velocityArray.current[2 * index] += 0.015;
      velocityArray.current[2 * index + 1] += 0.015;
      positionArray.current[6 * index + 2] +=
        velocityArray.current[2 * index] + 0.03;
      positionArray.current[6 * index + 5] +=
        velocityArray.current[2 * index + 1];

      if (positionArray.current[6 * index + 2] > 200) {
        let z = Math.random() * 200 - 200;
        positionArray.current[6 * index + 2] = z;
        positionArray.current[6 * index + 5] = z;
        velocityArray.current[2 * index] = 0;
        velocityArray.current[2 * index + 1] = 0;
      }
    }

    position.current.needsUpdate = true;
    renderer.current.render(scene.current, camera.current);
    requestAnimationFrame(animate);
    render();
  };

  const render = () => {
    camera.current.position.x +=
      (-mouseX.current * 0.1 - camera.current.position.x) * 0.02;
    camera.current.position.y +=
      (-mouseY.current * 0.1 - camera.current.position.y) * 0.02;
    camera.current.lookAt(scene.current.position);
    renderer.current.render(scene.current, camera.current);
  };

  useEffect(() => {
    function init() {
      scene.current = new THREE.Scene();
      camera.current = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        1,
        500
      );
      camera.current.position.z = 200;

      renderer.current = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.current.domElement);

      geometry.current = new THREE.BufferGeometry();
      geometry.current.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(6 * count), 3)
      );
      geometry.current.setAttribute(
        "velocity",
        new THREE.BufferAttribute(new Float32Array(2 * count), 1)
      );

      position.current = geometry.current.getAttribute("position");
      positionArray.current = position.current.array;
      velocity.current = geometry.current.getAttribute("velocity");
      velocityArray.current = velocity.current.array;

      for (let index = 0; index < count; index++) {
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 800 - 400;
        const z = Math.random() * 400 - 200;
        const x2 = x;
        const y2 = y;
        const z2 = z;

        positionArray.current[6 * index] = x;
        positionArray.current[6 * index + 1] = y;
        positionArray.current[6 * index + 2] = z;

        positionArray.current[6 * index + 3] = x2;
        positionArray.current[6 * index + 4] = y2;
        positionArray.current[6 * index + 5] = z2;

        velocityArray.current[2 * index] = 0;
        velocityArray.current[2 * index + 1] = 0;
      }

      const material = new THREE.LineBasicMaterial({ color: 0xffffff });

      const lines = new THREE.LineSegments(geometry.current, material);
      scene.current.add(lines);

      window.addEventListener("resize", resize);
      document.body.addEventListener("pointermove", onPointerMove);
    }

    function resize() {
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(window.innerWidth, window.innerHeight);
      windowHalfX.current = window.innerWidth / 2;
      windowHalfY.current = window.innerHeight / 2;
    }

    function onPointerMove(event) {
      mouseX.current = event.clientX - windowHalfX.current;
      mouseY.current = event.clientY - windowHalfY.current;
    }

    init();
    animate();
  }, [count]);

  return <></>;
}

export default ThreeJSAnimation;
