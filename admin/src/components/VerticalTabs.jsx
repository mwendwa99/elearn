import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CohortForm from "./Cohorts/CohortForm";
import SubjectForm from "./Subjects/SubjectForm";
import DiscountForm from "./Discounts/DiscountForm";
import UsersForm from "./Users/UsersForm";
import CourseForm from "./Courses/CourseForm";

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "200px" }}
      >
        <Tab label="Cohorts" {...a11yProps(0)} />
        <Tab label="Subjects" {...a11yProps(1)} />
        <Tab label="Discounts" {...a11yProps(2)} />
        <Tab label="Users" {...a11yProps(3)} />
        <Tab label="Courses" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CohortForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubjectForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DiscountForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UsersForm />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CourseForm />
      </TabPanel>
    </Box>
  );
}
