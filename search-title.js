import fetch from "node-fetch";
import fs from "fs";

const url = "https://www.googleapis.com/books/v1/volumes?q=";
const terms = "Mind in Motion";

const getBook = async () => {
    const response = await fetch(url + terms.replace(/ /g, "+"));
    const data = await response.json();
    return data;
};

getBook()
    .then((data) => {
        data.items.forEach((item) => {
            const title = item.volumeInfo.title;
            const subtitle =
                item.volumeInfo.subtitle && item.volumeInfo.subtitle;
            const author = item.volumeInfo.authors[0];
            const cover = `https://books.google.com/books?id=${item.id}&printsec=frontcover&img=1&zoom=3&source=gbs_api`;
            const link = `https://www.google.com/books/edition/${item.volumeInfo.title.replace(
                / /g,
                "_"
            )}/${item.id}`;
            const obj = { title, subtitle, author, cover, link };

            fs.writeFileSync("data.json", JSON.stringify(obj));
        });
    })
    .catch((err) => console.error(err));
