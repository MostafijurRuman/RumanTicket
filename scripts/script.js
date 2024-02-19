
const allSeat = document.getElementsByClassName('btn-seat');
const maxSeat = [];
for (const seat of allSeat) {
    seat.addEventListener('click', function (event) {
        const element = event.target;
        if (maxSeat.includes(element.innerText) === false) {

            if (maxSeat.length < 4) {
                maxSeat.push(element.innerText);
                element.classList.add('bg-[#1DD100]');
                element.classList.add('text-white');
                totalSeatCount();
                setSelectedSeat();
                setTicketList(element);
                totalPriceCount();

            }
            else {
                alert("You can't buy over 4 tickets");
            }
        }
        else {
            alert("This seat already Booked")
        }

    })
}



document.getElementById('btn-discount').addEventListener('click', function (e) {
    const couponCode = getInputValueById('coupon-field');
    const totalPrice = getElementValueById('total');
    const discountElement = document.getElementById('discount').parentNode.parentNode;

    if (maxSeat.length === 4) {
        if (couponCode === 'NEW15') {
            console.log('15% discount')
            const discount = totalPrice * 15 / 100;
            const discountPrice = totalPrice - discount;
            setElementValueById('grand-total', discountPrice);
            discountElement.classList.remove('hidden');
            setElementValueById('discount', discount);
            e.target.parentNode.classList.add('hidden')
        }
        else if (couponCode === 'Couple 20') {
            console.log('20% discount')
            const discount = totalPrice * 20 / 100;
            const discountPrice = totalPrice - discount;
            setElementValueById('grand-total', discountPrice);
            discountElement.classList.remove('hidden');
            setElementValueById('discount', discount);
            e.target.parentNode.classList.add('hidden')
        }
        else {
            alert('Coupon code did not matched')
        }
    }
    else {
        alert('You have to book 4 seat');
    }
})

function getInputValueById(elementId) {
    const element = document.getElementById(elementId);
    const value = element.value;
    return value;
}

function totalPriceCount() {
    const total = getElementValueById('total');
    const ticketPrice = getElementValueById('ticket-price');
    const updatedTotal = total + ticketPrice;

    setElementValueById('total', updatedTotal);
    setElementValueById('grand-total', updatedTotal);
    /* if (updatedTotal > 0) {
        const next = document.getElementById('next');
        next.removeAttribute('disabled');
    } */
}

document.getElementById('phone-number').addEventListener('keyup', function (e) {
    const number = e.target.value;
    const numbers = number.split('');
    const next = document.getElementById('next');
    console.log(numbers)
    if (numbers.length === 11 && maxSeat.length > 0) {
        next.removeAttribute('disabled');
    }
    else {
        next.setAttribute('disabled', true);
    }
})

function setTicketList(element) {
    const selectedContainer = document.getElementById('selected-container');
    const perTicketPrice = getElementValueById('per-ticket-price');
    const tr = document.createElement('tr');
    tr.classList.add('text-[#03071299]', 'text-base')
    tr.innerHTML = `
        <td>${element.innerText}</td>
       <td>Economy</td>
       <td id="ticket-price" class="text-right">${perTicketPrice}</td>
    `
    selectedContainer.appendChild(tr);
}


function setSelectedSeat() {
    const selectedSeat = getElementValueById('selected-seat-count');
    const updateSelectedSeat = selectedSeat + 1;
    setElementValueById('selected-seat-count', updateSelectedSeat)
    if (updateSelectedSeat === 4) {
        const discountBtn = document.getElementById('btn-discount');
        discountBtn.removeAttribute('disabled');
    }
}

function totalSeatCount() {
    const totalSeat = getElementValueById('total-seat');
    const updateSeat = totalSeat - 1;
    setElementValueById('total-seat', updateSeat);
}

function setElementValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;

}

function getElementValueById(elementId) {
    const element = document.getElementById(elementId);
    const value = parseInt(element.innerText);
    return value;
}

