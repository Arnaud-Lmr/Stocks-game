import Asset from "./Asset";

//Création du tableau du portefeuille
function AssetsDetails({ assets }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Market Price</th>
            <th>Mean Cost Price</th>
            <th>Total Value</th>
            <th>All Time Return</th>
            <th>ATR (%)</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <Asset asset={asset} key={asset.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetsDetails;
