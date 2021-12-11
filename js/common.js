function calc() {
    const priceNew4500 = 7800; // Пилорамный брус сырой 4500мм
    const priceNew6000 = 8500; // Пилорамный брус сырой 6000мм
    const priceOld4500 = 9300; // Пилорамный брус сухой 4500мм
    const priceOld6000 = 10600; // Пилорамный брус сухой 6000мм
    const antiBio = 850; // Антисептик 
    const antiOgnebio = 1600; // Антисептик ОГНЕБИО



    const typeSelect = document.querySelector('.type__select');
    const thicknessSelect =  document.querySelector('.thickness__select');
    const widthSelect = document.querySelector('.width__select');
    const lengthSelect = document.querySelector('.length__select');
    const quantityInput = document.querySelector('.quantity__input');
    const antisepticCheckbox = document.querySelector('.antiseptic__checkbox');
    const antisepticSelect = document.querySelector('.antiseptic__select');
    const addBtn = document.querySelector('.add__btn');
    let totalTable = document.querySelector('.result__body--total');
    let priceMp,volume, priceQuantity,currentPrice,totalPrice,currentAntiseptic,resultRow,fullPrice,
    countV=0,countQ=0,countA=0,countP=0, countF=0;


    antisepticCheckbox.addEventListener('click',() =>{
        document.querySelector('.calc__antiseptic--hidden').classList.toggle("fadeIn");


    });

   addBtn.addEventListener('click', (e) =>{
    e.preventDefault;

    if(typeSelect.options[typeSelect.selectedIndex].text =="Свежепил" && lengthSelect.options[lengthSelect.selectedIndex].text == "4500"){
        currentPrice = priceNew4500;

    } if(lengthSelect.options[lengthSelect.selectedIndex].text =="6000" && typeSelect.options[typeSelect.selectedIndex].text == "Свежепил" ){

        currentPrice = priceNew6000;

    } if(typeSelect.options[typeSelect.selectedIndex].text =="Сухой" && lengthSelect.options[lengthSelect.selectedIndex].text == "4500"){
        currentPrice = priceOld4500;
    } if(typeSelect.options[typeSelect.selectedIndex].text =="Сухой" && lengthSelect.options[lengthSelect.selectedIndex].text == "6000"){
        currentPrice = priceOld6000;

    }


    volume =  quantityInput.value * (lengthSelect.options[lengthSelect.selectedIndex].text * 0.001) *(thicknessSelect.options[thicknessSelect.selectedIndex].text * 0.001) * (widthSelect.options[widthSelect.selectedIndex].text * 0.001);

    if(antisepticSelect.options[antisepticSelect.selectedIndex].text =="БИО защита"){
        currentAntiseptic = antiBio * volume;
    } if(antisepticSelect.options[antisepticSelect.selectedIndex].text =="Огнебио"){
        currentAntiseptic = antiOgnebio * volume;
    } if(!antisepticCheckbox.checked){
        currentAntiseptic = +'0';
    }
    priceMp = currentPrice * (thicknessSelect.options[thicknessSelect.selectedIndex].text * 0.001) * (widthSelect.options[widthSelect.selectedIndex].text * 0.001);

    priceQuantity = currentPrice * (thicknessSelect.options[thicknessSelect.selectedIndex].text * 0.001) * (widthSelect.options[widthSelect.selectedIndex].text * 0.001) * (lengthSelect.options[lengthSelect.selectedIndex].text * 0.001) ;

    totalPrice = priceQuantity * quantityInput.value;

    fullPrice = totalPrice + currentAntiseptic;


    if(quantityInput.value == "" ){
        document.querySelector('.block__error').style.display ="block";

    }else{
        document.querySelector('.block__error').style.display ="none";
        let headerTable = document.querySelector('.result__header');
        headerTable.style.display = "table-row";


        resultRow = document.createElement('tr');
        resultRow.classList.add('result__body');
        resultRow.classList.add('result__content');
        resultRow.innerHTML = `
        <td class="body__block result__type">${typeSelect.options[typeSelect.selectedIndex].text}</td>
        <td class="body__block result__thickness">${thicknessSelect.options[thicknessSelect.selectedIndex].text}</td>
        <td class="body__block result__width">${widthSelect.options[widthSelect.selectedIndex].text}</td>
        <td class="body__block result__length">${lengthSelect.options[lengthSelect.selectedIndex].text}</td>
        <td class="body__block result__quantity">${quantityInput.value}</td>
        <td class="body__block result__volume">${volume.toFixed(3)}</td>
        <td class="body__block result__price-volume">${currentPrice}</td>
        <td class="body__block result__price-mp">${priceMp.toFixed(2)}</td>
        <td class="body__block result__price-quantity">${priceQuantity.toFixed(2)}</td>
        <td class="body__block result__total">${totalPrice.toFixed(2)}</td>
        <td class="body__block result__antiseptic">${currentAntiseptic.toFixed(2)}</td>
        <td class="body__block result__fullprice">${fullPrice.toFixed(2)}</td>
        <td class="body__block result__delete-row">удалить</td>
        `;
        // document.querySelector('.result__header').after(resultRow);
        totalTable.before(resultRow);


        countV += +volume.toFixed(3);
        countQ += +quantityInput.value;
        countP += +totalPrice.toFixed(2);
        countF += +fullPrice.toFixed(2);
        if(currentAntiseptic == "-"){
            countA += 0;
        }
        else{
            countA += +currentAntiseptic;
        }


        totalTable.style.display ="table-row";
        totalTable.innerHTML = `
            <tr class="result__body result__body--total">
            <td class="body__block result__type">Итого:</td>
            <td class="body__block result__thickness">-</td>
            <td class="body__block result__width">-</td>
            <td class="body__block result__length">-</td>
            <td class="body__block result__quantity">${countQ}</td>
            <td class="body__block result__volume">${countV.toFixed(3)}</td>
            <td class="body__block result__price-volume">-</td>
            <td class="body__block result__price-mp">-</td>
            <td class="body__block result__price-quantity">-</td>
            <td class="body__block result__total">${countP.toFixed(2)}</td>
            <td class="body__block result__antiseptic">${countA.toFixed(2)}</td>
            <td class="body__block result__fullprice">${countF.toFixed(2)}</td>
            <td class="body__block result__delete-row"></td>
            </tr>`;

            let deleteBtn = document.querySelectorAll('.result__delete-row');
            for (var i = 0, len = deleteBtn.length; i < len; i++) {
                deleteBtn[i].onclick = function() {

                    var cols = this.parentNode.querySelectorAll('td');


                    countV -= + cols[5].textContent;
                    countQ -= + cols[4].textContent;
                    countP -= + cols[9].textContent;
                    countF -= + cols[11].textContent;
                    if(cols[10].textContent == "-"){
                        countA -= 0;
                    }
                    else{
                        countA -= +cols[10].textContent;
                    }

                    totalTable.innerHTML = `
                        <tr class="result__body result__body--total">
                        <td class="body__block result__type">Итого:</td>
                        <td class="body__block result__thickness">-</td>
                        <td class="body__block result__width">-</td>
                        <td class="body__block result__length">-</td>
                        <td class="body__block result__quantity">${countQ}</td>
                        <td class="body__block result__volume">${countV.toFixed(3)}</td>
                        <td class="body__block result__price-volume">-</td>
                        <td class="body__block result__price-mp">-</td>
                        <td class="body__block result__price-quantity">-</td>
                        <td class="body__block result__total">${countP.toFixed(2)}</td>
                        <td class="body__block result__antiseptic">${countA.toFixed(2)}</td>
                        <td class="body__block result__fullprice">${countF.toFixed(2)}</td>
                        <td class="body__block result__delete-row"></td>
                        </tr>`;

                    this.parentNode.remove();
                };
            }

    }


   });

}
calc();
