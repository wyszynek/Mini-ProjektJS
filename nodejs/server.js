// "req" to obiekt który reprezentuje żądanie przychodzące od klienta
// "res" to obiekt który służy do konstruowania i wysyłania odpowiedzi z powrotem do klienta

const express = require('express');

// moduł CORS umożliwia dostęp do serwera z przeglądarką
const cors = require('cors');

const app = express();
const PORT = 3000;

// konfiguracja aplikacji aby używała CORS co pozwala na połączenia z przeglądarką
app.use(cors());

// obsługa żądań z danymi w formacie JSON
app.use(express.json());

let receiptItems = [];
let nextId = 1;

app.get('/receiptItems', (req, res) => {
    // odpowiedź JSON do klienta
    res.json(receiptItems);
});

// dodanie nowej pozycji
app.post('/receiptItems', (req, res) => {
    const { name, price, quantity } = req.body;
    if (!name || price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: "Niepoprawne dane pozycji" });
    }

    const newItem = { id: nextId++, name, price, quantity };
    receiptItems.push(newItem);

    // zwracamy nowo utworzoną pozycję jako odpowiedź
    res.status(201).json(newItem);
});

// edycja pozycji
app.put('/receiptItems/:id', (req, res) => {
    const { id } = req.params; // req.params przechowuje parametry ścieżki URL podanej wyzej  
    const { name, price, quantity } = req.body; // req.body zwraca dane przesłane przez klienta
    const itemIndex = receiptItems.findIndex(item => item.id == id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Pozycja nie znaleziona" });
    }
    if (!name || price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: "Niepoprawne dane pozycji" });
    }

    receiptItems[itemIndex] = { id: parseInt(id), name, price, quantity };
    res.json(receiptItems[itemIndex]);
});

app.delete('/receiptItems/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = receiptItems.findIndex(item => item.id == id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Pozycja nie znaleziona" });
    }

    const deletedItem = receiptItems.splice(itemIndex, 1);
    res.json(deletedItem);
});

// uruchomienie serwera na porcie 3000
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
