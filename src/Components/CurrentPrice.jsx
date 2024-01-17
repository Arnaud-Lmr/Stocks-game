function CurrentPrice({ currentPrice }) {
  //Définition de l'affichage des cours de bourse dans le tableau des cours de bourse
  return (
    <tr>
      <td className="name">{currentPrice.name}</td>
      <td>{currentPrice.ticker}</td>

      <td>{currentPrice.mp}€</td>
    </tr>
  );
}

export default CurrentPrice;
