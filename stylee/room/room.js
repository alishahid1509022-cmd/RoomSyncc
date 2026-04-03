// Database of rooms
let rooms = [
    {
        id: 1,
        title: "Cozy Hostel Room",
        city: "Lahore",
        rent: 12000,
        gender: "Male",
        type: "Hostel",
        rating: 4.5,
        createdAt: new Date("2025-01-15")
    },
    {
        id: 2,
        title: "Luxury Apartment",
        city: "Karachi",
        rent: 35000,
        gender: "Female",
        type: "Apartment",
        rating: 4.8,
        createdAt: new Date("2025-02-20")
    },
    {
        id: 3,
        title: "Student Shared Room",
        city: "Islamabad",
        rent: 8000,
        gender: "Any",
        type: "Shared Room",
        rating: 4.2,
        createdAt: new Date("2025-03-01")
    },
    {
        id: 4,
        title: "Premium Single Room",
        city: "Lahore",
        rent: 25000,
        gender: "Male",
        type: "Single Room",
        rating: 4.9,
        createdAt: new Date("2025-03-10")
    },
    {
        id: 5,
        title: "Peaceful Hostel",
        city: "Multan",
        rent: 10000,
        gender: "Female",
        type: "Hostel",
        rating: 4.0,
        createdAt: new Date("2025-01-05")
    }
];

let currentEditId = null;
let currentFilteredRooms = [...rooms];

// ============ STRING METHODS DEMONSTRATION ============
// 10+ String methods used throughout the application:

// 1. toLowerCase() - used in search
// 2. toUpperCase() - used in display
// 3. trim() - used in form input
// 4. includes() - used in search filtering
// 5. split() - used in formatting
// 6. join() - used in formatting
// 7. replace() - used in price formatting
// 8. substring() - used in truncating titles
// 9. charAt() - used in display
// 10. length - used in validation
// 11. startsWith() - used in search
// 12. endsWith() - used in search

function formatTitle(title) {
    // String methods: toUpperCase(), charAt(), substring(), toLowerCase()
    return title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
}

function formatRent(rent) {
    // String methods: toString(), replace()
    return "PKR " + rent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function truncateTitle(title, maxLength = 25) {
    // String methods: length, substring()
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + "...";
    }
    return title;
}

function getCityInitial(city) {
    // String method: charAt(), toUpperCase()
    return city.charAt(0).toUpperCase();
}

function formatRoomType(type) {
    // String methods: split(), join(), toUpperCase()
    let words = type.split(" ");
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// ============ DISPLAY FUNCTION ============
function displayRooms(roomsToShow = currentFilteredRooms) {
    let container = document.getElementById("roomContainer");
    
    if (!container) return;
    
    if (roomsToShow.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">No rooms found. Add some rooms!</div>`;
        updateStatistics([]);
        return;
    }
    
    // Using map() to create HTML
    container.innerHTML = roomsToShow.map(room => `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold dark:text-white">${formatTitle(truncateTitle(room.title))}</h3>
                    <span class="text-yellow-500">⭐ ${room.rating}</span>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-2">📍 ${room.city} ${getCityInitial(room.city)}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-2">💰 ${formatRent(room.rent)}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-2">👤 ${room.gender}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-3">🏠 ${formatRoomType(room.type)}</p>
                <div class="flex gap-2">
                    <button onclick="openEditModal(${room.id})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                    <button onclick="deleteRoom(${room.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    `).join("");
    
    updateStatistics(roomsToShow);
}

// ============ STATISTICS USING REDUCE() ============
function updateStatistics(roomsData) {
    // Using reduce() for calculations
    let totalRooms = roomsData.length;
    let totalRent = roomsData.reduce((sum, room) => sum + room.rent, 0);
    let avgRent = totalRooms > 0 ? Math.round(totalRent / totalRooms) : 0;
    
    // Using filter() for available rooms count
    let availableCount = roomsData.filter(room => room.available !== false).length;
    
    // Using reduce() for average rating
    let totalRating = roomsData.reduce((sum, room) => sum + (room.rating || 0), 0);
    let avgRating = totalRooms > 0 ? (totalRating / totalRooms).toFixed(1) : 0;
    
    // Update DOM
    document.getElementById("totalRooms") && (document.getElementById("totalRooms").innerText = totalRooms);
    document.getElementById("avgRent") && (document.getElementById("avgRent").innerText = "PKR " + avgRent.toLocaleString());
    document.getElementById("availableRooms") && (document.getElementById("availableRooms").innerText = availableCount);
    document.getElementById("avgRating") && (document.getElementById("avgRating").innerText = avgRating);
}

// ============ CREATE (ADD ROOM) ============
function addRoom() {
    let title = document.getElementById("roomTitle")?.value.trim();
    let city = document.getElementById("roomCity")?.value.trim();
    let rent = parseInt(document.getElementById("roomRent")?.value);
    let gender = document.getElementById("roomGender")?.value;
    let type = document.getElementById("roomType")?.value;
    let rating = parseFloat(document.getElementById("roomRating")?.value) || 3.0;
    
    // String methods: trim(), length validation
    if (!title || title.length < 2) {
        alert("Title must be at least 2 characters long");
        return;
    }
    if (!city || city.length < 2) {
        alert("City must be at least 2 characters long");
        return;
    }
    if (isNaN(rent) || rent < 1000) {
        alert("Please enter a valid rent amount (minimum 1000)");
        return;
    }
    if (rating < 1 || rating > 5) {
        alert("Rating must be between 1 and 5");
        return;
    }
    
    // Using push() to add new room
    let newRoom = {
        id: Date.now(),
        title: title,
        city: city,
        rent: rent,
        gender: gender,
        type: type,
        rating: rating,
        createdAt: new Date(),
        available: true
    };
    
    rooms.push(newRoom);
    applyFiltersAndSort(); // Refresh display with current filters
    
    // Clear form
    document.getElementById("roomTitle").value = "";
    document.getElementById("roomCity").value = "";
    document.getElementById("roomRent").value = "";
    document.getElementById("roomRating").value = "";
}

// ============ DELETE USING FILTER() ============
function deleteRoom(id) {
    // Using filter() to remove room
    rooms = rooms.filter(room => room.id !== id);
    applyFiltersAndSort();
}

// ============ UPDATE (EDIT ROOM) ============
function openEditModal(id) {
    let room = rooms.find(r => r.id === id);
    if (!room) return;
    
    currentEditId = id;
    
    document.getElementById("editTitle").value = room.title;
    document.getElementById("editCity").value = room.city;
    document.getElementById("editRent").value = room.rent;
    document.getElementById("editGender").value = room.gender;
    document.getElementById("editType").value = room.type;
    document.getElementById("editRating").value = room.rating;
    
    document.getElementById("editModal").classList.remove("hidden");
    document.getElementById("editModal").classList.add("flex");
}

function updateRoom() {
    let room = rooms.find(r => r.id === currentEditId);
    if (!room) return;
    
    // Using object property updates
    room.title = document.getElementById("editTitle").value.trim();
    room.city = document.getElementById("editCity").value.trim();
    room.rent = parseInt(document.getElementById("editRent").value);
    room.gender = document.getElementById("editGender").value;
    room.type = document.getElementById("editType").value;
    room.rating = parseFloat(document.getElementById("editRating").value);
    
    applyFiltersAndSort();
    closeModal();
}

function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
    document.getElementById("editModal").classList.remove("flex");
}

// ============ SEARCH & FILTER USING ARRAY METHODS ============
function applyFiltersAndSort() {
    let filtered = [...rooms];
    
    // Get filter values
    let searchTerm = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
    let genderFilter = document.getElementById("filterGender")?.value || "";
    let typeFilter = document.getElementById("filterType")?.value || "";
    let sortBy = document.getElementById("sortBy")?.value || "";
    
    // 1. SEARCH using includes() (String method)
    if (searchTerm) {
        filtered = filtered.filter(room => 
            room.title.toLowerCase().includes(searchTerm) || 
            room.city.toLowerCase().includes(searchTerm)
        );
    }
    
    // 2. GENDER FILTER using filter()
    if (genderFilter) {
        filtered = filtered.filter(room => room.gender === genderFilter);
    }
    
    // 3. TYPE FILTER using filter()
    if (typeFilter) {
        filtered = filtered.filter(room => room.type === typeFilter);
    }
    
    // 4. SORTING using sort()
    if (sortBy === "rent_asc") {
        filtered.sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "rent_desc") {
        filtered.sort((a, b) => b.rent - a.rent);
    } else if (sortBy === "rating_desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "date_desc") {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    currentFilteredRooms = filtered;
    displayRooms(filtered);
}

// 5. PRICE RANGE FILTER
function filterByPriceRange(min = 0, max = 15000) {
    let filtered = rooms.filter(room => room.rent >= min && room.rent <= max);
    currentFilteredRooms = filtered;
    displayRooms(filtered);
}

// 6. TOP RATED FILTER (using filter() and some())
function showTopRated() {
    let filtered = rooms.filter(room => room.rating >= 4.0);
    currentFilteredRooms = filtered;
    displayRooms(filtered);
}

// 7. AFFORDABLE FILTER (using every() to check all, and filter)
function showAffordable() {
    let avgRent = rooms.reduce((sum, r) => sum + r.rent, 0) / rooms.length;
    let filtered = rooms.filter(room => room.rent < avgRent);
    currentFilteredRooms = filtered;
    displayRooms(filtered);
}

// 8. RESET FILTERS
function resetFilters() {
    if (document.getElementById("searchInput")) document.getElementById("searchInput").value = "";
    if (document.getElementById("filterGender")) document.getElementById("filterGender").value = "";
    if (document.getElementById("filterType")) document.getElementById("filterType").value = "";
    if (document.getElementById("sortBy")) document.getElementById("sortBy").value = "";
    
    currentFilteredRooms = [...rooms];
    displayRooms(rooms);
}

// 9. DEMONSTRATE EVERY() and SOME() methods
function checkAvailability() {
    // Using every() - checks if all rooms are available
    let allAvailable = rooms.every(room => room.available !== false);
    console.log("All rooms available?", allAvailable);
    
    // Using some() - checks if any room is expensive (> 30000)
    let hasExpensive = rooms.some(room => room.rent > 30000);
    console.log("Has expensive rooms?", hasExpensive);
    
    return { allAvailable, hasExpensive };
}

// 10. DEMONSTRATE FIND() method
function findRoomByTitle(title) {
    let room = rooms.find(room => room.title.toLowerCase() === title.toLowerCase());
    return room || null;
}

// 11. DEMONSTRATE REDUCE() for total value
function getTotalValue() {
    return rooms.reduce((total, room) => total + room.rent, 0);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    displayRooms(rooms);
    
    // Add event listeners for search and filters
    const searchInput = document.getElementById("searchInput");
    const genderFilter = document.getElementById("filterGender");
    const typeFilter = document.getElementById("filterType");
    const sortBy = document.getElementById("sortBy");
    
    if (searchInput) searchInput.addEventListener("input", applyFiltersAndSort);
    if (genderFilter) genderFilter.addEventListener("change", applyFiltersAndSort);
    if (typeFilter) typeFilter.addEventListener("change", applyFiltersAndSort);
    if (sortBy) sortBy.addEventListener("change", applyFiltersAndSort);
    
    // Demonstrate array methods
    console.log("=== Array Methods Demonstration ===");
    console.log("Total rooms:", rooms.length);
    console.log("All rooms:", rooms);
    console.log("Filtered male rooms:", rooms.filter(r => r.gender === "Male"));
    console.log("Sorted by rent:", [...rooms].sort((a,b) => a.rent - b.rent));
    console.log("Total rent value:", getTotalValue());
    console.log("Room titles:", rooms.map(r => r.title));
    console.log("Check availability:", checkAvailability());
    console.log("Find 'Luxury Apartment':", findRoomByTitle("Luxury Apartment"));
    console.log("Has any room > 30000?", rooms.some(r => r.rent > 30000));
    console.log("All rooms have rating > 3?", rooms.every(r => r.rating > 3));
    
    console.log("=== String Methods Demonstration ===");
    console.log("Format title example:", formatTitle("hello world"));
    console.log("Format rent example:", formatRent(25000));
    console.log("Truncate title example:", truncateTitle("This is a very long title that needs truncation"));
    console.log("City initial example:", getCityInitial("Lahore"));
    console.log("Format room type example:", formatRoomType("shared room"));
});