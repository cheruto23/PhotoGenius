document.addEventListener("DOMContentLoaded", function () {
    // Get elements from htnl
    const form = document.getElementById("submit");
    const numPhotosInput = document.getElementById("numPhotos");
    const photosContainer = document.querySelector(".photos");
  
    // Adding event listener to form 
    form.addEventListener("submit", function (event) {
        //Prventing default behaviour of the form
      event.preventDefault();
  
      // Getting number of photos requested
      const numPhotos = numPhotosInput.value;
  
      if (!numPhotos) {
        // Display an alert if number of photos is empty
        alert("Please enter the number of images you want to view.");
        return;
      }
  
      // Fetch photos from the API
      fetch(`https://picsum.photos/v2/list?page=1&limit=${numPhotos}`)
        .then((res) => res.json())
        .then((data) => {
          // Clear the photos container
          photosContainer.innerHTML = "";
  
          // Iterate through each data of the photo
          data.forEach((photo) => {
            // Create an image element
            const img = document.createElement("img");
            img.src = photo.download_url;
            img.alt = "Placeholder Image";
  
            // Create a container for the photo and append it
            const photoContainer = document.createElement("div");
            photoContainer.appendChild(img);
  
            // Display ID of the photo and appends it
            const id = document.createElement("p");
            id.textContent = `ID: ${photo.id}`;
            photoContainer.appendChild(id);

            //Displays author of the photo and appends it
            const author = document.createElement("p");
            author.textContent = `Author: ${photo.author}`;
            photoContainer.appendChild(author);

            //displays url of the photo and appends it
            const url = document.createElement("p");
            url.textContent = `URL: ${photo.url}`;
            photoContainer.appendChild(url);
            
            //displays download url of the photo and appends it
            const downloadUrl = document.createElement("p");
            downloadUrl.textContent = `Download URL: ${photo.download_url}`;
            photoContainer.appendChild(downloadUrl);
  
            // Creating button and adding event listeners
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
              // Remove photo when the delete button is clicked
              photoContainer.remove();
            });
            //Append the changes
            photoContainer.appendChild(deleteButton);
  
            const likeButton = document.createElement("button");
            likeButton.innerHTML = '<i class="far fa-heart"></i> Like';
            likeButton.addEventListener("click", function () {
              // Adding  functionality to the like button
              toggleLike(likeButton);
            });
            photoContainer.appendChild(likeButton);
  
            // Function to toggle like button
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
  
            // Create a download button
            const downloadButton = document.createElement("a");
            downloadButton.innerText = "Download";
            downloadButton.href = photo.download_url; 
            downloadButton.download = `photo-${photo.id}.jpg`; 
  
            // Append elements
            photoContainer.appendChild(downloadButton);
            photosContainer.appendChild(photoContainer);
          });
  
          // Clear the input field after pressing search button
          numPhotosInput.value = "";
        })
        .catch((error) => {
          // Handle any errors when fetching images
          console.error("Could not fetch images:", error);
        });
    });
  });
  
