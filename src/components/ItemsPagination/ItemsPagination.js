import { Grid, Pagination } from "@mui/material";

const ItemsPagination = (props) => {
    return <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
    >
        {props.count !== null && (props.showItems.products || props.showItems.productsWithParts) &&
            <Pagination
                page={props.page}
                className="pagination"
                color="primary"
                count={props.count}
                variant="outlined"
                shape="rounded"
                size="large"
                onChange={(e, page) => props.handleClick(page)}
                style={props.productsPaginationLength < 4 ? { marginBottom: "14rem" } : { marginBottom: "7rem" }}
            />}
    </Grid>
};

export default ItemsPagination;