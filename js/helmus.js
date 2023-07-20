const pageTitle = document.title.split(" | ")[1];
if (pageTitle == "Zoek" || pageTitle == "Search") {
    document.querySelector(".Search").classList.add("active");
	document.querySelector(".AtEnd").classList.add("active")
}
parentMenu = document.querySelector(".NavigationBar")
for (var i = 0; i < parentMenu.children.length; i++) {
    if (parentMenu.children[i].innerHTML == pageTitle) {
      	parentMenu.children[i].classList.add("active");
    }
}
parentMenuSmall = document.querySelector(".expandleMenu")
for (var i = 0; i < parentMenuSmall.children.length; i++) {
	if (parentMenuSmall.children[i].innerHTML == pageTitle) {
		parentMenuSmall.children[i].classList.add("active")
	}
}
function ToggleMenu() {
    if (document.documentElement.scrollTop == 0) {
    // User has scrolled to the top
        document.querySelector(".TopBar").classList.remove("atTop")
        document.getElementById("NormalMenu").classList.remove("atTop")
		document.getElementById("SmallMenu").classList.remove("atTop")
        document.querySelector(".RightHandThings").classList.remove("atTop")
        document.querySelector(".LeftHandThings").classList.remove("atTop")
        document.querySelector(".Logo").classList.remove("atTop")
        document.querySelector(".LeftHandThings").classList.remove("atTop")
        document.querySelector(".Logo").classList.remove("atTop")
		document.querySelector(".SloganP").classList.remove("atTop")
		document.querySelector(".Slogan").classList.remove("atTop")
        if (window.innerWidth > 650) {
            if (window.location.href.includes("/english/")) {
              document.querySelector(".Logo").innerHTML = `<img src="../images/Helmus_logo.svg" alt="Logo">`
            } else {
              document.querySelector(".Logo").innerHTML = `<img src="images/Helmus_logo.svg" alt="Logo">`
            }
        }
    } else {
        // User has scrolled downz
        // console.log("no")
        document.querySelector(".TopBar").classList.add("atTop")
        document.getElementById("NormalMenu").classList.add("atTop")
		document.getElementById("SmallMenu").classList.add("atTop")
        document.querySelector(".RightHandThings").classList.add("atTop")
        document.querySelector(".LeftHandThings").classList.add("atTop")
        document.querySelector(".Logo").classList.add("atTop")
        document.querySelector(".SloganP").classList.add("atTop")
        document.querySelector(".Slogan").classList.add("atTop")
        // document.querySelector(".Logo").innerHTML = "<img src='images/logoAnimation.gif'>"
        if (window.location.href.includes("/english/")) {
          document.querySelector(".Logo").innerHTML = `<img style="height: 70px; width: 70px; align-self: flex-start;" src='../images/Helmus_logo_small.svg'>`
        } else {
          document.querySelector(".Logo").innerHTML = `<img style="height: 70px; width: 70px; align-self: flex-start;" src='images/Helmus_logo_small.svg'>`
        }
    }
}

function GoToPage(element) {
    parentElement = element.parentElement;
    for (var i = 0; i < parentElement.children.length; i++) {
        parentElement.children[i].classList.remove("active");
    }
    element.classList.add("active");
    if (element.innerHTML === "Home") {
        window.location.href = "index.html";
    } else {
        window.location.href = element.innerHTML.toLowerCase() + ".html";
    }
}

function Search() {
    if (window.location.href.includes("/english/")) {
        window.location.href = "search.html"
    } else {
        window.location.href = "zoek.html"
    }    
    parentElement = document.querySelector(".NavigationBar")
    for (var i = 0; i < parentElement.children.length; i++) {
        parentElement.children[i].classList.remove("active");
    }
    document.querySelector(".Search").classList.add("active");
}

function SearchBar() {
    document.querySelector(".TopFirst").scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
    
    var searchTerm = document.getElementById('SearchBar').value.toLowerCase();
    if (searchTerm == "") {
        return;
    }
    
    document.querySelector(".SearchSectionParent").innerHTML = '';
    if (window.location.href.includes("/english/")) {
        var pageURLs = [
            window.origin + '/english/index.html',
            window.origin + '/english/services.html',
            window.origin + '/english/employees.html',
            window.origin + '/english/history.html',
            window.origin + '/english/links.html',
            window.origin + '/english/contact.html',
        ]
    } else {
        // Array of page URLs to search
        var pageURLs = [
        //   window.origin + '/',
            window.origin + '/index.html',
            window.origin + '/diensten.html',
            window.origin + '/mensen.html',
            window.origin + '/geschiedenis.html',
            window.origin + '/links.html',
            window.origin + '/contact.html',
            window.origin + '/zoek.html',
            // window.origin+'/english/search.html'
            // Add more page URLs here
        ];
    }
    pageURLs.forEach((url) => {
        fetch(url)
        .then(response => response.text())
        .then(content => {
            var parser = new DOMParser();
            var doc = parser.parseFromString(content, 'text/html');
    
            var elements = doc.body.querySelectorAll('.Main :not(script):not(style):not(meta):not(link)');
			// console.log(elements)
            elements.forEach((element) => {
                if (element.classList.contains === 'vjs-no-js') {
                    return;
                }
				var contentText = element.innerText;
				// console.log(contentText)
				if (contentText.toLowerCase().includes(searchTerm)) {
					var index = contentText.indexOf(searchTerm);
					var contextStartIndex = Math.max(index - 50, 0);
					// Backtrack to the start of the previous word
					while (contextStartIndex > 0 && !/\s/.test(contentText.charAt(contextStartIndex))) {
						contextStartIndex--;
					}
					var contextEndIndex = Math.min(index + 300, contentText.length);
					var contextText = contentText.substring(contextStartIndex, contextEndIndex);
					if (contextText === "" || !contextText.includes(searchTerm)) {
						contextText = searchTerm;
					}
					contextText = highlightTextInLink(contextText, searchTerm, "bold");

					var shortContextText = contentText.substring(index - 7, index + 7 + searchTerm.length);
					if (!shortContextText.includes(searchTerm)) {
						shortContextText = searchTerm;
						// console.log(shortContextText)
					}
					var shortContextTextHighlight = highlightTextInLink(shortContextText, searchTerm, "mark");

					var pageTitle = doc.title.split(" | ")[1];

					// if (SpoelenServiceList.includes(contextTextBeforeHighlight.toLowerCase())) {
					// 	shortContextTextHighlight = highlightTextInLink(contentText, searchTerm, "mark");
					// 	shortContextText = contentText;
					// }
					
					// make a list out of the elements
					var SpoelenServiceList = ["bloembollen spoelen", "bollen spoelen", "struiken spoelen", "planten spoelen", "planten wassen", "spoelen", "schoonmaken", "poetsen", "verwijderen van grond", "verwijderen van zand", "verwijderen van klei", "verwijderen van aarde", "verwijderen van turf", "verwijderen grond", "verwijderen zand", "verwijderen klei", "verwijderen aarde", "verwijderen turf", "planten"]
					var OntsmettenServiceList = ["warmte behandeling", "temperatuur behandeling", "heetstook", "catt", "mijt koken", "nemathode koken", "stengelaal koken", "wortelaal koken", "krokusaaltjes koken", "aphelenchoides koken", "aphelenchoides ritzemabosi koken", "ditylenchus koken", "ditylenchus destructor koken", "aphelenchoides koken", "aphelenchoides subtenuis koken", "ditylenchus koken", "ditylenchus dipsaci koken", "pratylenchus koken", "pratylenchus penetrans koken", "dompelen", "warm water", "heet water", "desinfecteren"]

					if (SpoelenServiceList.includes(contentText.toLowerCase())) {
						// console.log("spoelen")
						shortContextTextHighlight = "SpoelenTitle";
						shortContextText = "Spoelen";
					} else if (OntsmettenServiceList.includes(contentText.toLowerCase())) {
						// console.log("ontsmetten")
						shortContextTextHighlight = "OntsmettenTitle";
						shortContextText = "Ontsmetten";
					}
					console.log(shortContextText)
					var sectionContent = `<section class="SearchItem"><h3><a href="${url}?search=${shortContextTextHighlight}&normal=${shortContextText}">${pageTitle}</a></h3><p>${contextText}</p></section>`;
					// console.log(sectionContent);
					if (!document.querySelector(".SearchSectionParent").innerHTML.includes(sectionContent.replace("&", "&amp;"))) {
						document.querySelector(".SearchSectionParent").innerHTML += sectionContent;
					}
				}

            });
        })
        .catch(error => {
            console.error(`Error fetching ${url}`, error);
        });
    });
}

  
// Function to highlight the search term in a link
function highlightTextInLink(text, searchTerm, type) {
	// Use a regular expression with the 'i' flag to perform a case-insensitive search for the first occurrence
	var regex = new RegExp(searchTerm, 'i');
	// Use the replace() method with a callback function
	if (text == "full" && type == "mark") {
		var highlightedText = "<mark>" + searchTerm + "</mark>";
	} else if (type == "bold") {
		var highlightedText = text.replace(regex, function(match) {
			// Wrap only the first occurrence of the search term with a <mark> element for highlighting
			return '<b>' + match + '</b>';
		});
	} else if (type == "mark") {
			
		var highlightedText = text.replace(regex, function(match) {
			// Wrap only the first occurrence of the search term with a <mark> element for highlighting
			return '<mark>' + match + '</mark>';
		});
	}
	return highlightedText;
}
  
  

if (window.location.href.includes("zoek.html") || window.location.href.includes("search.html")) {
    document.getElementById('SearchBar').focus()
    SearchBar()
}

if (window.location.href.includes("form")) {
    // Assuming the URL is stored in the 'url' variable
    urlParams = new URLSearchParams(window.location.search);
    parameterName = 'option'; // Replace 'param' with the parameter you want to check

    if (urlParams.has(parameterName)) {
        // The URL contains the specified parameter
        parameterValue = urlParams.get(parameterName);
        // console.log(`The value of '${parameterName}' is '${parameterValue}'.`);
        document.getElementById("SelectReason").value = parameterValue
    } else {
        ;
    }

}
// Assuming you have already retrieved the 'search' and 'normal' parameters from the URL
// dom content loaded
function Resize() {
	parentElement = document.querySelector(".NavigationElements")
	normal = document.getElementById("NormalMenu")
	minimized = document.getElementById("SmallMenu")
    if (window.innerWidth < 860) {
        normal.style.display = "none"
        minimized.style.display = ""
    } else {
        normal.style.display = ""
        minimized.style.display = "none"
    }
	if (window.innerWidth < 900) {
		try {
			document.getElementById("my-video").classList.add("vjs-fill")
		} catch {
			;
		}
	} else {
		try {
			document.getElementById("my-video").classList.remove("vjs-fill")
		} catch {
			;
		}
	}
    if (window.innerWidth >= 650 && document.documentElement.scrollTop == 0) {
		if (window.location.href.includes("/english/")) {
			document.querySelector(".Logo").innerHTML = `<img src="../images/Helmus_logo.svg" alt="Logo">`
		} else {
			document.querySelector(".Logo").innerHTML = `<img src="images/Helmus_logo.svg" alt="Logo">`
		}
    } else {
		if (window.location.href.includes("/english/")) {
			document.querySelector(".Logo").innerHTML = `<img style="height: 70px; width: 70px; align-self: flex-start;" src='../images/Helmus_logo_small.svg'>`
		} else {
			document.querySelector(".Logo").innerHTML = `<img style="height: 70px; width: 70px; align-self: flex-start;" src='images/Helmus_logo_small.svg'>`
		  }
    }
	ToggleMenu()
}

window.addEventListener("scroll", function() {
    ToggleMenu()
	if (document.documentElement.scrollTop == 0) {
		document.querySelector(".Main").style.marginTop = "242px"
	} else {
		document.querySelector(".Main").style.marginTop = "139px"
	}
});
window.addEventListener("resize", function() {
	Resize()
});
window.onload = function() {
	Resize()
	if (window.location.href.includes("zoek.html") || window.location.href.includes("search.html")) {
		document.getElementById('SearchBar').focus()
		SearchBar()
	}
	
};
window.addEventListener('load', function() {
	if (window.location.href) {
		urlParams = new URLSearchParams(window.location.search);
		parameterName = 'search'; // Replace 'param' with the parameter you want to check
		if (urlParams.has(parameterName) && urlParams.has("normal")) {
			search = urlParams.get(parameterName);
			normal = urlParams.get("normal");
			const mainElement = document.querySelector('.Main');
			if (mainElement) {
				allElementsInsideMain = mainElement.querySelectorAll('*');
				allElementsInsideMain.forEach(element => {
					if (['SPAN', 'A', 'P', 'H2', 'H3'].includes(element.tagName)) {
						if (element.textContent.includes(normal)) {
							// console.log(search)
							// console.log(search)
							if (search == "SpoelenTitle") {
								element = this.document.getElementById("Spoelen")
								search = "<mark>Spoelen</mark>"
							} else if (search == "OntsmettenTitle") {
								element = this.document.getElementById("Ontsmetten")
								search = "<mark>Ontsmetten</mark>"
							}
							NewInner = element.innerHTML.replace(normal, search)
							element.innerHTML = NewInner
							// for (var i = 1; i = 0; i++) {
							// 	markElement = document.querySelector('mark');
							// 	if (markElement !== null) {
							// 		console.log(markElement)
							// 		console.log("not a mark")
							// 		break
							// 	}
							// }
							markElement = document.querySelector('mark');
							// console.log(markElement)
							markElement.scrollIntoView({
								behavior: "smooth",
								block: "center"
							})
							// window.scrollBy(0, -this.document.querySelector(".TopBar").offsetHeight);
						}
					}
				});
			}
		}
	}
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-43334702-1', 'helmus.nl');
    ga('send', 'pageview');