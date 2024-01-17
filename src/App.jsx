import { useEffect, useRef, useState } from "react";
import AssetsOverview from "./Components/AssetsOverview";
import CurrentPricesOverview from "./Components/CurrentPricesOverview";
import Explanation from "./Components/Explanation";
import Header from "./Components/Header";
import OrderTable from "./Components/OrderTable";

//Initialisation des valeurs initiales des cours des actions
const initialPrices = [
  { name: "StockA", ticker: "SA", mp: 400 },
  { name: "StockB", ticker: "SB", mp: 250 },
  { name: "StockC", ticker: "SC", mp: 1000 },
  { name: "StockD", ticker: "SD", mp: 100 },
];

//Initialisation des actifs possédés dans le portefeuille
const initialAssets = [
  {
    name: "StockA",
    ticker: "SA",
    quantity: 0,
    mp: initialPrices[0].mp,
    mcp: 0,
  },
  {
    name: "StockB",
    ticker: "SB",
    quantity: 0,
    mp: initialPrices[1].mp,
    mcp: 0,
  },
  {
    name: "StockC",
    ticker: "SC",
    quantity: 0,
    mp: initialPrices[2].mp,
    mcp: 0,
  },
  {
    name: "StockD",
    ticker: "SD",
    quantity: 0,
    mp: initialPrices[3].mp,
    mcp: 0,
  },
];

//Fonction principale
function App() {
  //Définition de la variable assets qui contient les lignes du portefeuille
  const [assets, setAssets] = useState(initialAssets);
  //Définition de la quantité qui sera achetée ou vendue par l'utilisateur via le composant OrderTable
  const [quantity, setQuantity] = useState("");
  //Initialisation de la quantité d'euros possédés dans le portefeuille
  const [totalEuro, setTotalEuro] = useState(10000);
  //Initialisation du code mnémonique qui sera choisi par l'utilisateur via le composant OrderTable
  const [ticker, setTicker] = useState("select");
  //Définition de la variable currentPrices qui contient les lignes des cours de bourse des quatres actions même si elles ne sont pas possédées en portefeuille
  const [currentPrices, setCurrentPrices] = useState(initialPrices);

  //Initialisation d'un compteur qui est utilisé dans le useEffect pour les requêtes API. Compteur créé pour le back-end.
  const iteration = useRef(1);

  //On choisit que l'ordre de bourse (achat ou vente) coûte 1€.
  const orderPrice = 1;

  //Hook useEffect qui permet d'actualiser toutes les 3secondes (=3000ms) le cours de bourse des actions
  useEffect(
    function () {
      const id = setInterval(async function fetchPrices() {
        //Incrémentation du compteur utilisé dans le fichier back-end
        iteration.current += 1;
        //Remontée du chiffre du compteur dans le fichier back-end
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentPrices),
        };

        //Fetching des datas du fichier back-end
        const res = await fetch(
          `https://stocks-game-backend-clothilde-roy.koyeb.app/tableau?nb_appel=${iteration.current}`,
          requestOptions
        );
        const data = await res.json();

        setCurrentPrices(data);
      }, 3000);
      //Clean-up de l'intervalle des 3000ms pour éviter à chaque itération d'ajouter un intervalle dans un intervalle
      return () => clearInterval(id);
    },
    [currentPrices, iteration, assets]
  );
  // Le tableau du portefeuille d'action possédées affiche le cours de bourse des actions. On récupère ce cours de bourse via l'objet currentPrices et on le passe dans le tableau du portefeuille d'actions possédées
  for (let i = 0; i < assets.length; i++) {
    assets[i].mp = currentPrices[i].mp;
  }

  //A partir d'ici on définit les trois fonctions principales du code qui permettent l'achat
  // On récupère l'index de l'action choisie par l'utilisateur dans l'objet currentPrices.
  const stockNameIndex = currentPrices
    .map((object) => object.ticker)
    .indexOf(ticker);

  //Première fonction principale: permet d'acheter une action en ajoutant une nouvelle ligne au portefeuille si l'action achetée est nouvelle et n'était donc pas possédée au préalable
  function onAddAssets(asset) {
    //Définition du solde en euros après achat de l'action
    const euroLeft =
      totalEuro - orderPrice - quantity * currentPrices[stockNameIndex].mp;
    //On réalise l'achat uniquement si le solde en euros est suffisant. Sinon, on retourne un message d'erreur
    if (euroLeft >= 0) {
      setAssets((assets) => [...assets, asset]);
      //Mise à jour du solde en euros après achat de l'action
      setTotalEuro(euroLeft);
      //Réinitialisation de l'action choisie par l'utilisateur dans le formulaire
      setTicker("select");
    } else {
      alert(
        "Not enough money in the Currency account to set the order. \nPlease reduce the quantity bought or sell some of your current assets to increase your currency account"
      );

      return;
    }
    //Réinitialisation de la quantité choisie par l'utilisateur dans le formulaire
    setQuantity("");
  }

  //Deuxième fonction principale: permet d'acheter une action en modifiant une ligne existante du portefeuille si l'action achetée est déjà possédée au préalable
  function onUpdateAssets(asset) {
    //Définition du solde en euros après achat de l'action
    const euroLeft =
      totalEuro - orderPrice - quantity * currentPrices[stockNameIndex].mp;
    //On réalise l'achat uniquement si le solde en euros est suffisant. Sinon, on retourne un message d'erreur
    if (euroLeft >= 0) {
      setAssets(
        assets.map((el) =>
          el.ticker === asset.ticker
            ? {
                ...el,
                quantity: el.quantity + Number(quantity),
                mcp:
                  (el.mcp * el.quantity +
                    currentPrices[stockNameIndex].mp * Number(quantity)) /
                  (el.quantity + Number(quantity)),
              }
            : { ...el }
        )
      );
      //Mise à jour du solde en euros après achat de l'action
      setTotalEuro(euroLeft);
      //Réinitialisation de l'action choisie par l'utilisateur dans le formulaire
      setTicker("select");
    } else {
      alert(
        "Not enough money in the Currency account to set the order. \nPlease reduce the quantity bought or sell some of your current assets to increase your currency account"
      );
    }
    //Réinitialisation de la quantité choisie par l'utilisateur dans le formulaire
    setQuantity("");
  }

  //Troisième fonction principale: permet de vendre une action si celle-ci est possédée par l'utilisateur
  function onSellAssets(asset) {
    //Définition du solde en euros après achat de l'action
    const euroLeft =
      totalEuro - orderPrice + quantity * currentPrices[stockNameIndex].mp;

    //Définition de la quantité possédée en portefeuille. Cette variable sera comparée avec la quantité que l'utilisateur souhaite vendre pour vérifier que l'utilisateur ne vend pas plus que ce qu'il a. Pas de vente à découvert autorisée dans cette application.
    const stockOwnedQuantity = assets[stockNameIndex].quantity;

    //Si l'utilisateur a au moins autant d'actions possédées que ce qu'il veut vendre alors il peut vendre
    if (Number(quantity) <= stockOwnedQuantity) {
      //On actualise la quantité possédée uniquement pour l'action que l'utilisateur souhaite vendre.
      setAssets(
        assets.map((el) =>
          el.ticker === asset.ticker
            ? {
                ...el,
                quantity: el.quantity - Number(quantity),
                //Si le l'utilisateur vend toutes ses actions possédées pour une action particulière, alors on réinitialise le prix de revient unitaire à zéro car il n'y a plus d'actions
                mcp: Number(quantity) === stockOwnedQuantity ? 0 : el.mcp,
              }
            : { ...el }
        )
      );
      //Mise à jour du solde en euros après achat de l'action
      setTotalEuro(euroLeft);
      //Réinitialisation de l'action choisie par l'utilisateur dans le formulaire
      setTicker("select");
    } else {
      alert(
        "You don't have enough quantity to sell in your account. \nPlease reduce the quantity you want to sell"
      );
    }
    //Réinitialisation de la quantité choisie par l'utilisateur dans le formulaire
    setQuantity("");
  }

  //Affichage des composants dans l'UI
  return (
    <div className="appLayout">
      <Header />
      <AssetsOverview assets={assets} totalEuro={totalEuro} />
      <CurrentPricesOverview currentPrices={currentPrices} />
      <OrderTable
        currentPrices={currentPrices}
        assets={assets}
        onAddAssets={onAddAssets}
        onUpdateAssets={onUpdateAssets}
        onSellAssets={onSellAssets}
        quantity={quantity}
        setQuantity={setQuantity}
        totalEuro={totalEuro}
        setTotalEuro={setTotalEuro}
        ticker={ticker}
        setTicker={setTicker}
        stockNameIndex={stockNameIndex}
      />
      <Explanation />
    </div>
  );
}

export default App;
