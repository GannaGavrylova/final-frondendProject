document.addEventListener("DOMContentLoaded", function () {
  // функция загрузки header
  fetch("components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });

  // функция загрузки footer
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});

const eventsMock = [
  {
    title: "Day Trading Idea and Strategy",
    date: new Date(2024, 8, 22, 19),
    image: "assets/fonts/group-cover.png",
    type: "offline",
    attendees: 15,
    price: 0.0,
    category: "Business",
    distance: 5,
    latitude: 40.7488,
    longitude: -73.9857,
    city: "New York",
  },
  {
    title: "Let's Talk Networking: JPMorgan Chase in Palo Alto",
    date: new Date(2024, 8, 21, 17),
    image: "assets/fonts/Hotel.png",
    type: "offline",
    attendees: 41,
    price: 0.0,
    category: "Business",
    distance: 15,
    latitude: 40.7488,
    longitude: -73.9857,
    city: "New York",
  },
  {
    title:
      "Tech Talks & Quiz: Next-Gen Database Solutions for Emerging Use Cases",
    date: new Date(2024, 8, 13, 18),
    image: "assets/fonts/techTalks and quiz.png",
    type: "online",
    attendees: 40,
    price: 0.0,
    category: "Technology",
    distance: 0,
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco",
  },
  {
    title: "INFORMS San Francisco Chapter In-Person Event",
    date: new Date(2024, 2, 23, 17),
    image: "assets/fonts/informs.png",
    type: "offline",
    attendees: 41,
    price: 0.0,
    category: "Health and Wellbeing",
    distance: 50,
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco",
  },
  {
    title: "AI Wednesdays - Meet and Greet!",
    date: new Date(2024, 8, 13, 18),
    image: "assets/fonts/meet and greet.png",
    type: "offline",
    attendees: 29,
    price: 0.0,
    category: "Technology",
    distance: 5,
    latitude: 40.7488,
    longitude: -73.9857,
    city: "New York",
  },
  {
    title: "ROS By-The-Bay March 2024",
    date: new Date(2024, 8, 21, 18),
    image: "assets/fonts/ros-online.png",
    type: "online",
    attendees: 51,
    price: 0.0,
    category: "Social Activities",
    distance: 0,
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco",
  },
  {
    title: "Free Christian Singles' Dinner",
    date: new Date(2024, 8, 29, 18),
    image: "assets/fonts/christian-singles-dinner.png",
    type: "offline",
    attendees: 11,
    price: 0.0,
    category: "Hobbies and Passions",
    distance: 10,
    latitude: 40.7488,
    longitude: -73.9857,
    city: "New York",
  },
  {
    title: "In-person: Deep Dive into RAG Architectures (Food served)",
    date: new Date(2024, 2, 14, 11),
    image: "assets/fonts/deep-dive.png",
    type: "offline",
    attendees: 16,
    price: 0.0,
    category: "Hobbies and Passions",
    distance: 50,
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco",
  },
];

// фильтрация

const typeSelect = document.querySelector(".type");

const distanceSelect = document.querySelector(".distance");

const categorySelect = document.querySelector(".category");

const eventsContainer = document.querySelector("#events-container");

let map;
let markers = [];

function initMap() {
  map = L.map("map").setView([37.7128, -122.4194], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  displayEvents(eventsMock);
}

function updateMapMarkers(events) {
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];
  events.forEach((event) => {
    if (event.type === "offline" && event.latitude && event.longitude) {
      const marker = L.marker([event.latitude, event.longitude]).addTo(map);
      marker.bindPopup(event.title);
      markers.push(marker);
    }
  });
}

function displayEvents(events) {
  eventsContainer.innerHTML = "";
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    eventCard.innerHTML = `
    <div class="imgCartContainer">
     <img src="${event.image}" alt="${event.title}" />
     <hr />
    </div>  

       <div class="cardContentContainer">
        <p>Date: ${event.date.toDateString()}</p>
       <h3>${event.title}</h3>
        <p>Category: ${event.category} ${event.distance} km</p>
         <p>Attendees: ${event.attendees} </p>
        
       </div> `;
    eventsContainer.appendChild(eventCard);
  });
}

function filterCard() {
  const eventValueType = typeSelect.value;
  const eventValueCategory = categorySelect.value;
  const eventValueDistance = distanceSelect.value;
  let filterEvens = eventsMock;
  if (eventValueType !== "all") {
    filterEvens = filterEvens.filter((event) => event.type === eventValueType);
  }
  if (eventValueCategory !== "any") {
    filterEvens = filterEvens.filter(
      (event) => event.category === eventValueCategory
    );
  }
  if (eventValueDistance !== "any") {
    filterEvens = filterEvens.filter(
      (event) => event.distance <= parseInt(eventValueDistance)
    );
  }
  updateMapMarkers(filterEvens);
  displayEvents(filterEvens);
}
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  filterCard();

  typeSelect.addEventListener("change", filterCard);
  categorySelect.addEventListener("change", filterCard);
  distanceSelect.addEventListener("change", filterCard);
});
