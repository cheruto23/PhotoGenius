document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("submit");
  const numPhotosInput = document.getElementById("numPhotos");
  const photosContainer = document.querySelector(".photos");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const numPhotos = numPhotosInput.value;

    if (!numPhotos) {
      alert("Please enter the number of images you want to view.");
      return;
    }

    fetch(`https://picsum.photos/v2/list?page=1&limit=${numPhotos}`)
      .then((res) => res.json())
      .then((data) => {
        photosContainer.innerHTML = "";

        data.forEach((photo) => {
          const img = document.createElement("img");
          img.src = photo.download_url;
          img.alt = "Placeholder Image";

          const photoContainer = document.createElement("div");
          photoContainer.appendChild(img);

          
          const id = document.createElement("p");
          id.textContent = `ID: ${photo.id}`;
          photoContainer.appendChild(id);

          
          const author = document.createElement("p");
          author.textContent = `Author: ${photo.author}`;
          photoContainer.appendChild(author);

          const url = document.createElement("p");
          url.textContent = `url: ${photo.url}`;
          photoContainer.appendChild(url);

          const downloadUrl = document.createElement("p");
          downloadUrl.textContent = `download_url : ${photo.download_url}`;
          photoContainer.appendChild(downloadUrl);

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", function () {
            photoContainer.remove();
          });
          photoContainer.appendChild(deleteButton);

          const likeButton = document.createElement("button");
          likeButton.innerHTML = '<i class="far fa-heart"></i> Like';
          likeButton.addEventListener("click", function () {
            toggleLike(likeButton);
          });
          photoContainer.appendChild(likeButton);

          function toggleLike(likeButton) {
            const heartIcon = likeButton.querySelector("i");
            if (heartIcon.classList.contains("far")) {
              heartIcon.classList.remove("far");
              heartIcon.classList.add("fas");
              heartIcon.style.color = "red";
            } else {
              heartIcon.classList.remove("fas");
              heartIcon.classList.add("far");
              heartIcon.style.color = "gray";
            }
          }

        

          const downloadButton = document.createElement("a");
          downloadButton.innerText = "Download";
          downloadButton.href = photo.download_url; 
          downloadButton.download = `photo-${photo.id}.jpg`; 

          photoContainer.appendChild(downloadButton);

          

          photosContainer.appendChild(photoContainer);
        });
        numPhotosInput.value = "";
      })
      .catch((error) => {
        console.error("Could not fetch images:", error);
      });
  });
});
