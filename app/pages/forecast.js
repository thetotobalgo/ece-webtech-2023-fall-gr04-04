import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';

const Forecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const lat = 58.7984;
    const lng = 17.8081;
    const params = 'waveHeight';

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
                    headers: {
                        'Authorization': 'dae01eb6-9224-11ee-950b-0242ac130002-dae01f38-9224-11ee-950b-0242ac130002'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setForecastData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, []);

    if (loading) return (

        <Layout>
            <div>
                <h2>Loading</h2>
            </div>
        </Layout>

    );
    if (error) return (

        <Layout>
            <div>
                <h2>Error fetching data</h2>
            </div>
        </Layout>

    );

    const tableContainerStyle = {
        overflowY: 'scroll',
        maxHeight: '75vh',
        width: '100%'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thTdStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left'
    };

    return (
        <Layout
            title="use of an api"
            description="Api that fetches forecast"
        >

            <div>
                <h2>Wave Forecast</h2>
                <div style={tableContainerStyle}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thTdStyle}>Time</th>
                                <th style={thTdStyle}>Wave Height (meters)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecastData && forecastData.hours && forecastData.hours.map((hour, index) => (
                                <tr key={index}>
                                    <td style={thTdStyle}>{new Date(hour.time).toLocaleTimeString()}</td>
                                    <td style={thTdStyle}>
                                        {hour.waveHeight && hour.waveHeight.noaa ? hour.waveHeight.noaa : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Forecast;
