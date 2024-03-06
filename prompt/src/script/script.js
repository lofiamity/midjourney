document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan parameter JSON dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const jsonName = urlParams.get('json');

    // Menentukan path menuju file JSON berdasarkan parameter JSON
    const jsonPath = jsonName ? `/${jsonName}.json` : '/prompt/explore.json';

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            generateImageGallery(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    function generateImageGallery(jsonData) {
        const galleryElement = document.getElementById('gallery');
        galleryElement.innerHTML = ''; // Kosongkan galeri sebelum menambahkan gambar baru

        jsonData.forEach(item => {
            for (let i = 0; i < 4; i++) {
                const imageKey = `image_${i}`;
                const imageUrl = item[imageKey];

                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                const cardImageElement = document.createElement('div');
                cardImageElement.classList.add('card-image');

                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.loading = 'lazy'; // Tambahkan atribut loading="lazy" untuk lazy loading

                cardImageElement.appendChild(imgElement);

                const cardContentElement = document.createElement('div');
                cardContentElement.classList.add('card-content');

                const actionButton = document.createElement('button');
                actionButton.classList.add('card-action');
                actionButton.textContent = 'Lihat selengkapnya'; // Mengubah teks tombol menjadi "Prompt"
                actionButton.onclick = function() {
                    const index = i;
                    const promptUrl = `https://www.midjourney.com/jobs/${item.parent_id}?index=${index}`;
                    window.open(promptUrl, '_blank');
                };

                cardContentElement.appendChild(actionButton);

                cardElement.appendChild(cardImageElement);
                cardElement.appendChild(cardContentElement);

                galleryElement.appendChild(cardElement);
            }
        });
    }
});