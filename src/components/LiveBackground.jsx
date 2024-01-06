import { useEffect } from "react";
import * as THREE from "three";

function LiveBackground() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Use 1 aspect ratio for square rendering
    const renderer = new THREE.WebGLRenderer();
    const container = document.getElementById("canvas-container");

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const numNodes = 200;

    // Create random vertices for nodes in the network
    for (let i = 0; i < numNodes; i++) {
      // Adjust the ranges of x, y, z coordinates to fit within the viewport
      const x = Math.random() * (width * 0.8) - width * 0.4; // Adjust the factor as needed
      const y = Math.random() * (height * 0.8) - height * 0.4; // Adjust the factor as needed
      const z = Math.random() * 200 - 100; // Keep z within a certain range if needed

      // Push the adjusted coordinates into the vertices array
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const material = new THREE.PointsMaterial({ size: 2, color: "#ffffff" });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Create lines between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(vertices),
      lineMaterial
    );
    scene.add(lines);

    camera.position.z = 300;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the network
      points.rotation.x += 0.001;
      points.rotation.y += 0.001;
      lines.rotation.x += 0.001;
      lines.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      // Cleanup code if necessary
    };
  }, []);

  return (
    <div
      id="canvas-container"
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

export default LiveBackground;
