// src/pages/StatsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StatsPage = () => {
  const [urlStats, setUrlStats] = useState([]);

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrlStats(urls);
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} gutterBottom>
        URL Statistics
      </Typography>

      {urlStats.length === 0 ? (
        <Typography>No URLs have been shortened yet.</Typography>
      ) : (
        <Paper sx={{ mt: 2, p: 2 }}>
          <List>
            {urlStats.map((url) => (
              <React.Fragment key={url.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Link href={`/${url.shortcode}`} underline="hover">
                        http://localhost:3000/{url.shortcode}
                      </Link>
                    }
                    secondary={
                      <>
                        Original URL: {url.originalUrl}
                        <br />
                        Created: {new Date(url.created).toLocaleString()}
                        <br />
                        Expires: {new Date(url.expiry).toLocaleString()}
                        <br />
                        Clicks: {url.clicks.length}
                      </>
                    }
                  />
                </ListItem>

                {url.clicks.length > 0 && (
                  <Accordion sx={{ backgroundColor: "#f9f9f9" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">
                        View Click Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {url.clicks.map((click, i) => (
                        <Paper key={i} sx={{ mb: 1, p: 1 }}>
                          <Typography variant="body2">
                            Timestamp: {new Date(click.timestamp).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            Source: {click.referrer || "Direct / Unknown"}
                          </Typography>
                          <Typography variant="body2">
                            Location: {click.location || "Unknown"}
                          </Typography>
                        </Paper>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}

                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default StatsPage;
