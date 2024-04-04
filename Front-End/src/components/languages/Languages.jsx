import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "./Language.scss";

export default function Languages() {

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="languages-standard"
        options={top100Languages}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            className="no-underline"
            // label="Languages"
            placeholder="Add languages"
          />
        )}
      />
    </Stack>
  );
}
const top100Languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Arabic",
  "Chinese",
  "Japanese",
  "Russian",
  "Italian",
  "Portuguese",
  "Hindi",
  "Bengali",
  "Punjabi",
  "Urdu",
  "Indonesian",
  "Turkish",
  "Dutch",
  "Polish",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Greek",
  "Korean",
  "Thai",
  "Vietnamese",
  "Hebrew",
  "Czech",
  "Hungarian",
  "Romanian",
  "Slovak",
  "Malay",
  "Ukrainian",
  "Bulgarian",
  "Serbian",
  "Croatian",
  "Slovenian",
  "Lithuanian",
  "Estonian",
  "Latvian",
  "Maltese",
  "Albanian",
  "Macedonian",
  "Montenegrin",
  "Luxembourgish",
  "Icelandic",
  "Gaelic",
  "Welsh",
  "Basque",
  "Catalan",
  "Galician",
  "Esperanto",
  "Klingon",
  "Esperanto",
  "Latin",
];
