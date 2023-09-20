import PropTypes from "prop-types";

import {
  Card,
  CardActions,
  Container,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Divider,
  CardContent,
} from "@mui/material";

export const DiscountList = (props) => {
  if (props.loading) {
    return (
      <Box>
        <CircularProgress
          size={40}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      </Box>
    );
  }
  return (
    <Grid item xs={5}>
      <Typography align="center" variant="h6">
        Discounts
      </Typography>
      <Container
        maxWidth="xs"
        sx={{
          overflow: "scroll",
          overflowX: "hidden",
          height: "500px",
          minWidth: "300px",
        }}
      >
        {props.discountData &&
          props.discountData.map((discount, index) => (
            <Card sx={{ maxWidth: "100%", my: 1 }} key={index}>
              <CardMedia
                component="img"
                sx={{
                  maxHeight: "100px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                image={discount.photoUrl}
                title={discount.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {discount.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {discount.percentage}% off
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {discount.startDate} to {discount.endDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {discount.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => props.handleEditDiscount(discount)}
                >
                  edit
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    props.handleDeleteDiscount(discount.discountId)
                  }
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>
    </Grid>
  );
};

DiscountList.propTypes = {
  discountData: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  handleEditDiscount: PropTypes.func.isRequired,
  handleDeleteDiscount: PropTypes.func.isRequired,
};
