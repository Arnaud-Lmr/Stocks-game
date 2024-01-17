import CurrentPricesDetails from "./CurrentPricesDetails";
import Subtitle from "./Subtitle";

//Création et affichage du bloc des cours de bourse sur l'UI
function CurrentPricesOverview({ currentPrices }) {
  return (
    <div className="interfaceEl">
      <Subtitle>Current Prices</Subtitle>
      <CurrentPricesDetails currentPrices={currentPrices} />
    </div>
  );
}

export default CurrentPricesOverview;
