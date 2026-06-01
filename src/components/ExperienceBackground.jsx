import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ExperienceBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.15);

        // 2. Camera Setup
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 3.5, 7.5);
        camera.lookAt(0, 0, 0);

        // 3. Renderer Setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        if (currentMount) {
            currentMount.innerHTML = '';
            currentMount.appendChild(renderer.domElement);
        }

        // 4. Lighting Systems - Clean White Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 4, 15);
        pointLight.position.set(0, 5, 0);
        scene.add(pointLight);

        // 5. 3D Quantum Cyber Grid Geometry
        const gridCols = 60;
        const gridRows = 60;
        const numPoints = gridCols * gridRows;

        const gridGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(numPoints * 3);
        const colors = new Float32Array(numPoints * 3);
        const originalY = new Float32Array(numPoints);

        const spacing = 0.35;
        const halfWidth = (gridCols * spacing) / 2;
        const halfDepth = (gridRows * spacing) / 2;

        let index = 0;
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridRows; j++) {
                const x = i * spacing - halfWidth;
                const z = j * spacing - halfDepth;
                const y = 0; // Flat initially, animated in render loop

                positions[index * 3] = x;
                positions[index * 3 + 1] = y;
                positions[index * 3 + 2] = z;

                // Color configuration: elegant silver/gray matching About B&W theme
                colors[index * 3] = 0.45;     // Red
                colors[index * 3 + 1] = 0.45; // Green
                colors[index * 3 + 2] = 0.47; // Blue

                originalY[index] = 0;
                index++;
            }
        }

        gridGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        gridGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Point texture loader
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        const pointTexture = new THREE.CanvasTexture(canvas);

        // Points Material
        const gridMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            map: pointTexture,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const gridMesh = new THREE.Points(gridGeometry, gridMaterial);
        gridMesh.position.y = -1.2;
        scene.add(gridMesh);

        // 6. Floating Rising Data Packets - Clean White/Silver Particles
        const packetCount = 80;
        const packetGeometry = new THREE.BufferGeometry();
        const packetPositions = new Float32Array(packetCount * 3);
        const packetColors = new Float32Array(packetCount * 3);
        const packetSpeeds = new Float32Array(packetCount);

        for (let i = 0; i < packetCount; i++) {
            packetPositions[i * 3] = (Math.random() - 0.5) * 16;
            packetPositions[i * 3 + 1] = Math.random() * 8 - 4; // y position
            packetPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

            // Pure White/Silver glowing particles
            packetColors[i * 3] = 0.8;
            packetColors[i * 3 + 1] = 0.8;
            packetColors[i * 3 + 2] = 0.85;

            packetSpeeds[i] = Math.random() * 0.015 + 0.005;
        }

        packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
        packetGeometry.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

        const packetMaterial = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            map: pointTexture,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const packetMesh = new THREE.Points(packetGeometry, packetMaterial);
        scene.add(packetMesh);

        // 7. Mouse Interaction System
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 8. Render Loop Animation
        let time = 0;
        let requestRef;

        const animate = () => {
            time += 0.01;

            // Interpolate mouse coordinates smoothly
            targetMouseX += (mouseX - targetMouseX) * 0.05;
            targetMouseY += (mouseY - targetMouseY) * 0.05;

            // Position point light dynamically to follow mouse
            pointLight.position.x = targetMouseX * 8;
            pointLight.position.z = -targetMouseY * 5;

            // Gentle camera float
            camera.position.x = Math.sin(time * 0.2) * 0.8 + (targetMouseX * 0.5);
            camera.lookAt(0, -0.5, 0);

            // A. Update Grid Positions (Wave + Mouse Gravitational Warp)
            const posAttr = gridGeometry.getAttribute('position');
            const colAttr = gridGeometry.getAttribute('color');
            const positionsArray = posAttr.array;
            const colorsArray = colAttr.array;

            // Mouse projection point in grid coordinates
            const mouseProjX = targetMouseX * halfWidth;
            const mouseProjZ = -targetMouseY * halfDepth;

            for (let i = 0; i < numPoints; i++) {
                const x = positionsArray[i * 3];
                const z = positionsArray[i * 3 + 2];

                // Calculate double sine/cosine wave heights
                const waveY = (
                    Math.sin(time * 0.6 + x * 0.8) * Math.cos(time * 0.4 + z * 0.8) * 0.25 +
                    Math.sin(time * 1.2 + x * 0.4) * 0.1
                );

                // Gravitational deform calculation from mouse position
                const dx = x - mouseProjX;
                const dz = z - mouseProjZ;
                const distance = Math.sqrt(dx * dx + dz * dz);
                let degetY = 0;
                let hoverInfluence = 0;

                if (distance < 2.5) {
                    hoverInfluence = (2.5 - distance) / 2.5;
                    // Push the grid nodes vertically down near the mouse
                    degetY = -0.55 * Math.sin(hoverInfluence * Math.PI / 2);
                }

                // Apply heights
                positionsArray[i * 3 + 1] = waveY + degetY;

                // Dynamically light up nodes near the mouse with brilliant white glow
                if (hoverInfluence > 0.05) {
                    // Interpolate towards glowing white
                    colorsArray[i * 3] += (1.0 - colorsArray[i * 3]) * 0.16;
                    colorsArray[i * 3 + 1] += (1.0 - colorsArray[i * 3 + 1]) * 0.16;
                    colorsArray[i * 3 + 2] += (1.0 - colorsArray[i * 3 + 2]) * 0.16;
                } else {
                    // Slow decay back to ambient colors (dim silver/gray)
                    colorsArray[i * 3] += (0.4 - colorsArray[i * 3]) * 0.02;
                    colorsArray[i * 3 + 1] += (0.4 - colorsArray[i * 3 + 1]) * 0.02;
                    colorsArray[i * 3 + 2] += (0.45 - colorsArray[i * 3 + 2]) * 0.02;
                }
            }
            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;

            // B. Update Rising Packets (Y Ascent)
            const packetPosAttr = packetGeometry.getAttribute('position');
            const packetArray = packetPosAttr.array;

            for (let i = 0; i < packetCount; i++) {
                packetArray[i * 3 + 1] += packetSpeeds[i]; // Ascend

                // Reset position when ascending off-screen
                if (packetArray[i * 3 + 1] > 4.5) {
                    packetArray[i * 3] = (Math.random() - 0.5) * 16;
                    packetArray[i * 3 + 1] = -3.5; // Reset to grid level
                    packetArray[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
                }
            }
            packetPosAttr.needsUpdate = true;

            renderer.render(scene, camera);
            requestRef = requestAnimationFrame(animate);
        };

        animate();

        // 9. Resize Handling
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        // 10. Cleanups
        return () => {
            cancelAnimationFrame(requestRef);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            gridGeometry.dispose();
            gridMaterial.dispose();
            packetGeometry.dispose();
            packetMaterial.dispose();
            pointTexture.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0a0a0a]">
            {/* Ambient CRT screen glow styling */}
            <div className="absolute inset-0 z-10 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            
            {/* WebGL Canvas Mounting Container */}
            <div ref={mountRef} className="absolute inset-0 z-0 opacity-80 mix-blend-screen" />
        </div>
    );
};

export default ExperienceBackground;
