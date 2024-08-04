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



function addToCart(btn) {
    //alert("add to cart btn clicked: " + btn);

    // Get customized sweetness, ice level, milk type, and/or toppings 
    let modal_body_div = btn.parentElement.parentElement;
    
    let sugar_lvl_div = modal_body_div.getElementsByClassName("sugar-lvl-div")[0];    
    let ice_lvl_div = modal_body_div.getElementsByClassName("ice-lvl-div")[0];
    let milk_type_div = modal_body_div.getElementsByClassName("milk-type-div")[0];
    let toppings_div = modal_body_div.getElementsByClassName("toppings-div")[0];
    
    // Save each customization
    let sugar_lvl = getSugarLvl(sugar_lvl_div);
    let ice_lvl = getIceLvl(ice_lvl_div);
    let milk_type = getMilkType(milk_type_div);
    let selected_toppings = getToppings(toppings_div);

    // Check if Customer filled out required input for sweetness, ice lvl, and milk type
    let missing_reqs = []; // list of missing requirements (ie: ['sweetness', 'ice level', 'milk type'])

    if (sugar_lvl == false) {
        missing_reqs.push("sweetness level");
        //alert("Please select a sweetness level.");
    } 

    if (ice_lvl == false) {
        missing_reqs.push("ice level");
        //alert("Please select an ice level.");
    } 

    if (milk_type == false) {
        missing_reqs.push("milk type");
        //alert("Please select a milk type.");
    } 

    if (missing_reqs.length) {
        // at least one missing requirement
        alert(missing_reqs.length);

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
        alert("Success: " + sugar_lvl + " sugar with " + ice_lvl + " and " + milk_type);
    }

    // testing: iterate over key, values of selected_toppings dictionary
    for (const [key, value] of Object.entries(selected_toppings)) {
        alert(key + ": " + value);
    }

    // Add customized drink to cart
    // todo
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
    for (let i=0; i < all_milk_radios.length; i++) {
        if (all_milk_radios[i].checked) {
            let milk_type_label = all_milk_radios[i].nextElementSibling;
            return milk_type_label.innerText;
        }
    }
    // No milk type selected
    return false;
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