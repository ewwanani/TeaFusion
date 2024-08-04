document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const subtotalPrice = document.getElementById('subtotal-price');
    const taxPrice = document.getElementById('tax-price');
    const discountAmount = document.getElementById('discount-amount');
    const totalPrice = document.getElementById('total-price');
    const maxItems = 10;    // Maximum items allowed in the cart
    let cart = [];          // Cart array to store items
    let discount = 0;       // Discount value

    // Event listener for tab navigation (anonymous functions)
    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            tabLinks.forEach(link => link.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(this.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Event listener for adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                // If item already in cart, increase its quantity
                existingItem.quantity++;
            } else {
                // If item not in cart, add as new item
                if (cart.length < maxItems) {
                    cart.push({ name, price, quantity: 1 });
                } else {
                    alert('Cart is full. Maximum 10 items allowed.');
                }
            }
            updateCart();
        });
    });

    // Function to update the cart display (Function Expression)
    const updateCart = function () {
        //cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let subtotal = 0;
        let totalQuantity = 0; // Add a variable to keep track of the total quantity

        // Iterate over cart items and create list items for each
        cart.forEach((item, index) => {
            // Create a new list item element (li)
            const li = document.createElement('li');

            // Set the inner HTML of the list item
            // Display the item name and price, Create a select dropdown for item quantity,Create a remove button with a delete icon
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}      
                <select data-index="${index}">           
                    ${[...Array(maxItems).keys()].map(i => `<option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>
                <button class="remove-item" data-index="${index}"><img src="assets/images/delete-button.png" alt="Delete"></button>   
            `;

            // Append the list item to the cart items element
            cartItems.appendChild(li);

            // Calculate the subtotal price by multiplying the item price with its quantity and adding it to the subtotal
            subtotal += item.price * item.quantity;

            totalQuantity += item.quantity; // Update the total quantity
        });

        cartCount.textContent = totalQuantity; // Update the cart count with total quantity
        subtotalPrice.textContent = subtotal.toFixed(2);
        const discountAmountValue = subtotal * discount;
        discountAmount.textContent = discountAmountValue.toFixed(2);
        const total = subtotal - discountAmountValue;
        totalPrice.textContent = total.toFixed(2);

        addQuantityChangeListeners();
        addRemoveItemListeners();
    }

    // Function to add event listeners for quantity changes (Function Declaration)
    function addQuantityChangeListeners() {
        document.querySelectorAll('#cart-items select').forEach(select => {
            select.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                cart[index].quantity = parseInt(this.value);
                updateCart();
            });
        });
    }

    // Function to add event listeners for removing items
    function addRemoveItemListeners() {
        document.querySelectorAll('.remove-item').forEach(removeButton => {
            removeButton.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Event listener for checkout button
    document.getElementById('checkout-button').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            alert('Proceed to payment.');
        }
    });

    // Fetch discount based on code (Arrow Function; AJAX)
    const fetchDiscount = async (code) => {
        try {
            const response = await fetch('assets/data/discounts.json');
            const data = await response.json();
            const discountData = data.find(item => item.code === code); // find the discount object with matching code
            return discountData ? discountData.discount : null;
        } catch (error) {
            console.error('Error fetching discount data:', error);
            return null;
        }
    }

   // Event listener for applying discount
    document.getElementById('apply-discount-button').addEventListener('click', async function () {
    const code = document.getElementById('discount-code').value.trim(); // Get the discount code from the input
    if (code) {
        const discountValue = await fetchDiscount(code); // Fetch the discount value for the entered code
        if (discountValue !== null) {       // Check if a valid discount was found
            discount = discountValue;       // Update the global discount variable
            updateCart();      // Update the cart to reflect the discount
        } else {
            alert('Invalid discount code. Please try again.');     // Alert the user if the code is not valid
        }
    } else {
        alert('Please enter a discount code.'); // Alert the user to enter a discount code if the input is empty
    }
});

    // Function to fetch tax estimate
    function fetchTaxEstimate(zipCode) {
         // Validate ZIP code: Check if it consists of exactly 5 digits
        const zipCodePattern = /^\d{5}$/;
        if (!zipCodePattern.test(zipCode)) {
            alert('Please enter a valid 5-digit ZIP code.');
            return;  // Exit the function if the ZIP code is invalid
        }

        const apiKey = '6MZsLrVd0Qw0kgZ7lQauog==4IDc397tbVbHMpKs';           // API key from API Ninjas
        const url = `https://api.api-ninjas.com/v1/salestax?zip_code=${zipCode}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0 && data[0].total_rate) {
                const taxRate = parseFloat(data[0].total_rate);
                const subtotal = parseFloat(document.getElementById('subtotal-price').textContent);
                const tax = subtotal * taxRate;
                taxPrice.textContent = tax.toFixed(2);
                totalPrice.textContent = (subtotal - parseFloat(discountAmount.textContent) + tax).toFixed(2);
            } else {
                alert('Tax rate not found for the provided ZIP code.');
                console.error('Tax rate not found in response:', data);
            }
        })
        .catch(error => {
            alert('There was an error fetching the tax estimate. Please try again later.');
            console.error('Error fetching tax estimate:', error);
        });
    }

    // Event listener for estimating tax
    document.getElementById('estimate-tax-button').addEventListener('click', function () {
        const zipCode = document.getElementById('zip-code').value;
        if (zipCode) {
            fetchTaxEstimate(zipCode);
        } else {
            alert('Please enter a valid ZIP code.');
        }
    });

    // Function to fetch a random tea fact
    async function fetchRandomTeaFact() {
        try {
            const response = await fetch('assets/data/facts.json');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex].fact;
        } catch (error) {
            console.error('Error fetching tea fact:', error);
            return 'Failed to load tea fact';
        }
    }

    // Event listener for fetching a random tea fact
    document.getElementById('fetch-fact-button').addEventListener('click', async function () {
        const fact = await fetchRandomTeaFact();
        document.getElementById('tea-fact').textContent = fact;
    });
});
