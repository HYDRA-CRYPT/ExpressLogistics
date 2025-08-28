import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Database, RefreshCw, Search } from "lucide-react";

interface NoDataUIProps {
  title?: string;
  message?: string;
  onRefresh?: () => void | Promise<void>;
  onSearch?: () => void;
  className?: string;
  icon?: "database" | "search";
}

interface ParticleUserData {
  originalY: number;
  originalX: number;
  speed: number;
  rotationSpeed: number;
  floatRadius: number;
}

const NoDataUI: React.FC<NoDataUIProps> = ({
  title = "No data available",
  message = "We couldn't find any data to display at the moment.",
  onRefresh,
  onSearch,
  className,
  icon = "database",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup for animated background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 150, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 150);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const particles: THREE.Mesh[] = [];

    // Create different geometric shapes
    const geometries = [
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.ConeGeometry(0.5, 1, 8),
      new THREE.CylinderGeometry(0.3, 0.3, 1, 8),
    ];

    for (let i = 0; i < 10; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6, 0.4, 0.7), // Blue-ish tones
        transparent: true,
        opacity: 0.4,
        wireframe: Math.random() > 0.5, // Some wireframe, some solid
      });

      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      particle.userData = {
        originalY: particle.position.y,
        originalX: particle.position.x,
        speed: Math.random() * 0.015 + 0.005,
        rotationSpeed: Math.random() * 0.02 + 0.005,
        floatRadius: Math.random() * 2 + 1,
      } as ParticleUserData;
      scene.add(particle);
      particles.push(particle);
    }

    camera.position.z = 12;

    // Animation loop
    const animate = (): void => {
      particles.forEach((particle, index) => {
        const userData = particle.userData as ParticleUserData;

        // Gentle rotation
        particle.rotation.x += userData.rotationSpeed;
        particle.rotation.y += userData.rotationSpeed * 0.7;
        particle.rotation.z += userData.rotationSpeed * 0.3;

        // Floating motion
        const time = Date.now() * userData.speed;
        particle.position.y =
          userData.originalY + Math.sin(time + index) * userData.floatRadius;
        particle.position.x =
          userData.originalX +
          Math.cos(time * 0.7 + index) * (userData.floatRadius * 0.5);

        // Pulsing opacity
        (particle.material as THREE.MeshBasicMaterial).opacity =
          0.2 + Math.sin(time * 0.5 + index) * 0.3;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particles.forEach((p) => {
        p.geometry.dispose();
        if (Array.isArray(p.material)) {
          p.material.forEach((material) => material.dispose());
        } else {
          (p.material as THREE.Material & { dispose(): void }).dispose();
        }
      });
      geometries.forEach((geo) => geo.dispose());
    };
  }, []);

  const IconComponent = icon === "search" ? Search : Database;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.6,
      }}
      className={`relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border border-blue-200/50 p-6 shadow-lg max-w-md mx-auto overflow-hidden ${
        className || ""
      }`}
    >
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="absolute top-0 right-0 pointer-events-none opacity-60"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl" />

      {/* Content */}
      <div className="relative flex items-start gap-4">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            damping: 20,
            stiffness: 400,
          }}
          className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
        >
          <IconComponent className="w-5 h-5 text-blue-500" />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-semibold text-blue-800 text-sm mb-1"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-blue-600 text-sm leading-relaxed break-words mb-3"
          >
            {message}
          </motion.p>

          {/* Action Buttons */}
          {(onRefresh || onSearch) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex gap-2"
            >
              {onRefresh && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRefresh}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </motion.button>
              )}

              {onSearch && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSearch}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Search className="w-3 h-3" />
                  Search
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Subtle animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-blue-300/30"
        animate={{
          borderColor: [
            "rgba(147, 197, 253, 0.3)",
            "rgba(147, 197, 253, 0.1)",
            "rgba(147, 197, 253, 0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default NoDataUI;
