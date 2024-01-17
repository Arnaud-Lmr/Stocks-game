import { useState } from "react";
import AssetsDetails from "./AssetsDetails";
import Subtitle from "./Subtitle";

function AssetsOverview({ assets, totalEuro }) {
  const [showDetails, setShowDetails] = useState(true);
  const [totalHide, setTotalHide] = useState(false);

  //Somme des actifs possédés
  let totalAssets = Number(
    assets.reduce(
      (previous, current, index) =>
        previous + Number(current.quantity) * Number(current.mp),
      0
    )
  );
  //Somme totale du portefeuille (= somme des actifs possédés + solde du compte euros)
  let totalBalance = Number(totalEuro + totalAssets);

  //Création et affichage du bloc du portefeuille sur l'UI
  return (
    <div className="interfaceEl assetsOverviewContainer">
      <div className="flexContainer">
        <Subtitle>
          Assets Overview{" "}
          <button onClick={() => setShowDetails(!showDetails)}>
            <h4>{showDetails ? "- details" : "+ details"}</h4>
          </button>
        </Subtitle>
        <div className="displayAmount">
          <h3>Currency Account:&nbsp;</h3>
          <h1>
            {totalHide
              ? "***,**€"
              : totalEuro.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
          </h1>
        </div>
        <h1>+</h1>
        <div className="displayAmount">
          <h3>Assets Account:&nbsp;</h3>
          <h1>
            {totalHide
              ? "***,** €"
              : totalAssets.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
          </h1>
        </div>
        <h1>=</h1>
        <div className="displayAmount">
          <h3>Total Balance:&nbsp;</h3>
          <h1>
            {totalHide
              ? "***,**€"
              : totalBalance.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
          </h1>
        </div>
        <button onClick={() => setTotalHide(!totalHide)}>
          {totalHide ? (
            <i className="fa fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash"></i>
          )}
        </button>
      </div>
      {showDetails && <AssetsDetails assets={assets} />}
    </div>
  );
}

export default AssetsOverview;
