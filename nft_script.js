const nfts = [
    {
      image: "nft1.png",
      title: "CryptoPunk #7804",
      description: "One of the rarest CryptoPunks available for auction.",
      price: 0.0009
    },
    {
      image: "nft2.png",
      title: "EtherRock #42",
      description: "A legendary EtherRock with unique markings.",
      price: 0.0012
    },
    {
      image: "nft3.png",
      title: "CryptoCat #123",
      description: "A cute CryptoCat with customizable features.",
      price: 0.0005
    },
    {
      image: "nft4.png",
      title: "Pixel Art #789",
      description: "A stunning piece of pixel art, perfect for collectors.",
      price: 0.0008
    },
    {
      image: "nft5.png",
      title: "Space Exploration #32",
      description: "An NFT commemorating humanity's journey to space.",
      price: 0.0011
    },
    {
      image: "nft6.png",
      title: "Digital Landscape #12",
      description: "An immersive digital landscape, captivating and serene.",
      price: 0.0007
    },
    {
      image: "nft7.png",
      title: "Cyberpunk Art #205",
      description: "A futuristic cyberpunk artwork, full of intricate details.",
      price: 0.0014
    },
    {
      image: "nft8.png",
      title: "Fantasy World #99",
      description: "Step into a fantastical world with this unique NFT.",
      price: 0.0006
    },
    {
      image: "nft9.png",
      title: "Virtual Reality #777",
      description: "Experience virtual reality like never before with this NFT.",
      price: 0.0013
    },
    {
      image: "nft10.png",
      title: "Ancient Artifact #58",
      description: "Own a piece of history with this ancient artifact NFT.",
      price: 0.0010
    }
  ];
  
      // Function to create NFT card HTML
      function createNFTCard(nft, index) {
    return `
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <img src="${nft.image}" alt="" height="100%" width="100%">
            <br><br>
            <h5 class="card-title">${nft.title}</h5>
            <p class="card-text">${nft.description}</p>
            <p class="text-end" style="color: darkgrey;">Mint price:- ${nft.price}BTC</p>
            <button class="btn btn-outline-dark view-collection-btn" data-index="${index}">View More</button>
          </div>
        </div>
      </div>
    `;
  }
  
    
      // Function to populate NFT cards
      function populateNFTs() {
        const nftMarketplaceDiv = document.getElementById("nftMarketplace");
        let nftCardsHTML = "";
        nfts.forEach((nft, index) => {
          nftCardsHTML += createNFTCard(nft, index);
        });
        nftMarketplaceDiv.innerHTML = nftCardsHTML;
  
        // Event listener for view collection button
        const viewCollectionBtns = document.querySelectorAll('.view-collection-btn');
        viewCollectionBtns.forEach(button => {
          button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            openCollectionModal(nfts[index]);
          });
        });
      }
    
      // Call the function to populate NFT cards
      populateNFTs();
  
      // Function to open collection modal
      function openCollectionModal(nft) {
        const modal = new bootstrap.Modal(document.getElementById('nftModal'));
        const modalBody = document.querySelector('#nftModal .modal-body');
        modalBody.innerHTML = `
          <div class="row">
            <div class="col-md">
              <img src="${nft.image}" class="img-fluid rounded mx-auto d-block" alt="NFT Image">
              <p>${nft.description}</p>
              <p>Mint Price: ${nft.price} BTC</p>
              <button id="addToCollectionBtn" class="btn btn-outline-warning">Add to Collection</button>
            </div>
          </div>
        `;
        modal.show();
  
        // Event listener for add to collection button
        const addToCollectionBtn = document.getElementById('addToCollectionBtn');
        addToCollectionBtn.addEventListener('click', () => {
          openCollectionDetailsModal(nft);
        });
      }
  
      // Function to open collection details modal
  function openCollectionDetailsModal(nft) {
    const modal = new bootstrap.Modal(document.getElementById('nftModal'));
    const collectionModal = new bootstrap.Modal(document.getElementById('collectionModal'));
    const collectionDetails = document.getElementById('collectionDetails');
    collectionDetails.innerHTML = `
      <!-- Collection details here -->
      <h5>${nft.title}</h5>
      <p>${nft.description}</p>
      <p>Mint Price: ${nft.price} BTC</p>
      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity:</label>
        <input type="number" class="form-control" id="quantity" min="1" value="1">
      </div>
      <button id="confirmAddBtn" class="btn btn-outline-success">Add</button>
    `;
    collectionModal.show();
  
    // Event listener for confirm add button
    const confirmAddBtn = document.getElementById('confirmAddBtn');
    confirmAddBtn.addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('quantity').value);
      addToPortfolio(nft, quantity); // Call addToPortfolio function
    });
  }
  
      
  
      // Array to store portfolio items
    const portfolio = [];
  
  // Function to add item to portfolio
  function addToPortfolio(nft, quantity) {
    // Check if the item already exists in the portfolio
    const existingItemIndex = portfolio.findIndex(item => item.title === nft.title);
  
    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity and total price
      portfolio[existingItemIndex].quantity += quantity;
      portfolio[existingItemIndex].totalPrice = portfolio[existingItemIndex].price * portfolio[existingItemIndex].quantity;
    } else {
      // If the item does not exist, add it to the portfolio
      const totalPrice = nft.price * quantity;
      const portfolioItem = {
        title: nft.title,
        price: nft.price,
        quantity: quantity,
        totalPrice: totalPrice
      };
      portfolio.push(portfolioItem);
    }
  
    // Update portfolio modal with new item
    updatePortfolioModal();
  }
  
  
  // Function to update portfolio modal
  function updatePortfolioModal() {
    const portfolioDetailsBody = document.getElementById('portfolioDetailsBody');
    portfolioDetailsBody.innerHTML = `
      <h5>Your Portfolio</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price (BTC)</th>
            <th>Quantity</th>
            <th>Total Price (BTC)</th>
          </tr>
        </thead>
        <tbody>
          ${portfolio.map(item => `
            <tr>
              <td>${item.title}</td>
              <td>${item.price}</td>
              <td>${item.quantity}</td>
              <td>${item.totalPrice}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  
    // Show portfolio modal
    const portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'));
    portfolioModal.show();
  }
  
  // Event listener for collection image click
  const collectionLink = document.getElementById('collectionLink');
  collectionLink.addEventListener('click', () => {
    updatePortfolioModal();
  });
  
  
    // Event listener for confirm add button
    const confirmAddBtn = document.getElementById('confirmAddBtn');
    confirmAddBtn.addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('quantity').value);
      addToPortfolio(selectedNFT, quantity);
    });