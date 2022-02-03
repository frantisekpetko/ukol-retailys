const ProductsNumber = (props) => {
    const marginBottom = { marginBottom: '3rem' };
    return <div
        style={props.productsLength
            ? { display: 'block', ...marginBottom }
            : { display: 'none',  ...marginBottom }}>
        {`${props.length} produktu`}
    </div>
}

export default ProductsNumber;