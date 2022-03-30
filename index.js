let currentMonth = 0;

let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];


const calendar = document.getElementById('calender');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');


function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

   
}
 
var changedYear=0;
loadCalender();

function loadCalender(changedYear) {
    /**
   * dt2 to get day of  month in calender As value of day from dt is changed  while setting the  logic for febraury
   */
    const dt2 = new Date();
    const dt = new Date();

    /**
   * dt1 to set 1 day of next month in calender 
   */

    const dt1 = new Date();

    dt1.setDate(1);
    dt1.setMonth(dt1.getMonth() + 1 + currentMonth, +2);

    if (currentMonth !== 0) {
        console.log(' Month:' + dt.getMonth())
        console.log('+' + currentMonth)
    /**
   * IN dt here day from dt changed as here at last i am adding 2 to set logic for february else it will not show month february in calender
   */
        dt.setMonth(dt.getMonth() + currentMonth, +2);
        console.log(' Month:' + dt.getMonth())
    }

    const day = dt2.getDate();

    const month = dt.getMonth();

    if( changedYear){
   var year =  changedYear;
   
     console.log(year);
    }
    else{

    var year = dt.getFullYear();
    }

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const PredaysInMonth = new Date(year, month, 0).getDate();
    
    document.getElementById('Show').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} `;

    let blankDays = firstDayOfMonth.getDay() - 1;
    if (blankDays == -1) {
        blankDays = 6;
    }

    
    calendar.innerHTML = '';

    let preBlank = blankDays;


    for (let i = 1; i <= blankDays + daysInMonth; i++) {

        const dayString = `${month + 1}/${i - blankDays}/${year}`;
        
        preBlank--;
        if (i <= blankDays) {
            const daySquare1 = document.createElement('div');
            daySquare1.classList.add('day');
            var fetch = PredaysInMonth - preBlank;

            daySquare1.innerText = fetch;
            daySquare1.style["color"] ='red';


            
        calendar.appendChild(daySquare1);
        }

      else if (i > blankDays) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');

            daySquare.innerText = i - blankDays;
            const eventForDay = events.find(e => e.date === dayString);


            if (i - blankDays === day && currentMonth === 0) {
                daySquare.id = 'currentDay';
            }


            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
         
      
        daySquare.style["background-color"] ='#e4e6eb';
        daySquare.style["color"] ='blue';
        calendar.appendChild(daySquare);
      

      }

    }


    if (blankDays == 6 || (blankDays == 5 && daysInMonth == 31)) {
        var count = 43;
    } else {
        count = 36;
    }
    for (let i = daysInMonth + 1; i < count - blankDays; i++) {

        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        daySquare.innerText = i - daysInMonth;
        if (daySquare.innerText == 1) {
            daySquare.classList.add('day');
  /**
   * dt1 to set 1 day of next month in calender 
   */
            daySquare.innerText = '1 ' + `${dt1.toLocaleDateString('en-us', { month: 'long' })}`;
           
        }

        calendar.appendChild(daySquare);
    }
}


function ChangeMonth() {
    document.getElementById('nextButton').addEventListener('click', () => {
        currentMonth++;

        loadCalender();
        loadYears()

    });

    document.getElementById('backButton').addEventListener('click', () => {
        currentMonth--;

        loadCalender();
        loadYears();
    });


    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);

}

ChangeMonth();
loadYears();

function loadYears() {
/**
 * Getting Date in dt here again to set month year accordingly while reloading calender. 
 */
    const dt = new Date();
    if (currentMonth !== 0) {
        dt.setMonth(new Date().getMonth() + currentMonth);
    }
    var year = dt.getFullYear();
  
    Saal = document.getElementById('year');

    var startYear = 1900;
    var endYear = 2040;

    for (var i = startYear, j = 0; i <= endYear; i++, j++) {

        var Addoption = document.createElement("option");
        Addoption.value = i;
        Addoption.innerHTML = i;
        Saal.options.add(Addoption);

        if (i == year) {

            Saal.options[j].setAttribute("selected", "selected");
        }
    }
        Saal.onchange =()=>{
        
           
            Saal = document.getElementById('year');
            var selectedYear = Saal.value;
            
        
                 var year1 = selectedYear;
                 var localYear = year1-year;
                 console.log(localYear)
                
                 
                 dt.setFullYear(dt.getFullYear()  + localYear);
                 changedYear =dt.getFullYear();
                 
                 loadCalender(changedYear);
                 loadYears();
                
        
        Saal.appendChild(Addoption);
    }


}


function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
  
    eventTitleInput.value = '';
    clicked = null;
    loadCalender();
    ChangeMonth();
     loadYears();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}
