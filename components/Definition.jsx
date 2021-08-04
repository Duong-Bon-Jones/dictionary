import styles from "../styles/Definition.module.scss";

const Definition = ({ meanings, word }) => {
    return (
        <div className={styles.meanings}>
            <h2>{word || `Start by typing a word in Search`}</h2>
            {meanings.map((meaning) =>
                meaning.definitions.map((def) => (
                    <p key={Math.random()}>{def.definition}</p>
                ))
            )}
        </div>
    );
};

export default Definition;
