import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Customized Style
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

//import Redux
// Import Redux 
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SET_TranslationLanguage, SET_TranslationMenuOpen } from '~/redux/slices/message-related/messageSlice'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// Language list for Eden Ai
const languageList = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Burmese": "my",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Central Khmer": "km",
    "Chinese (China)": "zh-CN",
    "Chinese (Taiwan)": "zh-TW",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Finnish": "fi",
    "French": "fr",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Gujarati": "gu",
    "Haitian": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jv",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Kinyarwanda": "rw",
    "Kirghiz": "ky",
    "Korean": "ko",
    "Kurdish": "ku",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Malagasy": "mg",
    "Malay (macrolanguage)": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Modern Greek (1453-)": "el",
    "Mongolian": "mn",
    "Nepali (macrolanguage)": "ne",
    "Norwegian": "no",
    "Nyanja": "ny",
    "Oriya (macrolanguage)": "or",
    "Panjabi": "pa",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Pushto": "ps",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Scottish Gaelic": "gd",
    "Serbian": "sr",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Southern Sotho": "st",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili (macrolanguage)": "sw",
    "Swedish": "sv",
    "Tagalog": "tl",
    "Tajik": "tg",
    "Tamil": "ta",
    "Tatar": "tt",
    "Telugu": "te",
    "Thai": "th",
    "Turkish": "tr",
    "Turkmen": "tk",
    "Uighur": "ug",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Western Frisian": "fy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu"
}


function getStyles(name, language, theme) {
    return {
        '&:hover': {
            background: "rgb(7, 177, 77, 0.42)",

        }
    };
}

export default function LanguagesSelection({ handleMessageInput }) {

    const theme = useTheme();
    const [language, setLanguage] = React.useState();
    const dispatch = useDispatch()

    const handleLanguageChange = async (event) => {

        let desireLanguage = event.target.value

        // setting the ui language
        if (event.target.value)
            setLanguage(desireLanguage);

        // setting the redux translation language selection
        dispatch(SET_TranslationLanguage({ translationLanguage: languageList[desireLanguage] }))

        let pdfFromUser = document.getElementById('DocUpload').files[0]

        let getBase64 = () => new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(pdfFromUser)
            reader.onload = (event) => {
                resolve(event.target.result);
            }
        });

        let uploadedDocFromUser = await getBase64()
        handleMessageInput(uploadedDocFromUser, 'PDFTRANSEDEN', false, 'pdf',languageList[desireLanguage] )
    };

    return (
        <FormControl sx={{
            width: 200,
        }}
        >
            <InputLabel id="demo-multiple-name-label" >Languages</InputLabel>
            <Select
                value={language ?? ""}
                onChange={handleLanguageChange}
                input={<OutlinedInput label="Languages" />}
                MenuProps={MenuProps}
            >
                {Object.keys(languageList).map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, language, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}