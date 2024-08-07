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

    // Check if fruit type drink: No Milk Type required
    let drink_name = modal_body_div.getElementsByClassName("modal-title")[0].innerText;
    let milk_price = '0.00';
    let milk_type = "None";

    if (drink_name.includes("fruit") == false) {
        [milk_type, milk_price] = getMilkType(milk_type_div);
    }
    
    // Check if Customer filled out required input for sweetness, ice lvl, and milk type
    // and color code any missing reqs (in red)
    let flag = hasMissingReqs(sugar_lvl, ice_lvl, milk_type, sugar_lvl_div, ice_lvl_div, milk_type_div);
    if (flag) {
        return;
    } else {
        // Get custom drink price: base price + milk type + toppings
        let modal_footer_div = btn.parentElement; // footer div
        let custom_drink_price = modal_footer_div.getElementsByClassName("custom-price-text")[0].innerText;

        // Add customized drink to cart
        let cart_div = document.getElementById("cart-div");
        let cart_row = document.createElement('div');
        cart_row.classList.add('cart-row');
        
        var cart_row_contents = `
        <div class="cart-row row">
        
        <span class="col cart-col cart-item-quantity">$TODO_QTY</span>

        <div class="col cart-col">
            <div class="cart-item-title">${drink_name}</div>
            <ul>
                <li class="cart-item-details">${sugar_lvl}</li>
                <li class="cart-item-details">${ice_lvl}</li>
                
                <!-- Check if milk type == 'None' (aka drink.tag == 'fruit') -->
                ${ milk_type == 'None' ? "<!-- Milk Type is None: Display Nothing -->" : "<li class='cart-item-details'>" + milk_type + "</li>" }
                
                <!-- Separate newline for each topping -->
                ${Object.keys(selected_toppings).map(function (key) {
                    return "<li class='cart-item-details'>" + key + "</li>"
                }).join("")}

            </ul>
        </div>
        <span class="col cart-col cart-item-price">${custom_drink_price}</span>
    `;
        cart_row.innerHTML = cart_row_contents;
        cart_div.append(cart_row);
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



/* === UPDATE MODAL PRICE: MILK TYPE AND TOPPINGS === */
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