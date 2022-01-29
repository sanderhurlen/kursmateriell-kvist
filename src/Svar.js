import React from "react";

const Svar = (props) => {

  const markør = props.riktig ? (
    <span>&#10004;</span>
  ) : (
    <span>&#10008;</span>
  );

  return (
    <div>
      <p>
        {markør} {props.tekst}
      </p>
    </div>
  );
};

export default Svar;
