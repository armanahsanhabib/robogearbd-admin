/* eslint-disable react/prop-types */
const StatsCard = (props) => {
  return (
    <div className="card flex items-center overflow-hidden rounded-lg border bg-white drop-shadow-lg">
      <div
        className={`icon flex h-full flex-col items-center justify-center px-5 ${props.iconBg} text-5xl ${props.txtColor}`}
      >
        {props.icon}
      </div>
      <div className="text px-3 py-5">
        <h2 className={`text-lg font-semibold ${props.txtColor}`}>
          {props.text}
        </h2>
        <p className="text-xl font-semibold text-gray-800">{`${props.value} BDT`}</p>
      </div>
    </div>
  );
};

export default StatsCard;
