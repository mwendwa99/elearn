import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        elevation={0}
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Analyzing Literary Themes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Literary themes are the underlying messages or central ideas that
              run through a work of literature. Understanding how to identify
              and analyze themes is essential in literary criticism, as it helps
              to uncover the deeper meanings in texts.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Exploring Phonetics in Linguistics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Phonetics is the branch of linguistics that studies the sounds of
              human speech. It involves analyzing how sounds are produced,
              transmitted, and received, and is a fundamental aspect of
              linguistic studies.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </div>
  );
}
