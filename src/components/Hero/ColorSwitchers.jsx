import React from "react";

function ColorSwitcher({
  activeData,
  swatchData,
  handleSwatchClick,
  condition,
}) {
  const handleSwatchClicked = (id) => {
    if (condition) return;

    handleSwatchClick(id);
  };

  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2  lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
      {swatchData.map((o) => (
        <SingleColorSwitcher
          key={o.id}
          item={o}
          handleClick={handleSwatchClicked}
          activeID={activeData.id}
        />
      ))}
    </div>
  );
}

export default ColorSwitcher;

function SingleColorSwitcher({ activeID, item, handleClick }) {
  return (
    <div
      className={`cursor-pointer w-9 h-9 p-1 rounded-full drop-shadow-xl bg-white  transition ease-in hover:scale-110 ${
        item.id === activeID ? "scale-125" : ""
      }`}
      onClick={() => handleClick(item)}>
      <div
        style={{ backgroundColor: item.swatchColor }}
        className="w-full h-full  rounded-full"></div>
    </div>
  );
}
