import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const CyberBackground = ({ viewMode, isBlasted }) => {
    const mountRef = useRef(null);
    const stateRef = useRef({ viewMode, isBlasted });

    // Sync props to ref for the animation loop to prevent rebuilding WebGL context on prop changes
    useEffect(() => {
        stateRef.current = { viewMode, isBlasted };
    }, [viewMode, isBlasted]);

    useEffect(() => {
        const currentMount = mountRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;

        if (currentMount) {
            currentMount.innerHTML = '';
            currentMount.appendChild(renderer.domElement);
        }

        // Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 4.0);
        directionalLight.position.set(5, 8, 5);
        scene.add(directionalLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 2.0);
        backLight.position.set(-5, -3, 5);
        scene.add(backLight);

        const cameraLight = new THREE.PointLight(0xffffff, 3.5, 25);
        cameraLight.position.set(0, 0, 8);
        scene.add(cameraLight);

        // Elegant physical glass material for background shapes (tracsvpy)
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x0a0a0a,
            transparent: true,
            opacity: 0.35,
            roughness: 0.1,
            metalness: 0.0,
            transmission: 0.95,
            thickness: 1.0,
            side: THREE.DoubleSide,
            flatShading: true,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        });

        const placeholderGeometry = new THREE.BufferGeometry();
        const mesh = new THREE.Mesh(placeholderGeometry, material);
        mesh.scale.set(0.8, 0.8, 0.8);
        scene.add(mesh);

        // Red/Cyan Wireframes for Chromatic Aberration Effect
        const wireMaterialRed = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });
        const wireMaterialCyan = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
        });

        const wireMeshRed = new THREE.Mesh(placeholderGeometry, wireMaterialRed);
        const wireMeshCyan = new THREE.Mesh(placeholderGeometry, wireMaterialCyan);
        scene.add(wireMeshRed);
        scene.add(wireMeshCyan);

        // Subdivide Geometry Helper to split faces into smaller particles (positions + UVs)
        const subdivideGeometry = (geom) => {
            const posAttr = geom.getAttribute('position');
            const uvAttr = geom.getAttribute('uv');
            if (!posAttr) return geom;

            const count = posAttr.count;
            const newPositions = [];
            const newUvs = [];

            for (let i = 0; i < count; i += 3) {
                const ax = posAttr.getX(i);
                const ay = posAttr.getY(i);
                const az = posAttr.getZ(i);

                const bx = posAttr.getX(i + 1);
                const by = posAttr.getY(i + 1);
                const bz = posAttr.getZ(i + 1);

                const cx = posAttr.getX(i + 2);
                const cy = posAttr.getY(i + 2);
                const cz = posAttr.getZ(i + 2);

                const mabx = (ax + bx) / 2;
                const maby = (ay + by) / 2;
                const mabz = (az + bz) / 2;

                const mbcx = (bx + cx) / 2;
                const mbcy = (by + cy) / 2;
                const mbcz = (bz + cz) / 2;

                const mcax = (cx + ax) / 2;
                const mcay = (cy + ay) / 2;
                const mcaz = (cz + az) / 2;

                newPositions.push(
                    ax, ay, az,  mabx, maby, mabz,  mcax, mcay, mcaz,
                    bx, by, bz,  mbcx, mbcy, mbcz,  mabx, maby, mabz,
                    cx, cy, cz,  mcax, mcay, mcaz,  mbcx, mbcy, mbcz,
                    mabx, maby, mabz,  mbcx, mbcy, mbcz,  mcax, mcay, mcaz
                );

                if (uvAttr) {
                    const au = uvAttr.getX(i);
                    const av = uvAttr.getY(i);

                    const bu = uvAttr.getX(i + 1);
                    const bv = uvAttr.getY(i + 1);

                    const cu = uvAttr.getX(i + 2);
                    const cv = uvAttr.getY(i + 2);

                    const mabu = (au + bu) / 2;
                    const mabv = (av + bv) / 2;

                    const mbcu = (bu + cu) / 2;
                    const mbcv = (bv + cv) / 2;

                    const mcau = (cu + au) / 2;
                    const mcav = (cv + av) / 2;

                    newUvs.push(
                        au, av,  mabu, mabv,  mcau, mcav,
                        bu, bv,  mbcu, mbcv,  mabu, mabv,
                        cu, cv,  mcau, mcav,  mbcu, mbcv,
                        mabu, mabv,  mbcu, mbcv,  mcau, mcav
                    );
                }
            }

            const newGeom = new THREE.BufferGeometry();
            newGeom.setAttribute('position', new THREE.Float32BufferAttribute(newPositions, 3));
            if (uvAttr) {
                newGeom.setAttribute('uv', new THREE.Float32BufferAttribute(newUvs, 2));
            }
            return newGeom;
        };

        // Variables for loaded geometry data
        let positionAttribute = null;
        const faceCentroids = [];
        const originalPositions = [];

        // Load Strange Shapes 3D Model in Background
        const loader = new GLTFLoader();
        loader.load('/strange_shapes/scene.gltf', (gltf) => {
            let loadedGeometry = null;
            let loadedMaterial = null;
            gltf.scene.traverse((child) => {
                if (child.isMesh && !loadedGeometry) {
                    let tempGeom = child.geometry.clone().toNonIndexed();
                    // Subdivide three times for 64x more and even smaller particles
                    tempGeom = subdivideGeometry(tempGeom);
                    tempGeom = subdivideGeometry(tempGeom);
                    tempGeom = subdivideGeometry(tempGeom);
                    loadedGeometry = tempGeom;
                    loadedMaterial = child.material.clone();
                }
            });

            if (loadedGeometry) {
                // Center and scale the geometry to match original torus size
                loadedGeometry.center();
                loadedGeometry.scale(5.2, 5.2, 5.2);

                // Pre-calculate face centroids for shatter mechanics
                positionAttribute = loadedGeometry.getAttribute('position');

                for (let i = 0; i < positionAttribute.count; i += 3) {
                    const v1 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
                    const v2 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 1);
                    const v3 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 2);

                    const centroid = new THREE.Vector3().addVectors(v1, v2).add(v3).divideScalar(3);
                    faceCentroids.push(centroid);

                    originalPositions.push(v1.clone(), v2.clone(), v3.clone());
                }

                loadedGeometry.computeVertexNormals();

                // Swap placeholder with loaded geometry
                mesh.geometry.dispose();
                mesh.geometry = loadedGeometry;

                wireMeshRed.geometry.dispose();
                wireMeshRed.geometry = loadedGeometry;

                wireMeshCyan.geometry.dispose();
                wireMeshCyan.geometry = loadedGeometry;

                // Keep the custom transparent physical glass material active on the mesh
                if (loadedMaterial) {
                    loadedMaterial.dispose();
                }
            }
        }, undefined, (error) => {
            console.error('Error loading 3D model in background:', error);
        });

        // --- 3D Particle Vortex for Work Section (Exclusively) ---
        const vortexCount = 2000;
        const vortexGeometry = new THREE.BufferGeometry();
        const vortexPositions = new Float32Array(vortexCount * 3);
        const vortexColors = new Float32Array(vortexCount * 3);
        
        for (let i = 0; i < vortexCount; i++) {
            const radius = Math.random() * 12 + 2;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 30;

            vortexPositions[i * 3] = radius * Math.cos(theta);
            vortexPositions[i * 3 + 1] = y;
            vortexPositions[i * 3 + 2] = radius * Math.sin(theta) - 5;
            
            // Neon colors: mix of cyan and pink
            const isPink = Math.random() > 0.5;
            vortexColors[i * 3] = isPink ? 1.0 : 0.0;
            vortexColors[i * 3 + 1] = isPink ? 0.2 : 1.0;
            vortexColors[i * 3 + 2] = isPink ? 0.8 : 1.0;
        }
        vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));
        vortexGeometry.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3));

        const vortexMaterial = new THREE.PointsMaterial({
            size: window.innerWidth < 768 ? 0.04 : 0.06,
            vertexColors: true,
            transparent: true,
            opacity: 0.0,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const vortexPoints = new THREE.Points(vortexGeometry, vortexMaterial);
        vortexPoints.rotation.x = Math.PI / 3;
        scene.add(vortexPoints);

        // --- 3D Interactive Cyber Plexus Network for About Section (Exclusively) ---
        const plexusCount = window.innerWidth < 768 ? 60 : 110;
        const plexusGeometry = new THREE.BufferGeometry();
        const plexusPositions = new Float32Array(plexusCount * 3);
        const plexusColors = new Float32Array(plexusCount * 3);
        const plexusNodes = [];
        const maxPlexusDistance = 1.9;

        for (let i = 0; i < plexusCount; i++) {
            const node = {
                pos: new THREE.Vector3(
                    (Math.random() - 0.5) * 11,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 5 - 2.5
                ),
                vel: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.012,
                    (Math.random() - 0.5) * 0.012,
                    (Math.random() - 0.5) * 0.008
                )
            };
            plexusNodes.push(node);
            
            plexusPositions[i * 3] = node.pos.x;
            plexusPositions[i * 3 + 1] = node.pos.y;
            plexusPositions[i * 3 + 2] = node.pos.z;

            // Gradient: mix of white and silver for Black & White theme
            const isSilver = Math.random() > 0.5;
            plexusColors[i * 3] = isSilver ? 0.8 : 1.0; // Red
            plexusColors[i * 3 + 1] = isSilver ? 0.8 : 1.0; // Green
            plexusColors[i * 3 + 2] = isSilver ? 0.85 : 1.0; // Blue
        }
        plexusGeometry.setAttribute('position', new THREE.BufferAttribute(plexusPositions, 3));
        plexusGeometry.setAttribute('color', new THREE.BufferAttribute(plexusColors, 3));

        const plexusPointsMaterial = new THREE.PointsMaterial({
            size: window.innerWidth < 768 ? 0.05 : 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.0,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const plexusPoints = new THREE.Points(plexusGeometry, plexusPointsMaterial);
        scene.add(plexusPoints);

        // Pre-allocate lines connection system
        const maxPlexusLines = plexusCount * 6;
        const plexusLineGeometry = new THREE.BufferGeometry();
        const plexusLinePositions = new Float32Array(maxPlexusLines * 2 * 3);
        const plexusLineColors = new Float32Array(maxPlexusLines * 2 * 3);

        plexusLineGeometry.setAttribute('position', new THREE.BufferAttribute(plexusLinePositions, 3));
        plexusLineGeometry.setAttribute('color', new THREE.BufferAttribute(plexusLineColors, 3));

        const plexusLineMaterial = new THREE.LineBasicMaterial({
            transparent: true,
            opacity: 0.0,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const plexusLines = new THREE.LineSegments(plexusLineGeometry, plexusLineMaterial);
        scene.add(plexusLines);



        // Mouse interaction enabled
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let time = 0;
        let requestRef;

        // Current transition parameters for smooth interpolation
        let currentPos = new THREE.Vector3(0, 0, 0);
        let targetPos = new THREE.Vector3(0, 0, 0);
        let currentScale = 0.8;
        let targetScale = 0.8;
        let currentShatter = 3.5;
        let targetShatter = 11.5;
        let currentOpacity = 1.0;
        let targetOpacity = 1.0;

        // Vortex state variables
        let currentVortexOpacity = 0.0;
        let targetVortexOpacity = 0.0;

        // Digital Wave state variables
        let currentWaveOpacity = 0.0;
        let targetWaveOpacity = 0.0;

        const animate = () => {
            time += 0.005;

            // Interpolate mouse coordinates smoothly
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Extract variables from state ref
            const { viewMode: activeView, isBlasted: blasted } = stateRef.current;

            // Adjust targets based on UI state
            if (!blasted) {
                // If not blasted, keep it invisible/hidden (handled by loading screen)
                targetOpacity = 0.0;
                targetScale = 0.0;
                targetVortexOpacity = 0.0;
                targetWaveOpacity = 0.0;
            } else if (activeView === 'about') {
                // EXCLUSIVE Digital Wave Backdrop is active in About section
                targetOpacity = 0.0; // Hide Torus Knot
                targetScale = 0.0;
                targetVortexOpacity = 0.0; // Hide Vortex
                targetWaveOpacity = 0.85; // Fade in Digital Wave
            } else if (activeView === 'work') {
                // EXCLUSIVE Particle Vortex Backdrop for Work
                targetOpacity = 0.0; 
                targetScale = 0.0;
                targetVortexOpacity = 0.85; // Fade in Vortex
                targetWaveOpacity = 0.0; 
            } else if (activeView === 'experience') {
                // Fade out WebGL elements completely for dedicated Experience background
                targetOpacity = 0.0;
                targetScale = 0.0;
                targetVortexOpacity = 0.0;
                targetWaveOpacity = 0.0;
            } else {
                // Show majestic rotating shattered torus knot in menu selection
                targetVortexOpacity = 0.0; // Hide Vortex
                targetWaveOpacity = 0.0; // Hide Digital Wave
                
                targetOpacity = 1.0; 
                targetPos.set(0, 0, 0);
                targetScale = window.innerWidth < 768 ? 0.75 : 0.95;
                targetShatter = 11.5;
            }

            // Smooth linear interpolation (lerp) for states
            currentPos.lerp(targetPos, 0.04);
            currentScale += (targetScale - currentScale) * 0.04;
            currentShatter += (targetShatter - currentShatter) * 0.04;
            currentOpacity += (targetOpacity - currentOpacity) * 0.04;

            currentVortexOpacity += (targetVortexOpacity - currentVortexOpacity) * 0.04;

            currentWaveOpacity += (targetWaveOpacity - currentWaveOpacity) * 0.04;

            // Apply positions and scales for Torus Knot meshes
            mesh.position.copy(currentPos);
            wireMeshRed.position.copy(currentPos);
            wireMeshCyan.position.copy(currentPos);

            const hoverScale = currentScale + (Math.sin(time * 5) * 0.015);
            mesh.scale.set(hoverScale, hoverScale, hoverScale);
            wireMeshRed.scale.set(hoverScale * 1.01, hoverScale * 1.01, hoverScale * 1.01);
            wireMeshCyan.scale.set(hoverScale * 1.01, hoverScale * 1.01, hoverScale * 1.01);

            // Apply opacity uniforms to Torus Knot
            material.opacity = currentOpacity;
            material.transparent = currentOpacity < 1.0;
            wireMaterialRed.opacity = currentOpacity * 0.25;
            wireMaterialCyan.opacity = currentOpacity * 0.25;

            // Apply opacity to Vortex
            vortexMaterial.opacity = currentVortexOpacity;
            vortexMaterial.transparent = currentVortexOpacity < 1.0;

            // Apply opacity to Plexus mesh and lines
            plexusPointsMaterial.opacity = currentWaveOpacity;
            plexusPointsMaterial.transparent = currentWaveOpacity < 1.0;
            plexusLineMaterial.opacity = currentWaveOpacity;
            plexusLineMaterial.transparent = currentWaveOpacity < 1.0;

            // Continuous rotation for Torus
            const rotX = time * 0.1 - targetY * 0.2;
            const rotY = time * 0.3 + targetX * 0.2;

            mesh.rotation.set(rotX, rotY, 0);
            wireMeshRed.rotation.set(rotX, rotY, 0);
            wireMeshCyan.rotation.set(rotX, rotY, 0);

            // Animate Vortex
            if (currentVortexOpacity > 0.01) {
                vortexPoints.rotation.y = time * 0.2;
                vortexPoints.rotation.z = time * 0.05;
                vortexPoints.rotation.x = Math.PI / 3 + targetY * 0.15;
            }

            // Chromatic aberration offset based on mouse position
            const chromaticOffset = 0.02 + Math.abs(targetX * 0.02);
            wireMeshRed.position.x += chromaticOffset;
            wireMeshCyan.position.x -= chromaticOffset;

            // Animate 3D Cyber Plexus (About section only)
            if (currentWaveOpacity > 0.01) {
                const ptsAttr = plexusGeometry.getAttribute('position');
                const linePtsAttr = plexusLineGeometry.getAttribute('position');
                const lineColorAttr = plexusLineGeometry.getAttribute('color');
                
                let lineIndex = 0;
                
                const mouseRadiusX = targetX * 5.5;
                const mouseRadiusY = targetY * 4.0;

                // Move plexus nodes
                for (let i = 0; i < plexusCount; i++) {
                    const node = plexusNodes[i];
                    
                    node.pos.x += node.vel.x;
                    node.pos.y += node.vel.y;
                    node.pos.z += node.vel.z;

                    // Bounce off boundary volumes
                    if (Math.abs(node.pos.x) > 7.5) node.vel.x *= -1;
                    if (Math.abs(node.pos.y) > 5.5) node.vel.y *= -1;
                    if (node.pos.z > 0.0 || node.pos.z < -5.5) node.vel.z *= -1;

                    // Mouse repelling physics
                    const dx = node.pos.x - mouseRadiusX;
                    const dy = node.pos.y - mouseRadiusY;
                    const distToMouse = Math.sqrt(dx * dx + dy * dy);
                    
                    const drawPos = node.pos.clone();
                    if (distToMouse < 2.8) {
                        const pushForce = (2.8 - distToMouse) * 0.16;
                        drawPos.x += (dx / distToMouse) * pushForce;
                        drawPos.y += (dy / distToMouse) * pushForce;
                    }

                    ptsAttr.setXYZ(i, drawPos.x, drawPos.y, drawPos.z);
                }
                ptsAttr.needsUpdate = true;

                // Build connection line segment vertices dynamically
                for (let i = 0; i < plexusCount; i++) {
                    const posA = new THREE.Vector3().fromBufferAttribute(ptsAttr, i);
                    
                    for (let j = i + 1; j < plexusCount; j++) {
                        const posB = new THREE.Vector3().fromBufferAttribute(ptsAttr, j);
                        const dist = posA.distanceTo(posB);
                        
                        if (dist < maxPlexusDistance && lineIndex < maxPlexusLines) {
                            // Line positions
                            linePtsAttr.setXYZ(lineIndex * 2, posA.x, posA.y, posA.z);
                            linePtsAttr.setXYZ(lineIndex * 2 + 1, posB.x, posB.y, posB.z);
                            
                            // Line opacity fades as connection stretches
                            const lineAlpha = (1.0 - dist / maxPlexusDistance) * 0.38;
                            
                            // Connective silver/white lines
                            lineColorAttr.setXYZ(lineIndex * 2, 0.9 * lineAlpha, 0.9 * lineAlpha, 0.95 * lineAlpha);
                            lineColorAttr.setXYZ(lineIndex * 2 + 1, 0.9 * lineAlpha, 0.9 * lineAlpha, 0.95 * lineAlpha);
                            
                            lineIndex++;
                        }
                    }
                }

                // Clear unused lines from buffer
                for (let k = lineIndex; k < maxPlexusLines; k++) {
                    linePtsAttr.setXYZ(k * 2, 0, 0, 0);
                    linePtsAttr.setXYZ(k * 2 + 1, 0, 0, 0);
                    lineColorAttr.setXYZ(k * 2, 0, 0, 0);
                    lineColorAttr.setXYZ(k * 2 + 1, 0, 0, 0);
                }

                linePtsAttr.needsUpdate = true;
                lineColorAttr.needsUpdate = true;

                // Gentle ambient rotation
                plexusPoints.rotation.y = time * 0.035;
                plexusLines.rotation.y = time * 0.035;
            }

            // Update vertex positions for shattering displacement (only if loaded)
            if (currentOpacity > 0.01 && positionAttribute) {
                for (let i = 0; i < positionAttribute.count; i += 3) {
                    const faceIndex = i / 3;
                    const v1 = originalPositions[i].clone();
                    const v2 = originalPositions[i + 1].clone();
                    const v3 = originalPositions[i + 2].clone();

                    // Blend outward normal with deterministic pseudo-random spherical direction to fill the center void
                    const normalDir = faceCentroids[faceIndex].clone().normalize();
                    const seedX = Math.sin(faceIndex * 12.9898) * 43758.5453;
                    const seedY = Math.sin(faceIndex * 78.233) * 43758.5453;
                    const seedZ = Math.sin(faceIndex * 45.164) * 43758.5453;
                    const randomDir = new THREE.Vector3(
                        (seedX - Math.floor(seedX)) - 0.5,
                        (seedY - Math.floor(seedY)) - 0.5,
                        (seedZ - Math.floor(seedZ)) - 0.5
                    ).normalize();
                    
                    const dir = normalDir.clone().lerp(randomDir, 0.72).normalize();
                    let blastDist = currentShatter * (1.0 + (faceIndex % 3) * 0.6);

                    const floatOffset = Math.sin(time * 10 + faceIndex) * 0.08;
                    blastDist += floatOffset;

                    const offset = dir.multiplyScalar(blastDist);

                    v1.add(offset);
                    v2.add(offset);
                    v3.add(offset);

                    positionAttribute.setXYZ(i, v1.x, v1.y, v1.z);
                    positionAttribute.setXYZ(i + 1, v2.x, v2.y, v2.z);
                    positionAttribute.setXYZ(i + 2, v3.x, v3.y, v3.z);
                }
                positionAttribute.needsUpdate = true;
            }

            renderer.render(scene, camera);
            requestRef = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(requestRef);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            mesh.geometry.dispose();
            mesh.material.dispose();
            material.dispose();
            wireMaterialRed.dispose();
            wireMaterialCyan.dispose();
            vortexGeometry.dispose();
            vortexMaterial.dispose();
            plexusGeometry.dispose();
            plexusPointsMaterial.dispose();
            plexusLineGeometry.dispose();
            plexusLineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
            {/* Film grain noise overlay */}
            <div className="absolute inset-0 z-10 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            {/* Canvas for 3D Background */}
            <div ref={mountRef} className="absolute inset-0 z-0 opacity-100 mix-blend-screen" />
        </div>
    );
};

export default CyberBackground;
