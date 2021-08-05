import styles from "../styles/Definition.module.scss";

const Definition = ({ meanings, word, selectedLanguage, audio }) => {
    console.log(audio);
    return (
        <div className={styles.meanings}>
            {meanings && word && selectedLanguage && (
                <div className={styles.phonetics}>
                    <audio controls src={audio.audio}>
                        Your browser does not support audio
                    </audio>
                    <p>{audio.text}</p>
                </div>
            )}
            {!word && <h2>Start by typing a word in Search</h2>}
            {meanings.map((meaning) =>
                meaning.meanings.map((meaning) =>
                    meaning.definitions.map((def) => (
                        <div className={styles.definition} key={Math.random()}>
                            <b>{def.definition}</b>
                            <hr />
                            {def.example && (
                                <div>
                                    <span>Example: </span>
                                    {def.example}
                                </div>
                            )}
                            {def.synonyms && (
                                <div>
                                    <span>Synonyms: </span>
                                    {def.synonyms.join(", ")}
                                </div>
                            )}
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default Definition;
