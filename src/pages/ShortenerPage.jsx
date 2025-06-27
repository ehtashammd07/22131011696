// src/pages/ShortenerPage.jsx
import React, { useState } from "react";
import UrlShortenerForm from "../components/UrlShortenerForm";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
  Box,
} from "@mui/material";

const ShortenerPage = () => {
  const [results, setResults] = useState([]);

  return (
    <Container>
      <Typography variant="h4" mt={4} gutterBottom>
        URL Shortener
      </Typography>

      <UrlShortenerForm onShortened={setResults} />

      {results.length > 0 && (
        <Paper sx={{ mt: 4, padding: 2 }}>
          <Typography variant="h6">Results:</Typography>
          <List>
            {results.map((r) => (
              <React.Fragment key={r.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link href={`/${r.shortcode}`} underline="hover">
                        http://localhost:3000/{r.shortcode}
                      </Link>
                    }
                    secondary={
                      <>
                        Original: {r.originalUrl} <br />
                        Expires at: {new Date(r.expiry).toLocaleString()}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default ShortenerPage;
