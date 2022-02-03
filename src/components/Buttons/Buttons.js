const Buttons = (props) => {
    const marginBottom = { marginBottom: '2rem' };

    return <span style={{ width: '75%', margin: 0, padding: 0 }}                >
        <button
            className="w3-button w3-deep-purple  w3-block"
            style={marginBottom}
            onClick={() => props.setShowItems({
                products: true,
                productsWithParts: false,
                productsLength: false
            })}
        >
            Ukaz produkty
        </button>
        <button className="w3-button w3-indigo  w3-block"
            style={marginBottom}
            onClick={() => props.setShowItems({
                products: false,
                productsWithParts: false,
                productsLength: true
            })}
        >
            Ukaz pocet produktu
        </button>
        <button className="w3-button w3-blue w3-block"
            style={marginBottom}
            onClick={() => props.setShowItems({
                products: false,
                productsWithParts: true,
                productsLength: false
            })}
        >
            Ukaz produkty s nahradnimi dily
        </button>
    </span>
}

export default Buttons;