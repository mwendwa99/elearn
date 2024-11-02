import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(null);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div>
      <Accordion
        elevation={0}
        expanded={expanded === "panel1"}
        onChange={handleExpansion("panel1")}
        sx={{
          "& .MuiAccordion-region": {
            height: expanded === "panel1" ? "auto" : 0,
          },
          "& .MuiAccordionDetails-root": {
            display: expanded === "panel1" ? "block" : "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={600} variant="h5">
            Analyzing Literary Themes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Fade in={expanded === "panel1"} timeout={400}>
            <Typography>
              Literary themes are the underlying messages or central ideas that
              run through a work of literature. Understanding how to identify
              and analyze themes is essential in literary criticism, as it helps
              to uncover the deeper meanings in texts.
            </Typography>
          </Fade>
        </AccordionDetails>
      </Accordion>

      <Accordion
        elevation={0}
        expanded={expanded === "panel2"}
        onChange={handleExpansion("panel2")}
        sx={{
          "& .MuiAccordion-region": {
            height: expanded === "panel2" ? "auto" : 0,
          },
          "& .MuiAccordionDetails-root": {
            display: expanded === "panel2" ? "block" : "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography fontWeight={600} variant="h5">
            Exploring Phonetics in Linguistics
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Fade in={expanded === "panel2"} timeout={400}>
            <Typography>
              Phonetics is the branch of linguistics that studies the sounds of
              human speech. It involves analyzing how sounds are produced,
              transmitted, and received, and is a fundamental aspect of
              linguistic studies.
            </Typography>
          </Fade>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
