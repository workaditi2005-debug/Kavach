document.addEventListener('DOMContentLoaded', () => {
    // --- Map Initialization (Leaflet) ---
    const map = L.map('map').setView([28.3949, 84.1240], 7); // Centered roughly on Nepal

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let selectedMarker = null;
    let selectedLat = 28.3949; // Default to Nepal center
    let selectedLon = 84.1240;

    map.on('click', (e) => {
        if (selectedMarker) {
            map.removeLayer(selectedMarker);
        }
        selectedLat = e.latlng.lat;
        selectedLon = e.latlng.lng;
        selectedMarker = L.marker([selectedLat, selectedLon]).addTo(map)
            .bindPopup(`Selected: Lat ${selectedLat.toFixed(4)}, Lon ${selectedLon.toFixed(4)}`)
            .openPopup();
        document.getElementById('selected-coords').innerText = `Lat: ${selectedLat.toFixed(4)}, Lon: ${selectedLon.toFixed(4)}`;
        // Automatically run simulation for the new location
        runSimulation();
    });

    // Dummy risk zones (circles, similar to your image)
    const riskZones = [
        L.circle([27.7172, 85.3240], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 15000 }).addTo(map),
        L.circle([28.2096, 83.9856], { color: 'orange', fillColor: '#fd8d3c', fillOpacity: 0.5, radius: 10000 }).addTo(map),
        L.circle([27.5, 86.5], { color: 'green', fillColor: '#48bb78', fillOpacity: 0.5, radius: 8000 }).addTo(map)
    ];

    document.getElementById('landslide-layer-toggle').addEventListener('change', (e) => {
        riskZones.forEach(zone => {
            if (e.target.checked) {
                map.addLayer(zone);
            } else {
                map.removeLayer(zone);
            }
        });
    });

    // --- Chart.js Initialization ---
    const hazardDistributionCtx = document.getElementById('hazardDistributionChart').getContext('2d');
    const hazardDistributionChart = new Chart(hazardDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Landslide', 'Flood'],
            datasets: [{
                data: [60, 40], // Dummy data
                backgroundColor: ['#f56565', '#4299e1'], // Red and Blue
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cbd5e0'
                    }
                }
            }
        }
    });

    const riskProgressionCtx = document.getElementById('riskProgressionChart').getContext('2d');
    const riskProgressionChart = new Chart(riskProgressionCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Risk Level',
                    data: [25, 30, 45, 60, 50, 75, 65], // Dummy risk data
                    borderColor: '#f56565', // Red
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'Rainfall',
                    data: [10, 20, 30, 50, 40, 60, 55], // Dummy rainfall data
                    borderColor: '#4299e1', // Blue
                    tension: 0.3,
                    fill: false,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#cbd5e0'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#cbd5e0'
                    },
                    grid: {
                        color: '#4a5568'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#cbd5e0'
                    },
                    grid: {
                        color: '#4a5568'
                    }
                },
                y1: { // Secondary Y axis for rainfall
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        drawOnChartArea: false, // Only draw grid lines for the primary Y axis
                        color: '#4a5568'
                    },
                    ticks: {
                        color: '#cbd5e0'
                    }
                }
            }
        }
    });

    // --- Slider and Simulation Logic ---
    const rainfallIntensitySlider = document.getElementById('rainfall-intensity');
    const rainfallValueSpan = document.getElementById('rainfall-value');
    const durationHoursSlider = document.getElementById('duration-hours');
    const durationValueSpan = document.getElementById('duration-value');
    const soilMoistureSlider = document.getElementById('soil-moisture');
    const soilMoistureValueSpan = document.getElementById('soil-moisture-value');
    const slopeAngleSlider = document.getElementById('slope-angle');
    const slopeAngleValueSpan = document.getElementById('slope-angle-value');
    const startSimulationBtn = document.getElementById('start-simulation-btn');

    rainfallIntensitySlider.addEventListener('input', () => {
        rainfallValueSpan.innerText = rainfallIntensitySlider.value;
    });
    durationHoursSlider.addEventListener('input', () => {
        durationValueSpan.innerText = durationHoursSlider.value;
    });
    soilMoistureSlider.addEventListener('input', () => {
        soilMoistureValueSpan.innerText = soilMoistureSlider.value;
    });
    slopeAngleSlider.addEventListener('input', () => {
        slopeAngleValueSpan.innerText = slopeAngleSlider.value;
    });

    document.querySelectorAll('.scenario-buttons button').forEach(button => {
        button.addEventListener('click', (e) => {
            rainfallIntensitySlider.value = e.target.dataset.intensity;
            rainfallValueSpan.innerText = e.target.dataset.intensity;
            durationHoursSlider.value = e.target.dataset.duration;
            durationValueSpan.innerText = e.target.dataset.duration;
            runSimulation();
        });
    });

    startSimulationBtn.addEventListener('click', runSimulation);

    async function runSimulation() {
        const simulationData = {
            lat: selectedLat,
            lon: selectedLon,
            rainfall_intensity: parseFloat(rainfallIntensitySlider.value),
            duration_hours: parseInt(durationHoursSlider.value),
            soil_moisture: parseFloat(soilMoistureSlider.value),
            slope_angle: parseFloat(slopeAngleSlider.value)
        };

        try {
            const response = await fetch('/simulate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(simulationData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Simulation Result:", result);

            // Update UI with results
            const landslideRisk = result.results.landslide_risk;
            const floodRisk = result.results.flood_risk;
            const alertLevel = result.results.alert_level;
            const recommendation = result.results.recommendation;

            // Update hazard distribution chart
            hazardDistributionChart.data.datasets[0].data = [landslideRisk, floodRisk];
            hazardDistributionChart.update();

            // Example: Update a dummy early warning alert
            const earlyWarningCard = document.querySelector('.early-warning-card');
            earlyWarningCard.style.backgroundColor = alertLevel === 'RED' ? '#f56565' : alertLevel === 'YELLOW' ? '#f6ad55' : '#48bb78';
            earlyWarningCard.querySelector('p').innerHTML = `<strong>${alertLevel} Alert:</strong> ${recommendation}`;
        } catch (error) {
            console.error('Error during simulation:', error);
            alert('Failed to run simulation. Check console for details.');
        }
    }

    // Initial simulation run on load
    runSimulation();
});