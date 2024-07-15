"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Content from "@/components/Hero/Content";
import { data } from "../data";
import Bag from "@/components/Hero/Bag";

function Loader() {
  return (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center w-screen h-screen font-semibold">
      Loading...
    </div>
  );
}

function Hero() {
  const banner = useRef();
  const logo = useRef();
  const [condition, setCondition] = useState(false);
  const [loading, setLoading] = useState(true);
  const savedIndex =
    typeof window !== "undefined"
      ? localStorage.getItem("activeDataIndex")
      : null;
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    if (savedIndex !== null) {
      setActiveData(data[parseInt(savedIndex)]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (activeData) {
      const activeIndex = data.findIndex((item) => item.id === activeData.id);
      localStorage.setItem("activeDataIndex", activeIndex.toString());
    }
  }, [activeData]);

  const handleSwatchClick = (item) => {
    if (activeData && activeData.id !== item.id) {
      setActiveData(item);
    }
  };

  useEffect(() => {
    if (activeData) {
      gsap.to(banner.current, {
        background: activeData.background,
        ease: "power3.inOut",
        duration: 0.8,
      });

      gsap.to(logo.current, {
        color: activeData.headingColor,
        ease: "power3.inOut",
        duration: 0.8,
      });
    }
  }, [activeData]);

  if (loading) {
    return <Loader />;
  }

  if (!activeData) {
    return null;
  }

  return (
    <div
      ref={banner}
      className="relative h-screen overflow-hidden"
      style={{ background: activeData.background }}>
      <div ref={logo} className="logo">
        MISFIT.
      </div>
      <div className="hero-container">
        <Content
          activeData={activeData}
          condition={condition}
          setCondition={setCondition}
        />
        <div className="lg:w-1/2 w-full">
          <Bag
            activeData={activeData}
            swatchData={data}
            condition={condition}
            handleSwatchClick={handleSwatchClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
