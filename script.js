const data_url = "https://api.mapbox.com/datasets/V1/clrsd9ozp00nh1oo4bf0im07f/features?";

//hover and click functions for displayingvolcano name and aditional information
let currentPopup;
let clickedFeatureId;

map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['volcanos']
    });

    if (features.length > 0) {
        const feature = features[0];
        clickedFeatureId = feature.id;

        const infopopup = new mapboxgl.Popup({ offset: [0, -15], className: "infopopup" })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                `<h3>Name: ${feature.properties.Name}</h3>
                <p>Type: ${feature.properties.Type}</p>
                <p>Elevation (m): ${feature.properties.Elevation}</p>`
            )
            .addTo(map);
    }
});

map.on('mousemove', (event) => {
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['volcanos']
    });

    if (features.length > 0) {
        const feature = features[0];

        // Show the popup only if it's a different feature than the clicked one
        if (feature.id !== clickedFeatureId) {
            const namepopup = new mapboxgl.Popup({ offset: [0, -15], className: "my-name" })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`<h3>${feature.properties.Name}</h3>`)
                .addTo(map);

            // Remove the previous popup, if any
            if (window.currentPopup) {
                window.currentPopup.remove();
            }

            window.currentPopup = namepopup;
        }
    } else {
        map.getCanvas().style.cursor = "";

        // Check if there is a popup, and if so, remove it
        if (window.currentPopup) {
            window.currentPopup.remove();
        }
    }
});
 
//Full Screne button
if(document.fullscreenEnabled || document.webkitFullscreenEnabled) {
	const toggleBtn = document.querySelector('.js-toggle-fullscreen-btn');

	const styleEl = document.createElement('link');
	styleEl.setAttribute('rel', 'stylesheet');
	styleEl.setAttribute('href', 'https://codepen.io/tiggr/pen/poJoLyW.css');
	styleEl.addEventListener('load', function() {
		toggleBtn.hidden = false;
	});
	document.head.appendChild(styleEl);
	
	toggleBtn.addEventListener('click', function() {
		if(document.fullscreen) {
			document.exitFullscreen();
		} else if(document.webkitFullscreenElement) {
			document.webkitCancelFullScreen()
		} else if(document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else {
			document.documentElement.webkitRequestFullScreen();
		}
	});
	
	document.addEventListener('fullscreenchange', handleFullscreen);
	document.addEventListener('webkitfullscreenchange', handleFullscreen);
	
	
	function handleFullscreen() {
		if(document.fullscreen || document.webkitFullscreenElement) {
			toggleBtn.classList.add('on');
			toggleBtn.setAttribute('aria-label', 'Exit fullscreen mode');
		} else {
			toggleBtn.classList.remove('on');
			toggleBtn.setAttribute('aria-label', 'Enter fullscreen mode');
		}
	}
}