function Explanation() {
  return (
    <div>
      <h3>Bienvenue sur Lambda Bank!</h3>
      <h4>
        Sur cette interface, vous pouvez acheter et vendre des actions et
        générer un profit ! Vous possédez initialement un compte en euros{" "}
        <i>Currency Account</i> de 10 000€.
        <br />
        L'objectif est d'atteindre un portefeuille 'Total Balance' de 12 000€.
        <br />
        <br />
        L'interface est composée de 3 parties:
        <br />{" "}
        <span style={{ fontSize: "1.1rem" }}>
          {" "}
          &#8226; Assets Overview:
        </span>{" "}
        Vous retrouvez ici votre solde en euros (<i>Currency Account </i>) ainsi
        que votre solde d'actions (<i>Assets Account </i>) et les lignes de
        votre portefeuille d'actions.
        <br />{" "}
        <span style={{ fontSize: "1.1rem" }}>&#8226; Current Prices:</span> Vous
        retrouvez ici le cours de chaque action actualisé toutes les 5 secondes.
        <br /> <span style={{ fontSize: "1.1rem" }}>
          &#8226; Order Table:
        </span>{" "}
        Vous pouvez ici acheter une action ou vendre une action que vous
        possédez. Il faut pour cela mentionner le code mnémonique (
        <i>Ticker </i>) et la quantité que vous souhaitez acheter ou vendre puis
        cliquer sur <i>Set order</i>. Les ordres sont effectués au Marché. Il
        n'y a donc pas de cours de vente souhaité à renseigner.
        <br />
        <br />
        Passer un ordre d'achat ou de vente coûte 1€.
      </h4>
    </div>
  );
}

export default Explanation;
