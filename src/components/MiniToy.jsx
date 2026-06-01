import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MiniToy = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = 44;
        const height = 44;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 4.2;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        if (mountRef.current) {
            mountRef.current.innerHTML = '';
            mountRef.current.appendChild(renderer.domElement);
        }

        // Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 6.0, 15);
        pointLight.position.set(1.5, 1.5, 3.5);
        scene.add(pointLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 4.0);
        dirLight.position.set(-2, 3, 2);
        scene.add(dirLight);

        // Dual-Layer Materials for MiniToy (Tracsvpy Glass + Glowing Sketch Outlines)
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x0a0a0a,
            transparent: true,
            opacity: 0.5,
            roughness: 0.1,
            metalness: 0.0,
            transmission: 0.95,
            thickness: 0.8,
            side: THREE.DoubleSide
        });

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: true,
            depthTest: true
        });

        // Setup Group to contain glass backing + sketch outline lines
        const toyGroup = new THREE.Group();
        scene.add(toyGroup);

        // Load Strange Shapes 3D Model in Background
        const loader = new GLTFLoader();
        loader.load('/strange_shapes/scene.gltf', (gltf) => {
            let loadedGeometry = null;
            gltf.scene.traverse((child) => {
                if (child.isMesh && !loadedGeometry) {
                    loadedGeometry = child.geometry.clone().toNonIndexed();
                }
            });

            if (loadedGeometry) {
                // Center and scale to fit the 44px canvas perfectly
                loadedGeometry.center();
                loadedGeometry.scale(1.55, 1.55, 1.55);
                loadedGeometry.computeVertexNormals();

                // 1. Transparent glass backing mesh (tracsvpy)
                const glassMesh = new THREE.Mesh(loadedGeometry, glassMaterial);

                // 2. Pure sketch outline lines using EdgesGeometry
                const edgesGeom = new THREE.EdgesGeometry(loadedGeometry, 15);
                const lineMesh = new THREE.LineSegments(edgesGeom, lineMaterial);

                toyGroup.add(glassMesh);
                toyGroup.add(lineMesh);

                // Save references on toyGroup for memory disposal
                toyGroup.userData = { loadedGeometry, edgesGeom };
            }
        }, undefined, (error) => {
            console.error('Error loading mini 3D model:', error);
        });

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1; // -1 to 1
        };
        window.addEventListener('mousemove', handleMouseMove);

        let time = 0;
        let requestRef;
        let isHovered = false;

        const animate = () => {
            time += 0.015;

            // Smoothly interpolate mouse target
            targetX += (mouseX - targetX) * 0.08;
            targetY += (mouseY - targetY) * 0.08;

            // Base rotation + cursor influence
            const rotX = time * 0.4 - targetY * 1.2;
            const rotY = time * 0.8 + targetX * 1.2;

            toyGroup.rotation.set(rotX, rotY, 0);

            // Pulse & hover scale effect
            const baseScale = isHovered ? 1.25 : 1.0;
            const pulse = Math.sin(time * 3) * 0.05;
            const currentScale = baseScale + pulse;
            toyGroup.scale.set(currentScale, currentScale, currentScale);

            renderer.render(scene, camera);
            requestRef = requestAnimationFrame(animate);
        };

        animate();

        // Handle hover interactions
        const handleMouseEnter = () => {
            isHovered = true;
        };

        const handleMouseLeave = () => {
            isHovered = false;
        };

        const container = mountRef.current;
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(requestRef);
            window.removeEventListener('mousemove', handleMouseMove);
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
                if (renderer.domElement && container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
            }
            if (toyGroup.userData) {
                if (toyGroup.userData.loadedGeometry) toyGroup.userData.loadedGeometry.dispose();
                if (toyGroup.userData.edgesGeom) toyGroup.userData.edgesGeom.dispose();
            }
            glassMaterial.dispose();
            lineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="w-11 h-11 relative flex items-center justify-center pointer-events-auto transition-transform duration-300 active:scale-95"
            style={{ minWidth: '44px', minHeight: '44px' }}
        />
    );
};

export default MiniToy;
