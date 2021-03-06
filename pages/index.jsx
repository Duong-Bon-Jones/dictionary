import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Container } from "@material-ui/core";
import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Definition from "../components/Definition";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import Head from "next/head";
export default function Home() {
    const [meanings, setMeanings] = useState([]);
    const [word, setWord] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [audio, setAudio] = useState([]);
    const [lightMode, setLightMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: lightMode ? "#000" : "#fff",
            },
            type: lightMode ? "light" : "dark",
        },
    });

    const ThemeChanger = withStyles({
        switchBase: {
            color: grey[300],
            "&$checked": {
                color: grey[500],
            },
            "&$checked + $track": {
                backgroundColor: grey[500],
            },
        },
        checked: {},
        track: {},
    })(Switch);

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
            <Head>
                <title>Dictionary</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    href="./public/apple-touch-icon.png"
                />
                <meta name="theme-color" content="#fff" />
            </Head>
            <div
                className={`${styles.main} ${
                    lightMode ? styles.light : styles.dark
                }`}
            >
                <Container maxWidth="md" className={styles.container}>
                    <div className={styles.switch}>
                        <span>{lightMode ? "Light" : "Dark"} Mode</span>
                        <ThemeChanger
                            checked={lightMode}
                            onChange={() => setLightMode(!lightMode)}
                        />
                    </div>
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
                            lightMode={lightMode}
                        />
                    )}
                </Container>
            </div>
        </ThemeProvider>
    );
}
