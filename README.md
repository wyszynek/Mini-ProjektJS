# Mini-Projekt: Paragon

Projekt ma na celu stworzenie aplikacji do zarządzania pozycjami paragonu, z możliwością dodawania, edytowania oraz usuwania pozycji. Aplikacja pozwala na reprezentację paragonu jako tablicy obiektów, z których każdy obiekt zawiera nazwę, cenę jednostkową oraz ilość produktów. Pozycje paragonu przechowywane są w pamięci, a zmiany wprowadzone przez użytkownika są natychmiastowo odzwierciedlane zarówno w modelu danych, jak i w widoku.

Projekt wykorzystuje **Node.js** z frameworkiem **Express** do stworzenia backendu oraz prosty interfejs do manipulacji pozycjami paragonu.

## Funkcjonalności

1. **Wyświetlanie paragonu**
   - Paragon jest reprezentowany jako tablica obiektów, gdzie każdy obiekt zawiera:
     - `nazwa`: Nazwa produktu.
     - `cena`: Cena jednostkowa produktu.
     - `ilosc`: Ilość produktów.

2. **Dodawanie nowych pozycji paragonu**
   - Umożliwia użytkownikowi wprowadzanie nowych pozycji do paragonu poprzez formularz, w którym użytkownik wpisuje nazwę, cenę jednostkową oraz ilość.

3. **Edycja istniejących pozycji**
   - Użytkownik ma możliwość edytowania istniejących pozycji na paragonie, zmieniając nazwę, cenę jednostkową i ilość.

4. **Usuwanie pozycji**
   - Użytkownik może usunąć wybraną pozycję z paragonu.

5. **Backend w Node.js (Express)**
   - Backend implementuje operacje CRUD do listy pozycji paragonu.
   - Dane przechowywane są w pamięci serwera (znikają po restarcie serwera).
   - Backend obsługuje operacje: 
     - **GET** – Pobieranie listy pozycji.
     - **POST** – Dodawanie nowych pozycji.
     - **PUT** – Edytowanie istniejących pozycji.
     - **DELETE** – Usuwanie pozycji.
