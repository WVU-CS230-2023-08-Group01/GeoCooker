using System;
using System.Net.Http;

namespace GeoCookerAPI
{
    public class GenerateCoords
    {
        private static Random rand = new Random();

        public static double[] GetRandomLandCoordinate()
        {
            string apiKey = "AIzaSyDfWvBqyov4n20fceBDlWg4lDN74-oInqc";
            double latitude, longitude;

            while (true)
            {
                latitude = rand.NextDouble() * 180 - 90; // Range: -90 to 90
                longitude = rand.NextDouble() * 360 - 180; // Range: -180 to 180

                string apiUrl = $"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={apiKey}";

                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = client.GetAsync(apiUrl).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string responseContent = response.Content.ReadAsStringAsync().Result;

                        // Check if the result indicates the location is on land
                        if (responseContent.Contains("country") && !responseContent.Contains("water"))
                        {
                            return new double[] { latitude, longitude };
                        }
                    }
                }
            }
        }
    }
}
