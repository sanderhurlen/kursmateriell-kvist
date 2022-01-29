import React, { useEffect, useState } from "react";
import Svar from "./Svar";

const Join = () => {
  const [svar, setSvar] = useState("");
  const [harAvgittSvar, setHarAvgittSvar] = useState(false);
  const [alleSvar, setAlleSvar] = useState([]);

  const [antallSpoersmaal, setAntallSpoersmaal] = useState(1)
  
  useEffect(() => {
      const hentSpoersmaal = async () => { 
          const data = await fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')
          const json = await data.json()
          
          
          const korrektSvar = json.results[0].correct_answer
          const galeSvar = json.results[0].incorrect_answers
          setQuiz({
              spoersmaal: json.results[0].question,
              alternativer: [...galeSvar, korrektSvar].sort((a,b) => a.length > b.length),
              fasit: korrektSvar
          })
      }
      
      hentSpoersmaal()
  }, [antallSpoersmaal])
  
  const [quiz, setQuiz] = useState({spoersmaal: "", alternativer: [ '' ], fasit: ""})

  const avgiSvar = () => {
    if (!harAvgittSvar) {
      setAlleSvar([...alleSvar, svar]);
    }
    setHarAvgittSvar(!harAvgittSvar);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Delta i Kvizt</h1>
      <br />
      <h2>Spørsmål {antallSpoersmaal}: {quiz.spoersmaal}</h2>
      <hr />
      <h3>Alternativer: {quiz.alternativer.join(', ')}</h3>
      <div>
        <h3>Svar:</h3>

        {alleSvar.map((svar, index) => {
          return <Svar key={index} tekst={svar} riktig={quiz.fasit === svar} />;
        })}
      </div>
      <hr />
      <div>
        <label>
          Ditt svar:
          <input
            type="text"
            value={svar}
            onChange={(e) => setSvar(e.target.value)}
          />
        </label>
        <p>
          {!harAvgittSvar
            ? "Er svaret avgitt?"
            : "Du har avgitt svar. Vil du trekke det tilbake?"}
        </p>
        <button style={{ padding: "1rem 2rem" }} onClick={avgiSvar}>
          {!harAvgittSvar ? "Ja" : "Trekk tilbake"}
        </button>
        <button onClick={() => setAntallSpoersmaal(antallSpoersmaal + 1)}>
            Neste spørsmål
        </button>
      </div>
    </div>
  );
};

export default Join;
