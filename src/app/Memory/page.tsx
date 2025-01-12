"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Memory() {
  const [boxes, setBoxes] = useState<boolean[]>(Array(25).fill(false));
  const [stage, setStage] = useState<number>(1);
  const [currentLights, setCurrentLights] = useState<number[]>([]);
  const [bg, setBg] = useState<string[]>(
    Array(25).fill("bg-gray-700 hover:bg-blue-600")
  );
  const [clickCount, setClickCount] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(3);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  const generateRandomBoxes = useCallback(() => {
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
  }, [stage]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowGrid(true);
      generateRandomBoxes();
    }
  }, [countdown, generateRandomBoxes]);

  useEffect(() => {
    if (showGrid) {
      generateRandomBoxes();
    }
  }, [stage, showGrid, generateRandomBoxes]);

  const handleBoxClick = (index: number) => {
    if (currentLights.includes(index)) {
      setBg((prevBg) => {
        const newBg = [...prevBg];
        newBg[index] = "bg-green-600 cursor-auto";
        return newBg;
      });
      const updatedClickCount = clickCount + 1;
      setClickCount(updatedClickCount);

      if (updatedClickCount === currentLights.length) {
        setTimeout(() => setStage((prevStage) => prevStage + 1), 500);
      }
    } else {
      setBg((prevBg) => {
        const newBg = [...prevBg];
        newBg[index] = "bg-red-600";
        return newBg;
      });
      setTimeout(() => {
        generateRandomBoxes();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-3xl font-bold text-center pb-5">Memory Matrix</div>
      <div className="h-[50vh] flex items-center">
        {!showGrid ? (
          <div className="text-5xl font-bold">{countdown}</div>
        ) : (
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
        )}
      </div>
      <div className="text-center text-2xl pt-5">Stage: {stage}</div>
    </div>
  );
}
