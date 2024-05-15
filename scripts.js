// Get the modal
var modal = document.getElementById("myModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
    modal.classList.add("show");
}

function testInternet(src) {
    return new Promise(function(resolve, reject) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Set a timeout to reject the promise if the URL doesn't load within 10 seconds
        var timeoutId = setTimeout(function() {
            document.body.removeChild(iframe); // Remove the iframe
            reject(new Error('The page took too long to load.'));
        }, 10000);

        // When the iframe finishes loading, clear the timeout and resolve the promise
        iframe.onload = function() {
            clearTimeout(timeoutId);
            document.body.removeChild(iframe); // Remove the iframe
            resolve(true);
        };

        // Start loading the URL in the iframe
        iframe.src = src;
    });
}

document.getElementById('urlSelector').addEventListener('change', function() {
    var iframe = document.getElementById('iframe');
    var src = this.value;
    iframe.src = "loading.html";
    testInternet(src)
    .then(function(loadable) {
        iframe.src = src; // Load the URL in the iframe
    })
    .catch(function(error) {
        openModal()
    });
});

document.getElementById('iframe').onload = function() {
    var iframe = document.getElementById('iframe');
    var src = 'https://pl.kotl.in/CwaHuIT1D?theme=darcula';
    testInternet(src)
        .then(function(loadable) {
            iframe.src = src; // Load the URL in the iframe
        })
        .catch(function(error) {
            openModal()
        });
};
