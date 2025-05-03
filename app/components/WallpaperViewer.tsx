/* eslint-disable @next/next/no-img-element */
"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import Wallpapers from "./Wallpapers";
import Slider from "./Slider";

const Model = ({
  wallpaper,
  tileX,
  tileY,
  offsetX,
  offsetY,
}: {
  wallpaper: { image: string };
  tileX: number;
  tileY: number;
  offsetX: number;
  offsetY: number;
}) => {
  const { scene, cameras } = useGLTF("/WallsExport2.gltf");
  const texture = useTexture(wallpaper.image, (texture) => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 16;
  });
  const gltfCamera = cameras && cameras[0];
  const set = useThree((state) => state.set);

  // Set texture to repeat (tile)
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(tileX, tileY);
  texture.offset.set(offsetX, offsetY);
  texture.flipY = false;

  if ("encoding" in texture && "sRGBEncoding" in THREE) {
    texture.encoding = THREE.sRGBEncoding;
  }

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshBasicMaterial({
        map: texture,
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        toneMapped: false,
      });
      child.rotation.set(0, 0, 0);
    }
  });

  scene.position.set(0, 0, 0);
  scene.scale.set(1, 1, 1);

  useEffect(() => {
    if (gltfCamera && gltfCamera instanceof THREE.PerspectiveCamera) {
      set({ camera: gltfCamera });
    }
  }, [gltfCamera, set]);

  return <primitive object={scene} />;
};

const WallpaperViewer = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState({
    id: 1,
    name: "Bamboo",
    image: "/BambooPattern.jpg",
    description: "Bamboo Wallpaper",
  });

  const [tileX, setTileX] = useState(2);
  const [tileY, setTileY] = useState(2);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row items-end justify-center lg:w-4/5 lg:h-4/5 w-full px-4">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "2048px",
          aspectRatio: "2048/1536",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src="/BG.jpg"
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            mixBlendMode: "multiply",
            pointerEvents: "none",
            WebkitMaskImage: "url(/FG.png)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage: "url(/FG.png)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              background: "#fff",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
            }}
          >
            <Suspense fallback={null}>
              <Model
                wallpaper={selectedWallpaper}
                tileX={tileX}
                tileY={tileY}
                offsetX={offsetX}
                offsetY={offsetY}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4 rounded-lg backdrop-blur-sm justify-start items-start">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            padding: "10px",
            borderRadius: "8px",
            pointerEvents: "auto",
          }}
        >
          <Slider
            label="Tile X"
            value={tileX}
            min={1}
            max={20}
            step={0.1}
            onChange={setTileX}
            formatValue={(v) => v.toFixed(1)}
          />
          <Slider
            label="Tile Y"
            value={tileY}
            min={1}
            max={20}
            step={0.1}
            onChange={setTileY}
            formatValue={(v) => v.toFixed(1)}
          />
          <Slider
            label="Offset X"
            value={offsetX}
            min={-0.5}
            max={0.5}
            step={0.05}
            onChange={setOffsetX}
          />
          <Slider
            label="Offset Y"
            value={offsetY}
            min={-0.5}
            max={0.5}
            step={0.05}
            onChange={setOffsetY}
          />
        </div>
        <Wallpapers onSelectWallpaper={setSelectedWallpaper} />
      </div>
    </div>
  );
};

export default WallpaperViewer;
