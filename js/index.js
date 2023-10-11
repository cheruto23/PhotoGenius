document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('submit');
    const numPhotosInput = document.getElementById('numPhotos');
    const photosContainer = document.querySelector('.photos');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const numPhotos = numPhotosInput.value;

        if (!numPhotos) {
            alert('Please enter the number of images you want to view.');
            return;
        }

        fetch(`https://picsum.photos/v2/list?page=1&limit=${numPhotos}`)
            .then(res => res.json())
            .then(data => {
                photosContainer.innerHTML = '';

                data.forEach(photo => {
                    const img = document.createElement('img');
                    img.src = photo.download_url;
                    img.alt = 'Placeholder Image';

                    const photoContainer = document.createElement('div');
                    photoContainer.appendChild(img);

                    const updateButton = document.createElement('button');
                    updateButton.innerText = 'Update';
                    updateButton.addEventListener('click', function () {
                        alert('Update functionality to be added.');
                    });
                    photoContainer.appendChild(updateButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.addEventListener('click', function () {
                        photoContainer.remove();
                    });
                    photoContainer.appendChild(deleteButton);

                    const likeButton = document.createElement('button');
                    likeButton.innerText = 'Like';
                    likeButton.addEventListener('click', function () {
                        alert('Photo liked');
                    });
                    photoContainer.appendChild(likeButton);

                    const downloadButton = document.createElement('button');
                    downloadButton.innerText = 'Download';
                    downloadButton.addEventListener('click', function () {
                        downloadPhoto(photo.download_url, 'photo.jpg');
                    });
                    photoContainer.appendChild(downloadButton);

                    photosContainer.appendChild(photoContainer);
                });
            })
            .catch((error) => {
                console.error('Could not fetch images:', error);
            });
    });
});
