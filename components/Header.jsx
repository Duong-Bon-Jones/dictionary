import {
    Select,
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
} from "@material-ui/core";
import { useState } from "react";
import styles from "../styles/Header.module.scss";
import category from "../data/category";

const Header = ({ selectedLanguage, handleChange, searchWord, setWord }) => {
    return (
        <div className={styles.header}>
            <span className={styles.title}>{searchWord || "Dictionary"}</span>
            <div className={styles.inputs}>
                <TextField
                    className={styles.search}
                    label="Search"
                    id="standard-basic"
                    value={searchWord}
                    onChange={(e) => setWord(e.target.value)}
                />
                <FormControl className={styles.select}>
                    <InputLabel id="demo-simple-select-label">
                        Language
                    </InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={selectedLanguage}
                        onChange={handleChange}
                    >
                        {category.map((c) => (
                            <MenuItem key={category.indexOf(c)} value={c.label}>
                                {c.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default Header;
