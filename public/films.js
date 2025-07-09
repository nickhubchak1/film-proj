// public/films.js

const API = (function() {


    function clearSuccessMessage() {
        const msg = document.getElementById('successMessage');
        msg.textContent = '';
        msg.classList.add('hidden');
    }

    async function createFilm() {
        const input = document.getElementById('filmTitle');
        const ratingInput = document.getElementById('filmRating');
        const title = input.value.trim();
        const rating = parseInt(ratingInput.value, 10);
        clearSuccessMessage();

        if (title.length === 0) {
            showSuccess('Film title cannot be empty.', true);
            return false;
        }

        if (isNaN(rating) || rating < 1 || rating > 10) {
            showSuccess('Please provide a rating between 1 and 10.', true);
            return false;
        }

        try {
            const resp = await fetch('http://localhost:3001/api/v1/films', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: title, rating })
            });
            await resp.json();
        } catch (e) {
            console.error(e);
        }
        input.value = '';
        ratingInput.value = '10';
        showSuccess('Film added successfully!');

        document.getElementById('filmsTable').classList.add('hidden');
        return false;
    }

    async function getFilms() {
        const table = document.getElementById('filmsTable');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        clearSuccessMessage();

        try {
            const resp = await fetch('http://localhost:3001/api/v1/films');
            const data = await resp.json();

            data.forEach((film, idx) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${idx + 1}</td>
                    <td>${film.name}</td>
                    <td><span class="badge">${film.rating}/10</span></td>
                `;
                tbody.appendChild(row);
            });

            if (data.length === 0) {
                table.classList.add('hidden');
                return false;
            }

            table.classList.remove('hidden');
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    function showSuccess(message, isError = false) {
        const msg = document.getElementById('successMessage');
        msg.textContent = message;
        msg.className = isError ? 'error' : 'success';
        setTimeout(clearSuccessMessage, 2000);
    }

    return {
        createFilm,
        getFilms
    };
})();
