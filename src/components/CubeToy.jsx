import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const CubeToy = ({ viewMode }) => {
    const mountRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = 44;
        const height = 44;

        const scene = new THREE.Scene();
        
        // Setup perspective camera to fit the 3D cube perfectly
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 6.0, 15);
        pointLight.position.set(1.5, 1.5, 3.5);
        scene.add(pointLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 4.0);
        dirLight.position.set(-2, 3, 2);
        scene.add(dirLight);

        // Premium Dual-Layer Glassmorphic Materials
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15,
            roughness: 0.02,
            metalness: 0.05,
            transmission: 0.99,
            thickness: 1.2,
            ior: 1.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            side: THREE.DoubleSide
        });

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: true,
            depthTest: true
        });

        // Nested Inner Glowing Wireframe Cube
        const innerLineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: true,
            depthTest: true
        });

        const toyGroup = new THREE.Group();
        scene.add(toyGroup);

        // 1. Outer Cube Geometries
        const boxSize = 1.35;
        const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const glassMesh = new THREE.Mesh(boxGeometry, glassMaterial);
        const edgesGeom = new THREE.EdgesGeometry(boxGeometry);
        const lineMesh = new THREE.LineSegments(edgesGeom, lineMaterial);

        // 2. Nested Inner Cube Geometries
        const innerSize = 0.65;
        const innerGeometry = new THREE.BoxGeometry(innerSize, innerSize, innerSize);
        const innerEdges = new THREE.EdgesGeometry(innerGeometry);
        const innerLineMesh = new THREE.LineSegments(innerEdges, innerLineMaterial);

        toyGroup.add(glassMesh);
        toyGroup.add(lineMesh);
        toyGroup.add(innerLineMesh);

        // Mouse displacement variables
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            // Normalized coordinates (-1 to 1) relative to window
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let time = 0;
        let requestRef;
        let internalHovered = false;

        // Core animation render loop
        const animate = () => {
            time += 0.015;

            // Interpolate mouse coordinates smoothly for cinematic lag/inertia
            targetX += (mouseX - targetX) * 0.08;
            targetY += (mouseY - targetY) * 0.08;

            // Outer cube rotation
            const rotX = time * 0.35 - targetY * 1.0;
            const rotY = time * 0.65 + targetX * 1.0;
            toyGroup.rotation.set(rotX, rotY, 0);

            // Counter-rotation for the nested inner cube to make it ultra-stylish
            innerLineMesh.rotation.set(-rotX * 1.5, rotY * 1.5, time * 0.5);

            // Scale pulse and hover grow
            const baseScale = internalHovered ? 1.25 : 1.0;
            const pulse = Math.sin(time * 3) * 0.04;
            const currentScale = baseScale + pulse;
            toyGroup.scale.set(currentScale, currentScale, currentScale);

            renderer.render(scene, camera);
            requestRef = requestAnimationFrame(animate);
        };

        animate();

        // Handle hover states for THREE scale multiplier
        const handleMouseEnter = () => {
            internalHovered = true;
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            internalHovered = false;
            setIsHovered(false);
        };

        const container = mountRef.current;
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup resources
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
            boxGeometry.dispose();
            edgesGeom.dispose();
            innerGeometry.dispose();
            innerEdges.dispose();
            glassMaterial.dispose();
            lineMaterial.dispose();
            innerLineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    // Determine back/reset helper text based on view state
    const labelText = viewMode === 'menu' ? 'RESET INTRO' : 'BACK TO MENU';

    return (
        <div className="flex items-center group pointer-events-auto">
            {/* The 3D Canvas Box Container */}
            <div className="relative w-11 h-11 flex items-center justify-center transition-transform duration-300 active:scale-95">
                {/* 3D Render Ref */}
                <div 
                    ref={mountRef} 
                    className="w-11 h-11 relative flex items-center justify-center"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                />


            </div>

            {/* Cyber Label slide out */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -8, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: 'auto' }}
                        exit={{ opacity: 0, x: -8, width: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden whitespace-nowrap pointer-events-none select-none flex items-center pr-2"
                    >
                        <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300 ml-1.5">
                            {labelText}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CubeToy;
