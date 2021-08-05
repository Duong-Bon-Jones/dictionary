import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Container } from "@material-ui/core";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Definition from "../components/Definition";

export default function Home() {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [audio, setAudio] = useState([]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        setMeanings([]);
        setWord("");
    };
    const dictionaryApi = async () => {
        try {
            if (word) {
                const { data } = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/${selectedLanguage}/${word}`
                );
                setMeanings(data);
                setAudio(data[0].phonetics[0]);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dictionaryApi();
        }, 500);
        if (!word) setMeanings([]);
        return () => {
            clearTimeout(timer);
        };
    }, [word, selectedLanguage]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={styles.main}>
                <Container maxWidth="md" className={styles.container}>
                    <Header
                        selectedLanguage={selectedLanguage}
                        handleChange={handleLanguageChange}
                        searchWord={word}
                        setWord={setWord}
                    />
                    {meanings && (
                        <Definition
                            meanings={meanings}
                            word={word}
                            selectedLanguage={selectedLanguage}
                            audio={audio}
                        />
                    )}
                </Container>
            </div>
        </ThemeProvider>
    );
}
