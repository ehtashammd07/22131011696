// src/components/UrlShortenerForm.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { logEvent } from "../middleware/logger";

const UrlShortenerForm = ({ onShortened }) => {
  const [inputs, setInputs] = useState([
    { originalUrl: "", validity: "", shortcode: "" },
  ]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addUrlField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { originalUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = () => {
    const allErrors = [];
    const results = [];

    const existing = JSON.parse(localStorage.getItem("urls") || "[]");

    inputs.forEach((input, idx) => {
      const { originalUrl, validity, shortcode } = input;
      const error = {};

      if (!originalUrl || !isValidUrl(originalUrl)) {
        error.originalUrl = "Invalid URL";
      }

      if (validity && (!/^\d+$/.test(validity) || parseInt(validity) <= 0)) {
        error.validity = "Must be a positive integer";
      }

      let customCode = shortcode.trim();
      if (customCode && !/^[a-zA-Z0-9]{3,15}$/.test(customCode)) {
        error.shortcode = "Must be alphanumeric (3-15 chars)";
      }

      // Check for shortcode uniqueness
      const used = existing.find((e) => e.shortcode === customCode);
      if (customCode && used) {
        error.shortcode = "Shortcode already used";
      }

      if (Object.keys(error).length > 0) {
        allErrors[idx] = error;
        return;
      }

      // Generate shortcode if not provided
      const finalShortcode = customCode || uuidv4().slice(0, 6);

      const now = new Date();
      const duration = parseInt(validity) || 30; // default 30 mins
      const expiry = new Date(now.getTime() + duration * 60000);

      const record = {
        id: uuidv4(),
        originalUrl,
        shortcode: finalShortcode,
        created: now.toISOString(),
        expiry: expiry.toISOString(),
        clicks: [],
      };

      existing.push(record);
      results.push(record);
      logEvent(`Shortened URL: ${originalUrl} → /${finalShortcode}`);
    });

    if (results.length > 0) {
      localStorage.setItem("urls", JSON.stringify(existing));
      onShortened(results);
    }

    setErrors(allErrors);
  };

  return (
    <Box mt={2}>
      {inputs.map((input, idx) => (
        <Paper key={idx} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={input.originalUrl}
                onChange={(e) =>
                  handleChange(idx, "originalUrl", e.target.value)
                }
                error={!!(errors[idx]?.originalUrl)}
                helperText={errors[idx]?.originalUrl}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                fullWidth
                label="Validity (mins)"
                value={input.validity}
                onChange={(e) =>
                  handleChange(idx, "validity", e.target.value)
                }
                error={!!(errors[idx]?.validity)}
                helperText={errors[idx]?.validity}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={input.shortcode}
                onChange={(e) =>
                  handleChange(idx, "shortcode", e.target.value)
                }
                error={!!(errors[idx]?.shortcode)}
                helperText={errors[idx]?.shortcode}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      {inputs.length < 5 && (
        <Button variant="outlined" onClick={addUrlField} sx={{ mb: 2 }}>
          + Add another URL
        </Button>
      )}

      <br />
      <Button variant="contained" onClick={handleShorten}>
        Shorten URLs
      </Button>
    </Box>
  );
};

export default UrlShortenerForm;
