"use client";
import React, { useState, useEffect } from "react";

export default function Memory() {
  const [boxes, setBoxes] = useState<boolean[]>(Array(25).fill(false));
  const [stage, setStage] = useState<number>(1);
  const [currentLights, setCurrentLights] = useState<number[]>([]);
  const [bg, setBg] = useState<string[]>(
    Array(25).fill("bg-gray-700 hover:bg-blue-600")
  );
  const [clickCount, setClickCount] = useState<number>(0);

  const generateRandomBoxes = () => {
    const newLights: number[] = [];
    const updatedBoxes: boolean[] = Array(25).fill(false);

    for (let i = 0; i < stage + 3; i++) {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * 25);
      } while (newLights.includes(randomIndex));
      newLights.push(randomIndex);
      updatedBoxes[randomIndex] = true;
    }
    setBoxes(updatedBoxes);
    setCurrentLights(newLights);
    setClickCount(0);

    setBg(updatedBoxes.map((box) => (box ? "bg-green-600" : "bg-gray-700")));
    setTimeout(() => {
      setBg(Array(25).fill("bg-gray-700 hover:bg-blue-600"));
    }, 500);
  };

  useEffect(() => {
    generateRandomBoxes();
  }, [stage]);

  const handleBoxClick = (index: number) => {
    if (currentLights.includes(index)) {
      setBg((prevBg) => {
        const newBg = [...prevBg];
        newBg[index] = "bg-green-600 cursor-auto";
        return newBg;
      });
      setClickCount((prev) => prev + 1);

      if (clickCount + 1 === currentLights.length) {
        setStage((prevStage) => prevStage + 1);
      }
    } else {
      setBg((prevBg) => {
        const newBg = [...prevBg];
        newBg[index] = "bg-red-600";
        return newBg;
      });
      setTimeout(() => {
        generateRandomBoxes();
      }, 10000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-3xl font-bold text-center pb-5">Memory Matrix</div>

      <div className="grid grid-cols-5 gap-1">
        {boxes.map((_, index) => (
          <button
            key={index}
            className={`w-16 h-16 rounded transition-all duration-300 ease-in-out ${bg[index]}`}
            onClick={() => handleBoxClick(index)}
            disabled={bg[index] === "bg-green-600 cursor-auto"}
          />
        ))}
      </div>

      <div className="text-center text-2xl pt-5">Stage: {stage}</div>
    </div>
  );
}
