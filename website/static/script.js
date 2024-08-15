/* === CHOOSE TOPPINGS === */
function chooseToppings(btn) {    
    let max_toppings = 3;
    let selected_toppings = 0;
    let toppings_div = btn.parentElement;

    let all_checkboxes = toppings_div.getElementsByClassName("topping-checkbox");
    for (let i=0; i < all_checkboxes.length; i++) {
        if (all_checkboxes[i].checked) {
            selected_toppings += 1;
            if (selected_toppings == max_toppings) {
                alert("Max toppings selected."); 
                break; // break out of for loop and disable remaining buttons
            } 
        }
    }

    // disable remaining buttons
    if (selected_toppings == max_toppings) {
        for (let i=0; i < all_checkboxes.length; i++) {
            if (all_checkboxes[i].checked != true) {
                all_checkboxes[i].disabled = true;
            }
        }
    } else {
        for (let i=0; i < all_checkboxes.length; i++) {
            // selected_toppings < max_toppings: re-enable buttons 
            if (all_checkboxes[i].disabled) {
                all_checkboxes[i].disabled = false;
            }
        }
    }
}



/* === UPDATE TEXT COLOR === */
function updateTextColor(btn) {
    let modal_body_div = btn.parentElement;
    // Revert text color: bolded red --> black 
    let req_text = modal_body_div.getElementsByClassName("req-text")[0];
    req_text.style.color = 'black';
    req_text.style.fontWeight = 'normal';
}



/* === ADD TO CART === */
function addToCart(btn) {
    let modal_body_div = btn.parentElement.parentElement;

    // Get customized sweetness, ice level, milk type, and/or toppings 
    let sugar_lvl_div = modal_body_div.getElementsByClassName("sugar-lvl-div")[0];    
    let ice_lvl_div = modal_body_div.getElementsByClassName("ice-lvl-div")[0];
    let milk_type_div = modal_body_div.getElementsByClassName("milk-type-div")[0];
    let toppings_div = modal_body_div.getElementsByClassName("toppings-div")[0];
    
    // Save each customization
    let sugar_lvl = getSugarLvl(sugar_lvl_div);
    let ice_lvl = getIceLvl(ice_lvl_div);
    let selected_toppings = getToppings(toppings_div);

    // Check if fruit type: No Milk Type required
    let drink_tag = btn.parentElement.getElementsByClassName("hidden-modal-tag")[0].innerText;
    let milk_price = '0.00';
    let milk_type = "None";

    if (drink_tag !== "fruit") {
        [milk_type, milk_price] = getMilkType(milk_type_div);
    }
    
    // Check if Customer filled out required input for sweetness, ice lvl, and milk type
    let flag = hasMissingReqs(sugar_lvl, ice_lvl, milk_type, sugar_lvl_div, ice_lvl_div, milk_type_div);
    if (flag) {
        return;
    } else {
        // Get custom drink price: base price + milk type + toppings
        let modal_footer_div = btn.parentElement; // footer div
        let custom_drink_price = modal_footer_div.getElementsByClassName("custom-price-text")[0].innerText;

        // Get quantity
        let quantity = modal_footer_div.getElementsByClassName("quantity-label")[0].innerText;

        // Get drink modal/id: Edit cart functionality
        let drink_modal_id = modal_body_div.parentElement.parentElement.id;

        // Check if updating existing cart row, or adding new drink to cart
        let all_cart_items_div = document.getElementById("all-cart-items");
        let all_cart_rows = all_cart_items_div.getElementsByClassName("cart-row");
        //let curr_cart_row_index = all_cart_rows.length;
        //let modal_btn_label = modal_footer_div.getElementsByClassName("add-to-cart-text")[0].innerText;

        // Add customized drink to cart
        let drink_name = modal_body_div.getElementsByClassName("modal-title")[0].innerText;
        let cart_row = document.createElement('div');
        cart_row.classList.add('cart-row');
        
        var cart_row_contents = `
            <div class="cart-col cart-item-quantity">${quantity}</div>
            
            <div class="cart-col">
                <div class="cart-item-title">${drink_name}</div>
                <ul class="cart-item-list">
                    <li class="cart-item-details">${sugar_lvl}</li>
                    <li class="cart-item-details">${ice_lvl}</li>
                    
                    <!-- Check if milk type == 'None' (aka drink.tag == 'fruit') -->
                    ${ milk_type == 'None' ? "" : "<li class='cart-item-details'>" + milk_type + "</li>" }
                    
                    <!-- Separate newline for each topping -->
                    ${Object.keys(selected_toppings).map(function (key) {
                        return "<li class='cart-item-details'>" + key + "</li>"
                    }).join("")}
                </ul>
                <div class="cart-actions">
                    <button type="button" class="btn cart-action-link" data-bs-toggle="modal" data-bs-target=${"#" + drink_modal_id} onclick="editCartItem(this)">Edit</button>
                    <button type="button" class="btn cart-action-link" onclick="removeCartItem(this)">Remove</button>
                    <span class="hidden drink-modal-id-span">${drink_modal_id}</span>
                </div>
            </div>
            <div class="cart-col cart-item-price">${custom_drink_price}</div>`;

        cart_row.innerHTML = cart_row_contents;
        all_cart_items_div.append(cart_row);

        // Update total price of cart items
        calcTotalPrice(all_cart_items_div);

        // Hide empty cart message & display checkout button
        document.getElementById("empty-cart-msg").style.display = "none";
        document.getElementById("cart-total-div").style.display = "block";
    
        // save current cart
        let current_cart = document.getElementById("all-cart-items");
        sessionStorage.setItem("current_cart", current_cart);

        // save total price of cart
        let current_cart_total = document.getElementById("cart-total-price-label").innerHTML;
        sessionStorage.setItem("current_cart_total", current_cart_total);
    }
}



/* === GET SUGAR LEVEL === */
function getSugarLvl(sugar_lvl_div) {
    let all_sugar_radios = sugar_lvl_div.getElementsByClassName("sugar-radio");
    for (let i=0; i < all_sugar_radios.length; i++) {
        if (all_sugar_radios[i].checked) {
            let sugar_lvl_label = all_sugar_radios[i].nextElementSibling;
            return sugar_lvl_label.innerText;
        }
    }
    // No sweetness selected
    return false;
}



/* === GET ICE LEVEL === */
function getIceLvl(ice_lvl_div) {
    let all_ice_radios = ice_lvl_div.getElementsByClassName("ice-radio");
    for (let i=0; i < all_ice_radios.length; i++) {
        if (all_ice_radios[i].checked) {
            let ice_lvl_label = all_ice_radios[i].nextElementSibling;
            return ice_lvl_label.innerText;
        }
    }
    // No ice level selected
    return false;
}



/* === GET MILK TYPE === */
function getMilkType(milk_type_div) {    
    let all_milk_radios = milk_type_div.getElementsByClassName("milk-radio");
    let milk_price = '0.00';

    for (let i=0; i < all_milk_radios.length; i++) {
        if (all_milk_radios[i].checked) {
            let milk_type_label = all_milk_radios[i].nextElementSibling;  
            let milk_type = milk_type_label.innerText;

            let unwantedIndex = milk_type_label.innerText.indexOf('+'); // remove '+$0.00' price from variable
            if (unwantedIndex != -1) {
                milk_type = milk_type_label.innerText.substr(0, unwantedIndex);
                milk_price = milk_type_label.innerText.substr(unwantedIndex + 2);
            }
            return [milk_type, milk_price]; 
        }
    }
    // No milk type selected
    return [false, milk_price]; // where milk_type = false, milk_price = '0.00'
}



/* === GET TOPPINGS === */
function getToppings(toppings_div) {
    let selected_toppings = {}; // empty dict
    let all_checkboxes = toppings_div.getElementsByClassName("topping-checkbox");
    for (let i=0; i < all_checkboxes.length; i++) {
        if (all_checkboxes[i].checked) {
            // fetch toppings and prices
            let topping_label = all_checkboxes[i].nextElementSibling; // get label for associated checked box
            let topping_name = topping_label.getElementsByClassName("custom_topping_name")[0].innerText;
            let topping_price = topping_label.getElementsByClassName("custom_price_label")[0].innerText;

            // save into list of pairs { topping_name: topping_price }
            selected_toppings[topping_name] = topping_price;
        }
    }
    return selected_toppings;
}



/* === CHECK IF FORM HAS MISSING REQUIREMENTS === */
function hasMissingReqs(sugar_lvl, ice_lvl, milk_type, sugar_lvl_div, ice_lvl_div, milk_type_div) {
    let missing_reqs = []; // list of missing requirements (ie: ['sweetness', 'ice level', 'milk type'])

    if (sugar_lvl == false) {
        missing_reqs.push("sweetness level");
        let req_text = sugar_lvl_div.getElementsByClassName("req-text")[0];
        req_text.style.color = 'red';
        req_text.style.fontWeight = 'bold';
    } 

    if (ice_lvl == false) {
        missing_reqs.push("ice level");
        let req_text = ice_lvl_div.getElementsByClassName("req-text")[0];
        req_text.style.color = 'red';
        req_text.style.fontWeight = 'bold';
    } 

    if (milk_type == false) {
        missing_reqs.push("milk type");
        let req_text = milk_type_div.getElementsByClassName("req-text")[0];
        req_text.style.color = 'red';
        req_text.style.fontWeight = 'bold';
    } 

    if (missing_reqs.length) {
        // at least one missing requirement
        let alert_msg = ["Please select a(n): "];
        for (let i=0; i < missing_reqs.length; i++) {
            if (missing_reqs.length >= 2 & i == missing_reqs.length - 1) {
                // if at least 2 missing reqs and current iterator is at the last index
                alert_msg.push("and " + missing_reqs[i]);
            } else {
                if (missing_reqs.length > 2) {
                    alert_msg.push(missing_reqs[i] + ", ");
                } else {
                    alert_msg.push(missing_reqs[i]);
                }
            }
        }
        // Alert final error message 
        alert(alert_msg.join(' '));        
        return true; // has at least one missing req
    } else {
        return false; // all required fields submitted 
    }
}



/* === UPDATE MODAL PRICE: MILK TYPE === */
function addMilkPrice(btn) {
    let milk_type_div = btn.parentElement;
    let [_, milk_price] = getMilkType(milk_type_div);
    
    // overwrite current milk price
    let modal_content_div = btn.parentElement.parentElement.parentElement;
    modal_content_div.getElementsByClassName("milk-type-price")[0].innerText = milk_price;

    // calculate new custom drink price
    let base_price = modal_content_div.getElementsByClassName("hidden")[0].innerText.substr(1); // omit '$' character
    let added_toppings_price = modal_content_div.getElementsByClassName("total-toppings-price")[0].innerText;
    modal_content_div.getElementsByClassName("custom-price-text")[0].innerText = '$' + parseFloat(parseFloat(added_toppings_price) + parseFloat(base_price) + parseFloat(milk_price)).toFixed(2);
}


/* === UPDATE MODAL PRICE: TOPPINGS === */
function addToppingPrices(btn) {
    let toppings_div = btn.parentElement;
    let selected_toppings = getToppings(toppings_div);

    let added_toppings_price = '0.00';
    let toppings_prices = Object.values(selected_toppings);
    for (let i=0; i < toppings_prices.length; i++) {
        // omit '+$' characters from each string when adding each
        added_toppings_price = parseFloat(parseFloat(added_toppings_price) + parseFloat(toppings_prices[i].substr(2, ))).toFixed(2); // round to 2 decimal places
    }    

    // overwrite current toppings price
    let modal_content_div = btn.parentElement.parentElement.parentElement;
    modal_content_div.getElementsByClassName("total-toppings-price")[0].innerText = added_toppings_price;

    // calculate new custom drink price
    let milk_price = modal_content_div.getElementsByClassName("milk-type-price")[0].innerText;
    let base_price = modal_content_div.getElementsByClassName("hidden")[0].innerText.substr(1); // omit '$' character
    modal_content_div.getElementsByClassName("custom-price-text")[0].innerText = '$' + parseFloat(parseFloat(added_toppings_price) + parseFloat(base_price) + parseFloat(milk_price)).toFixed(2);
}



/* === INCREASE DRINK QTY === */
function increaseDrinkQty(btn) {
    let quantity_label = btn.parentElement.getElementsByClassName("quantity-label")[0];
    
    // Set max == 10 
    if (parseInt(quantity_label.innerText) < 10) {
        quantity_label.innerText = parseInt(quantity_label.innerText) + 1;
    } else {
        btn.disabled = true;
    }
    
    let reduce_qty_btn = btn.parentElement.getElementsByClassName("reduce-qty-btn")[0];
    // Conditionally enable button for reduceDrinkQty()
    if (parseInt(quantity_label.innerText) > 1) {
        reduce_qty_btn.disabled = false;
    } else {
        // Qty == 1: disable button for reduceDrinkQty()
        reduce_qty_btn.disabled = true;
    }
}



/* === REDUCE DRINK QTY === */
function reduceDrinkQty(btn) {
    let quantity_label = btn.parentElement.getElementsByClassName("quantity-label")[0];
    let increase_qty_btn = btn.parentElement.getElementsByClassName("increase-qty-btn")[0];
    increase_qty_btn.disabled = false;

    // Conditionally disable button for reduceDrinkQty() 
    if (parseInt(quantity_label.innerText) == 1) {
        reduce_qty_btn.disabled = true;
    } else {
        quantity_label.innerText = parseInt(quantity_label.innerText) - 1;
        reduce_qty_btn.disabled = false;
    }
}



/* === CALCULATE TOTAL CART PRICE === */
function calcTotalPrice(all_cart_items_div) {
    let total_cart_price = '0.00';
    let all_cart_rows = all_cart_items_div.getElementsByClassName("cart-row");
    for (let i = 0; i < all_cart_rows.length; i++) {
        let cart_row = all_cart_rows[i];
        //let quantity = cart_row.getElementsByClassName("cart-item-quantity")[0].innerText;
        let quantity = cart_row.getElementsByClassName("cart-item-quantity")[0].innerHTML;
        //let custom_price = cart_row.getElementsByClassName("cart-item-price")[0].innerText.substr(1); // omit '$' character
        let custom_price = cart_row.getElementsByClassName("cart-item-price")[0].innerHTML.substr(1); // omit '$' character
        let cart_row_price = parseFloat(parseInt(quantity) * parseFloat(custom_price)).toFixed(2);
        total_cart_price = parseFloat(parseFloat(total_cart_price) + parseFloat(cart_row_price)).toFixed(2);
    }
    // overwrite new total cart price
    document.getElementById("cart-total-price-label").innerText = '$' + total_cart_price;
}



/* === UPDATE CART ITEM === */
function editCartItem(btn) {
    let drink_modal_id = btn.nextElementSibling.nextElementSibling.innerText;
    let drink_modal = document.getElementById(drink_modal_id);

    // Change modal label from 'Add' to 'Update': acts a flag/indicator for addToCart()
    let modal_btn_text = drink_modal.getElementsByClassName("add-to-cart-text")[0];
    modal_btn_text.innerText = "Update Cart";

    // save current cart before refreshing page with search results
    var current_cart = document.getElementById("all-cart-items").innerHTML;
    sessionStorage.setItem("current_cart", current_cart);

    // todo: Conditionally remove original cart row, in case Customer cancels/discards edits
    removeCartItem(btn);
}



/* === REMOVE CART ITEM === */
function removeCartItem(btn) {
    let row_div = btn.parentElement.parentElement.parentElement;
    // subtract cart row price from total price
    let custom_price = row_div.getElementsByClassName("cart-item-price")[0].innerText.substr(1); // omit '$' character
    let quantity = row_div.getElementsByClassName("cart-item-quantity")[0].innerText;
    let cart_row_price = parseFloat(parseInt(quantity) * parseFloat(custom_price)).toFixed(2);

    // overwrite new total cart price
    let total_cart_price = document.getElementById("cart-total-price-label").innerText.substr(1); // omit '$' character
    total_cart_price = parseFloat(parseFloat(total_cart_price) - parseFloat(cart_row_price)).toFixed(2);
    document.getElementById("cart-total-price-label").innerText = '$' + total_cart_price;

    // remove entire cart row
    row_div.style.display = "none";
    row_div.remove(); // delete from document

    // if empty cart, display message
    if (document.getElementById("cart-total-price-label").innerText == "$0.00") {
        document.getElementById("empty-cart-msg").style.display = "block";
        document.getElementById("cart-total-div").style.display = "none";
    } else {
        // save current cart 
        var current_cart = document.getElementById("all-cart-items").innerHTML;
        sessionStorage.setItem("current_cart", current_cart);

        // save total price of cart
        let current_cart_total = document.getElementById("cart-total-price-label").innerHTML;
        sessionStorage.setItem("current_cart_total", current_cart_total);
    }
}



/* === CHECKOUT CART === */
function checkoutCart(btn) {
    // save current cart before refreshing page with search results
    var current_cart = document.getElementById("all-cart-items").innerHTML;
    sessionStorage.setItem("current_cart", current_cart);
    document.location.href = '/checkout';
}