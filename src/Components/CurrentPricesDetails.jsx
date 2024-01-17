import CurrentPrice from "./CurrentPrice";

//Création du tableau des cours de bourse
function CurrentPricesDetails({ currentPrices }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Market Price</th>
        </tr>
      </thead>
      <tbody>
        {currentPrices.map((currentPrice) => (
          <CurrentPrice currentPrice={currentPrice} key={currentPrice.name} />
        ))}
      </tbody>
    </table>
  );
}

export default CurrentPricesDetails;
