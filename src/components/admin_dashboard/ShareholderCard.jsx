/* eslint-disable react/prop-types */
const ShareholderCard = (props) => {
  return (
    <div className="card overflow-hidden rounded-lg border bg-white drop-shadow-lg">
      <div className={`info p-5 text-center ${props.bgColor}`}>
        <img
          src={props.img}
          alt={props.name}
          className={`mx-auto mb-2 w-16 rounded-full ring-4 ${props.ringColor}`}
        />
        <h1 className="text-lg font-semibold">{props.name}</h1>
        <h2 className="">Share: {props.sharePercentage}%</h2>
        <h2 className="">Invest: {props.totalInvest.toFixed(2)} BDT</h2>
        <h2 className="">Current Share: {props.currentShare.toFixed(2)} BDT</h2>
      </div>
      {/* <div className="data p-3"></div> */}
    </div>
  );
};

export default ShareholderCard;
