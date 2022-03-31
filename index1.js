
var month = 0;
var year = 0;
const calendar = document.getElementById('calender');

document.addEventListener("DOMContentLoaded", function () {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    loadCalender(year, month)
    loadYears(year, month);

})

function loadCalender(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const CurrMonthDays = new Date(year, month + 1, 0).getDate(); // use currentMonthDays not Curr..
    const preMonthDays = new Date(year, month, 0).getDate();
    //const nextMonthDay = new Date(year ,month+2 ,0).getDate();  
    const currMonth = new Date(year, month + 1, 0);
    const nextMonth = new Date(year, month + 2, 0);

    // dont use template strings
    document.getElementById('Show').innerText =
        `${currMonth.toLocaleDateString('en-us', { month: 'long' })} `;

    let blankDays = (firstDayOfMonth.getDay() - 1 > 0) ? (firstDayOfMonth.getDay() - 1) : 6;

    preBlank = blankDays;
    var count = (blankDays == 6 || (blankDays == 5 && CurrMonthDays == 31)) ? 42 : 35;

    calendar.innerHTML = '';

    for (var i = 1; i <= (count); i++) {
        preBlank--;
        if (i <= blankDays) {
            const PreCalenDays = document.createElement('div');
            PreCalenDays.classList.add('day');
            var renderDays = preMonthDays - preBlank;
            PreCalenDays.innerText = renderDays;
            PreCalenDays.style["color"] = 'red';
            calendar.appendChild(PreCalenDays);
        }

        if (i > blankDays && i <= CurrMonthDays + blankDays) {

            const CalenDays = document.createElement('div');
            CalenDays.classList.add('day');
            var renderDays = i - blankDays;
            // console.log(i ,blankDays,renderDays);
            CalenDays.innerText = renderDays;
            CalenDays.style["color"] = 'blue';
            calendar.appendChild(CalenDays);
        }

        if (i > CurrMonthDays + blankDays && i <= count) {
            const NextCalenDays = document.createElement('div');
            NextCalenDays.classList.add('day');
            var renderDays = i - (blankDays + CurrMonthDays);
            NextCalenDays.innerText = renderDays;
            if (renderDays == 1) {
                renderDays = '1 ' + `${nextMonth.toLocaleDateString('en-us', { month: 'long' })}`;
            }
            NextCalenDays.innerText = renderDays;
            calendar.appendChild(NextCalenDays);

        }
    }
}




function loadYears() {

    Saal = document.getElementById('year');

    const startYear = 1900;
    const endYear = 2040;

    for (var i = startYear, j = 0; i <= endYear; i++, j++) {

        const Addoption = document.createElement("option");
        Addoption.value = i;
        Addoption.innerHTML = i;
        Saal.options.add(Addoption);

        Saal.options[j].removeAttribute("selected", "selected");
        if (i == year) {

            Saal.options[j].setAttribute("selected", "selected");

        }
    }
    Saal.onchange = () => {

        year = Saal.value;
        loadCalender(year, month);

    }

}

function changeMonthByArrow() {

    document.getElementById('nextButton').addEventListener('click', () => {
        month++;
        loadCalender(year, month);

    });

    document.getElementById('backButton').addEventListener('click', () => {
        month--;
        loadCalender(year, month);

    });

}

changeMonthByArrow();

