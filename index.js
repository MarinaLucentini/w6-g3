const fetchBook = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    //   ho richiamato la libreria con fetch
    .then((response) => {
      console.log(response);
      // qui ho verificato la risposta
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }
        // qui ho previsto eventuali pagine di errore
        throw new Error("Generic Fetch Error");
      }
    })
    .then((books) => {
      console.log(books);

      //   qui ho richiamato l'array di oggetti della libreria
      // adesso con un foreach ciclo l'array
      const row = document.getElementById("colonna");
      books.forEach((booksToBuy) => {
        const col = document.createElement("col");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("text-center");
        const img = document.createElement("img");
        img.src = booksToBuy.img;
        img.classList.add("card-img-top");
        card.style.height = "500px";
        img.style.height = "215px";
        img.classList.add("object-fit-cover");

        const title = document.createElement("p");
        title.innerHTML = "Titolo " + booksToBuy.title;

        title.classList.add("card-text");
        const price = document.createElement("p");
        price.innerHTML = "Prezzo: " + booksToBuy.price;
        price.classList.add("card-text");
        const btnScarta = document.createElement("button");
        btnScarta.classList.add("btn");

        btnScarta.innerHTML = "Scarta";
        btnScarta.classList.add("btn-outline-danger");
        btnScarta.classList.add("mb-3");

        const btnBuy = document.createElement("button");
        btnBuy.classList.add("btn");

        btnBuy.innerHTML = "Aggiungi al carrello";
        btnBuy.classList.add("btn-outline-success");
        // adesso creo la funzione per eliminare la card
        btnScarta.addEventListener("click", (event) => {
          event.currentTarget = col.remove();
        });
        const booksInTheChart = [];
        class Book {
          constructor(title_book, price_book, img_book) {
            this.title = title_book;
            this.price = price_book;
            this.img = img_book;
          }
        }
        btnBuy.addEventListener("click", (event) => {
          const bookCart = new Book(
            booksToBuy.title,
            booksToBuy.price,
            booksToBuy.img
          );
          booksInTheChart.push(bookCart);
          console.log(booksInTheChart);
          localStorage.setItem(
            "Book in the card",
            JSON.stringify(booksInTheChart)
          );
        });
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(btnScarta);
        card.appendChild(btnBuy);
        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  fetchBook();
};
