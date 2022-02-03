const Items = (props) => {
    const margin = { margin: 0 };
    const marginBottom = { marginBottom: '3rem' };
    const greenColor = { color: 'green' };

    return <>
        {props.productsPagination.map((item, index) => {
            let parts = null;
            if (item.hasOwnProperty('parts')) {
                //console.log(showItems.productsWithParts);
                parts = props.showItems.productsWithParts
                    ? item?.parts[0].part[0].item.map((item, index) => {
                        return <span key={index} >
                            <div style={{ color: 'red', ...margin }}>
                                {item?.$?.name}
                            </div>
                        </span>
                    })
                    : null;
            }

            return <div key={index}
                style={props.showItems.products || props.showItems.productsWithParts
                    ? { display: 'block', ...marginBottom}
                    : { display: 'none', ...marginBottom }}>
                <p style={{ ...margin, ...greenColor}}>Produkt: </p>
                <p style={{ ...margin }}>{item.$?.name}</p>

                {parts !== null && <p style={{ ...margin, ...greenColor }}>Nahradni dily: </p>}
                {parts}
            </div>
        })}


    </>
}

export default Items;