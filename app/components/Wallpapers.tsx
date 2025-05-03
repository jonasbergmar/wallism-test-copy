import React from "react";

const wallpapers = [
  {
    id: 1,
    name: "Bamboo",
    image: "/BambooPattern.jpg",
    description: "Bamboo Wallpaper",
  },
  {
    id: 2,
    name: "Flowers",
    image: "/Flowers.jpg",
    description: "Flowers Wallpaper",
  },
  {
    id: 3,
    name: "Shells",
    image: "/Shell-Pattern.jpg",
    description: "Shells Wallpaper",
  },
  {
    id: 4,
    name: "Jungle",
    image: "/jungle.jpg",
    description: "Jungle Wallpaper",
  },
  {
    id: 5,
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
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 3,
      }}
    >
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
          <img
            src={wallpaper.image}
            alt={wallpaper.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default Wallpapers;
