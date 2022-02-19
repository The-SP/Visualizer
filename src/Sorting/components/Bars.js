const Bars = ({ array }) => {
  let marginValue;
  if (array.length < 15) marginValue = 10;
  else if (array.length < 30) marginValue = 5;
  else if (array.length < 50) marginValue = 2;
  else marginValue = 1;

  function getColor(bar) {
    if (bar.isSorted) return "green";
    else if (bar.isSorting) return "red";
    else return bar.color;
  }

  return (
    <div className="array-container d-flex justify-content-between align-items-end m-auto">
      {array.map((bar, index) => (
        <div
          className="array-bar text-center"
          key={index}
          style={{
            height: bar.height,
            marginLeft: marginValue,
            backgroundColor: getColor(bar),
          }}
        >
          {/* display height value if no of bars is low */}
          {array.length < 65 ? bar.height : ""}
        </div>
      ))}
    </div>
  );
};

export default Bars;
