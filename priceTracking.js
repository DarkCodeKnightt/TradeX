document.addEventListener("DOMContentLoaded", function () {
    const cryptoContainer = document.querySelector(".crypto-list");
    const apiKey = "coinranking9a90c02e6f7e04e10a85e3f11d1b823bebaf7ed3de7fa07f";
    const coinsUUID = [
        "Qwsogvtv82FCd",
        "razxDUgYGNAdQ",
        "HIVsRcGKkPFtW",
        "KNS7lFwBX",
        "WcwrkfNI4FUAe",
        "-l8Mn2pVlRs-p",
        "zNZHO_Sjf",
        "aKzUVe4Hh_CON",
        "qzawljRxB5bYu",
        "dvUj0CzDZ",
        "PDKcptVnzJTmN-sV8",
        "a91GCGd_u96cF",
        "25W7FG7om",
        "qUhEFk1I61atv",
        "CiixT63n3",
        "VLqpJwogdhHNb",
        "uW2tk-ILY0ii",
        "Mtfb0obXVh59u",
        "x4WXHge-vvFY",
        "xz24e0BjL",
        "_H5FVG9iW",
        "D7B1x_ks7WhV5",
        "ZlZpzOJo43mIo",
        "Z96jIvLU7",
        "08CsQa-Ov",
        "Knsels4_Ol-Ny",
        "MoTuySvg7",
        "ncYFcP709"
    ];

    coinsUUID.forEach((uuid) => {
        fetch(`https://api.coinranking.com/v2/coin/${uuid}`, {
            headers: {
                'x-access-token': apiKey,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'fail') {
                console.error(`Error: ${data.message}`);
                return;
            }

            const cryptoRow = document.createElement("tr");

            cryptoRow.innerHTML = `
                <td>
                    <div class="crypto-icon">
                        <img src="${data.data.coin.iconUrl}" />
                        <span>${data.data.coin.name}</span>
                        <small>${data.data.coin.symbol}</small>
                    </div>
                </td>
                <td>
                    <div class="crypto-price">
                        <span> $${parseFloat(data.data.coin.price).toFixed(2)}</span>
                    </div>
                </td>
                <td>
                    <div class="change">
                        <span class="${data.data.coin.change > 0 ? 'positive' : (data.data.coin.change < 0 ? 'negative' : 'neutral')}">${data.data.coin.change}</span>
                    </div>
                </td>
                <td>
                    <div class="volume">
                        <span> $${data.data.coin['24hVolume']}</span>
                    </div>
                </td>
                <td>
                    <div class="market-cap">
                        <span> $${data.data.coin.marketCap}</span>
                    </div>
                </td>
                <td>
                    <div class="view-more">
                        <button class=" btn btn-outline-success">Buy</button>
                        <button class=" btn btn-outline-danger">Sell</button>
                    </div>
                </td>
            `;
            cryptoContainer.appendChild(cryptoRow);
        })
        .catch(error => console.error('Fetch error:', error));
    });
});
