const API_URL = "http://localhost:3000/receiptItems";
let receiptItems = [];

async function fetchItems() {
    try {
        const res = await fetch(API_URL);
        receiptItems = await res.json();

        renderReceipt();
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
    }
}

// "document" daje dostęp i manipuluje załadowanym dokumentem HTML
function renderReceipt() {
    // przeszukujemy dokument HTML i zwracamy pierwszy pasujący element znajdujący się wewnątrz tabeli
    const receiptTableBody = document.querySelector("#receipt tbody");

    const totalValueOfProducts = document.getElementById("totalValue"); 
    let totalValue = 0;
    let LP = 1;

    receiptTableBody.innerHTML = ""; 

    receiptItems.forEach((item) => {
        const itemRow = document.createElement("tr"); // table row, table data

        itemRow.innerHTML = ` 
            <td>${LP++}</td>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)} zł</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)*item.quantity} zł</td>
            <td>
                <button onclick="openEditDialog(${item.id})">Edytuj</button>
                <button onclick="confirmDelete(${item.id})">Usuń</button>
            </td>
        `;

        receiptTableBody.appendChild(itemRow);

        totalValue += item.price * item.quantity;
    });

    totalValueOfProducts.textContent = totalValue.toFixed(2) + " zł";

    console.log(receiptItems);
}

function openAddDialog() {
    const dialog = document.getElementById("dialogWindow");

    document.getElementById("itemForm").reset(); // przywracanie domyślnych wartości elementu formularza (czyli poprostu pusty)
    document.getElementById("itemIndex").value = ""; // czyszczenie `id` przy nowym elemencie

    dialog.showModal(); // wyświetlamy dialog ponad wszystkie otwarte dialogi ktore moga byc otwarte
}

function openEditDialog(id) {
    const item = receiptItems.find(item => item.id === id);
    if (!item) return;

    document.getElementById("itemName").value = item.name;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemQuantity").value = item.quantity;
    document.getElementById("itemIndex").value = item.id;
    document.getElementById("dialogWindow").showModal();
}

async function saveItem() {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const quantity = parseInt(document.getElementById("itemQuantity").value, 10);
    const id = document.getElementById("itemIndex").value;

    //console.log("Zapisywanie elementu:", { name, price, quantity, id });

    if (name && price > 0 && quantity > 0) {
        const newItem = { name, price, quantity };

        try {
            if (id) {
                //console.log("Edycja istniejącego elementu");
                await fetch(`${API_URL}/${id}`, { // żądanie zapytania do 3000 do pobrania 
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }, // nagłówek który informuje, że dane są w formacie json
                    body: JSON.stringify(newItem) // nowy produkt z body który wysyłamy jest konwertowany na json 
                });
            } else {
                //console.log("Dodawanie nowego elementu");
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newItem)
                });
            }
            fetchItems(); 
            closeDialog();
        } catch (error) {
            //console.error("Błąd podczas zapisywania danych:", error);
            alert("Błąd podczas zapisywania. Sprawdź konsolę.");
        }
    } else {
        alert("Proszę podać poprawne dane.");
    }
}

// Potwierdź i usuń pozycję
async function confirmDelete(id) {
    if (confirm("Czy na pewno chcesz usunąć tę pozycję?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            fetchItems();
        } catch (error) {
            console.error("Błąd podczas usuwania danych:", error);
        }
    }
}

function closeDialog() {
    const dialog = document.getElementById("dialogWindow");
    dialog.close();
}

function setReceiptDate() {
    const receiptDate = document.getElementById("receiptDate");
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    receiptDate.textContent = `${formattedDate}`;
}

setReceiptDate();
fetchItems();
