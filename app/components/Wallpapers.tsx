import React from "react";
import Image from "next/image";

const wallpapers = [
  {
    id: 1,
    name: "Bamboo",
    image: "/BambooPattern.jpg",
    description: "Bamboo Wallpaper",
  },

  {
    id: 2,
    name: "Shells",
    image: "/Shell-Pattern.jpg",
    description: "Shells Wallpaper",
  },
  {
    id: 3,
    name: "Jungle",
    image: "/jungle.jpg",
    description: "Jungle Wallpaper",
  },
  {
    id: 4,
    name: "Skog",
    image: "/skog.jpg",
    description: "Skog Wallpaper",
  },
];

type Wallpaper = {
  id: number;
  name: string;
  image: string;
  description: string;
};

type WallpapersProps = {
  onSelectWallpaper: (wallpaper: Wallpaper) => void;
};

const Wallpapers = ({ onSelectWallpaper }: WallpapersProps) => {
  return (
    <div className=" flex w-fit flex-wrap gap-4 p-4 bg-black/50 rounded-lg backdrop-blur-sm ">
      {wallpapers.map((wallpaper) => (
        <button
          key={wallpaper.id}
          onClick={() => onSelectWallpaper(wallpaper)}
          style={{
            width: "60px",
            height: "60px",
            padding: "0",
            border: "2px solid white",
            borderRadius: "4px",
            overflow: "hidden",
            cursor: "pointer",
            background: "none",
          }}
        >
          <Image
            src={wallpaper.image}
            alt={wallpaper.name}
            className="object-cover"
            width={1592}
            height={2048}
            quality={100}
            priority
          />
        </button>
      ))}
    </div>
  );
};

export default Wallpapers;
