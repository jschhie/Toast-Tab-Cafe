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



function updateTextColor(btn) {
    let modal_body_div = btn.parentElement;
    // Revert text color: bolded red --> black 
    let req_text = modal_body_div.getElementsByClassName("req-text")[0];
    req_text.style.color = 'black';
    req_text.style.fontWeight = 'normal';
}


function updateModalPrice(btn) {
    alert('todo: update modal price: for milk type and toppings');
}

/*
function updateModalPrice(btn) {
    // Check if btn associated with milk type or toppings
    
    // Update modal price for milk type
    let modal_div = btn.parentElement.parentElement.parentElement;
    let base_price = modal_div.getElementsByClassName("hidden")[0].innerText;

    let milk_price = btn.nextElementSibling.getElementsByClassName("custom_price_label");
    if (milk_price.length == 0) {
       milk_price = "0.00";
       modal_div.getElementsByClassName("base-price-text")[0].innerText = base_price;
    } else {
        alert(milk_price[0].innerText);
        milk_price = milk_price[0].innerText.replace('+$', ''); // remove +$ characters from string
        base_price = base_price.replace('$', '');
        modal_div.getElementsByClassName("base-price-text")[0].innerText = '$' + parseFloat(parseFloat(base_price) + parseFloat(milk_price)).toFixed(2);
    }
}
*/


function addToCart(btn) {
    // Get base price of drink
    let modal_footer_div = btn.parentElement; // footer div
    let base_price = modal_footer_div.getElementsByClassName("hidden")[0].innerText.substr(1); // omit '$' character
    // alert("base price: " + base_price);

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
    // and color code any missing reqs (red)
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

    } else {
        // Calculate total price: base drink + milk type + toppings
        let custom_drink_price = parseFloat(parseFloat(base_price) + parseFloat(milk_price)).toFixed(2);

        let toppings_prices = Object.values(selected_toppings);
        for (let i=0; i < toppings_prices.length; i++) {
            // omit '+$' characters from each string when adding each
            custom_drink_price = parseFloat(parseFloat(custom_drink_price) + parseFloat(toppings_prices[i].substr(2, ))).toFixed(2); // round to 2 decimal places
        }

        // Add customized drink to cart
        let cart_div = document.getElementById("cart-div");
        let drink_name = modal_body_div.getElementsByClassName("modal-title")[0].innerText;

        let cart_row = document.createElement('div');
        cart_row.classList.add('cart-row');

        if (milk_type == "None") {
            var cart_row_contents = `
            <div class="cart-row row">

            <span class="col cart-col cart-item-quantity">$TODO_QTY</span>

            <div class="col cart-col">
                <div class="cart-item-title">${drink_name}</div>
                <ul>
                    <li class="cart-item-details">${sugar_lvl}</li>
                    <li class="cart-item-details">${ice_lvl}</li>

                    <!-- Separate newline for each topping -->
                    ${Object.keys(selected_toppings).map(function (key) {
                        return "<li class='cart-item-details'>" + key + "</li>"
                    }).join("")}
                </ul>
            </div>            
            <span class="col cart-col cart-item-price">$${custom_drink_price}</span>
        `;
        } else {
            var cart_row_contents = `
            <div class="cart-row row">

            <span class="col cart-col cart-item-quantity">$TODO_QTY</span>

            <div class="col cart-col">
                <div class="cart-item-title">${drink_name}</div>
                <ul>
                    <li class="cart-item-details">${sugar_lvl}</li>
                    <li class="cart-item-details">${ice_lvl}</li>
                    <li class="cart-item-details">${milk_type}</li>
                    
                    <!-- Separate newline for each topping -->
                    ${Object.keys(selected_toppings).map(function (key) {
                        return "<li class='cart-item-details'>" + key + "</li>"
                    }).join("")}
                </ul>
            </div>
            
            <span class="col cart-col cart-item-price">$${custom_drink_price}</span>
        `;
        }
        cart_row.innerHTML = cart_row_contents;
        cart_div.append(cart_row);
        /*
        // testing: iterate over key, values of selected_toppings dictionary
        for (const [key, value] of Object.entries(selected_toppings)) {
            alert(key + ": " + value);
        }*/
    }
}



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
    return [false, milk_price]; // where milk_price = '0.00' by default
}



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