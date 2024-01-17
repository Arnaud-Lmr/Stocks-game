import { useState } from "react";
import Subtitle from "./Subtitle";

function OrderTable({
  currentPrices,
  assets,
  onAddAssets,
  onUpdateAssets,
  onSellAssets,
  quantity,
  setQuantity,
  totalEuro,
  setTotalEuro,
  ticker,
  setTicker,
  stockNameIndex,
}) {
  const [buy, setBuy] = useState(true);

  //Fonction qui est exécutée lors de l'envoi du formulaire
  function handleSubmit(e) {
    //Evite de re-render l'app automatiquement
    e.preventDefault();

    //Récupère le nom de l'actif dans l'objet currentPrices à partir de l'indice du ticker renseigné par l'utilisateur
    let assetName = currentPrices[stockNameIndex].name;

    //Définition d'un nouvel actif
    const newAsset = {
      name: assetName,
      ticker: ticker,
      quantity: Number(quantity),
      mp: currentPrices[stockNameIndex].mp,
      mcp: currentPrices[stockNameIndex].mp,
    };

    //Si l'utilisateur n'a pas choisi d'action, renvoie une erreur
    if (ticker === "select") {
      alert("Please select a Ticker name");
      return;
    }
    //Si l'utilisateur a choisi un nombre d'action négatif, renvoie une erreur
    if (quantity <= 0) {
      alert("Please select a quantity above 0");
      return;
    }
    //Récupère dans l'objet assets, l'indice du ticker de l'action choisie par l'utilisateur
    const assetNameIndex = assets
      .map((object) => object.ticker)
      .indexOf(ticker);
    //Ici on implémente quatre cas:
    //Cas 1: Si l'on veut acheter l'asset et que celui-ci n'existe pas dans la liste d'actifs possédés on ajoute celui-ci à la liste d'assets.
    if (assetNameIndex === -1 && buy) {
      onAddAssets(newAsset);
    } //Cas 2: Si l'on veut acheter l'asset et que l'asset existe déjà dans la liste d'actifs possédés, on met à jour les éléments.
    else if (assetNameIndex !== -1 && buy) {
      onUpdateAssets(newAsset);
    } //Cas 3: Si l'on veut vendre l'asset et que l'asset existe déjà dans la liste d'actifs possédés, on met à jour les éléments.
    else if (assetNameIndex !== -1 && !buy) {
      onSellAssets(newAsset);
    }
    //Cas 4: Si l'on veut vendre l'asset et que l'asset n'existe pas dans la liste d'actifs possédés, on ne peut pas le vendre. On indique dans une pop-up cela.
    else if (assetNameIndex === -1 && !buy) {
      alert(
        "You don't have this asset in your account. Please select an asset already owned in order to sell it."
      );
      setTicker("select");
      setQuantity("");
    }
  }
  //Création de l'UI pour le formulaire d'achat/vente d'actions
  return (
    <div className="interfaceEl">
      <Subtitle>Order Table</Subtitle>
      <div className="flexContainer"></div>
      <button
        className={buy ? "choiceButton buy active" : "choiceButton buy"}
        onClick={() => setBuy(true)}
      >
        Buy
      </button>
      <button
        className={!buy ? "choiceButton sell active" : "choiceButton sell"}
        onClick={() => setBuy(false)}
      >
        Sell
      </button>
      <form className="orderTable" onSubmit={handleSubmit}>
        <div className="flexContainer">
          <label>Ticker name</label>
          <select
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            required
          >
            <option value="select" disabled></option>
            {currentPrices.map((el) => (
              <option value={el.ticker} key={el.ticker}>
                {el.ticker}
              </option>
            ))}
          </select>
        </div>
        <div className="flexContainer">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button className="setOrder">Set order</button>
      </form>
    </div>
  );
}

export default OrderTable;
