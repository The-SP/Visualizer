const Bars = ({ array }) => {
  let marginValue = 2;
  if (array.length > 50) marginValue = 1;
  else if (array.length < 15) marginValue = 10;

  function getColor(bar) {
    if (bar.isSorted) return "green";
    else if (bar.isSorting) return "red";
    else return "pink";
  }

  return (
    <div className="array-container d-flex justify-content-between align-items-end m-auto">
      {array.map((bar, index) => (
        <div
          className="array-bar"
          key={index}
          style={{
            height: bar.height,
            margin: marginValue,
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