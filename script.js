(async function() {
	// On mousedown handler
	var createShortUrl = async function(e) {
	  e.preventDefault();
	  var url = this.value.trim();
	  if (this.validity?.valid && url !== "") {
		var isgdUrl =
		  `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`;
  
		try {
		  // Fetch JSON request with cors mode
		  var response = await fetch(isgdUrl, {mode: 'cors'});
		  var data = await response.json();
  
		  // Copy text to clipboard
		  await navigator.clipboard.writeText(data.shorturl);
		  outputEl.innerHTML =
			`<span>ShortURL <strong>${data.shorturl}</strong> copied to clipboard.</span>`;
		} catch (error) {
		  console.error(error);
		  outputEl.innerHTML =
			`<span class='error'>Something went wrong. Please try again later.</span>`;
		}
	  } else {
		outputEl.innerHTML =
		  `<span class='error'>Please enter a valid URL incl. http(s)://</span>`;
	  }
	};
  
	var inputEl = document.querySelector("input#url"),
	  buttonEl = document.querySelector("button#action"),
	  outputEl = document.querySelector("#output");
  
	buttonEl.addEventListener("mousedown", createShortUrl.bind(inputEl), {
	  once: false
	});
	inputEl.addEventListener(
	  "focus",
	  function() {
		outputEl.innerHTML = "";
	  },
	  false
	);
  })();