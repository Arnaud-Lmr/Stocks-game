function Asset({ asset }) {
  //Calcul de la valeur totale de l'actif possédé
  const totalValue = asset.quantity * asset.mp;
  //Calcul de la plus-value latente de l'actif possédé
  const allTimeReturn = (asset.mp - asset.mcp) * asset.quantity;
  //Calcul de la plus-value latente de l'actif possédé en pourcentage
  const atrPercent = (asset.mp / asset.mcp - 1) * 100;

  //Définition de l'affichage d'un actif dans le tableau des actifs
  return (
    <tr>
      <td className="name">{asset.name}</td>
      <td>{asset.ticker}</td>
      <td>{asset.quantity}</td>
      <td>
        {asset.mp.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>
      <td>
        {asset.mcp.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>
      <td>
        {totalValue.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>

      <td>
        {allTimeReturn > 0 && "+"}
        {allTimeReturn.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </td>
      <td>
        {allTimeReturn === 0
          ? "0%"
          : `${atrPercent > 0 ? "+" : ""}${atrPercent.toFixed(2)}%`}
      </td>
    </tr>
  );
}

export default Asset;
