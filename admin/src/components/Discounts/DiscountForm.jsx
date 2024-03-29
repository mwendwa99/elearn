import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscounts,
} from "../../redux/discounts/discountActions";
import { DiscountList } from "./DiscountList";

const initialValues = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  percentage: 0,
  title: "",
  description: "",
  photoUrl: "",
};

const DiscountForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [discountData, setDiscountData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { discounts, loading, error } = useSelector((state) => state.discounts);
  const dispatch = useDispatch();

  // useEffect to reset isUpdate to false after rerender
  useEffect(() => {
    setIsUpdate(() => false);
  }, [discounts]);

  useEffect(() => {
    dispatch(getDiscounts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(discounts)) {
      setDiscountData(discounts);
    }
  }, [discounts]);

  useEffect(() => {
    // once dispatch is successful, reset the form
    if (!loading && !error) {
      setFormValues(initialValues);
    }
  }, [error, loading]);

  // refresh the cohortData with every dispatch
  useEffect(() => {
    if (Array.isArray(discounts)) {
      setDiscountData(discounts);
    }
  }, [discounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmitNewDiscount = (e) => {
    e.preventDefault();
    // Handle form submission or validation here
    dispatch(createNewDiscount(formValues));
    setIsUpdate(() => false);
    setDiscountData((prevData) => [...prevData, formValues]);
  };

  const handleEditDiscount = (discount) => {
    // Handle form submission or validation here
    setFormValues(() => discount);
    setIsUpdate(() => true);
  };

  const handleUpdateDiscount = (e) => {
    e.preventDefault();
    dispatch(updateDiscount(formValues))
      .then(() => {
        dispatch(getDiscounts());
        setIsUpdate(false);
      })
      .catch((err) => {
        console.log("error updating discount", err);
      });
  };

  const handleDeleteDiscount = (discountId) => {
    // Handle form submission or validation here
    dispatch(deleteDiscount(discountId));
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <Container maxWidth="sm">
          {" "}
          {error && (
            <Typography variant="h5" component="h2">
              {error}
            </Typography>
          )}
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Discount Form
          </Typography>
          <form
            onSubmit={isUpdate ? handleUpdateDiscount : handleSubmitNewDiscount}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  name="startDate"
                  label="start of discount"
                  type="date"
                  value={formValues.startDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="endDate"
                  label="end of discount"
                  type="date"
                  value={formValues.endDate}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="percentage"
                  label="Percentage"
                  type="number"
                  value={formValues.percentage}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  name="title"
                  label="Title"
                  value={formValues.title}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="photoUrl"
                  label="Photo URL"
                  value={formValues.photoUrl}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="description"
                  label="Description"
                  value={formValues.description}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {isUpdate ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateDiscount}
                  fullWidth
                  type="submit"
                >
                  Update Discount
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Create Discount
                </Button>
              )}
            </Grid>
          </form>
        </Container>
      </Grid>
      <DiscountList
        loading={loading}
        handleDeleteDiscount={handleDeleteDiscount}
        handleEditDiscount={handleEditDiscount}
        discountData={discountData}
      />
    </Grid>
  );
};

export default DiscountForm;
