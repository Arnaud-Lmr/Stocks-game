//Création de la pop-up info qui se trouve en haut à droite de l'UI lorsque l'on clique sur le button "Info"
function Info() {
  function Explanation() {
    alert(
      `\u00A9 Arnaud LOMER ${new Date().getFullYear()}.
      \nCette interface est similaire à un Plan Epargne en Actions ou à un Compte-Titre Ordinaire
      \nVous pourrez y acheter 4 actions différentes (StockA, StockB, StockC et stockD).
      \nLe cours de chacune de ces actions imaginaires est généré via une API créée en Python pour ce projet et actualisé toutes les 5 secondes.
      \nAucune action réelle n'est utilisée ici pour trois raisons:
      \n-1° car les API boursières permettant de récupérer le cours des actions en temps réel sont payantes. Or l'objectif est de pouvoir tester cette aplication sans avoir besoin de payer
      \n-2° si cette application est testée alors que la bourse est fermée, les cours ne bougeront pas et l'application perdra de son charme
      \n-3° il était enrichissant techniquement de travailler avec un développeur Back-end pour créer une API en Python pour l'occasion
      \n Bon divertissement`
    );
  }

  return (
    <button style={{ color: "white" }} onClick={() => Explanation()}>
      Info
    </button>
  );
}

export default Info;
