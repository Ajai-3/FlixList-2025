import axios from "axios"

 const axiosInstance = axios.create ({
    // method: 'GET',
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTVlZjBhMzkwNmJlNGQxMWZiZjVmNWIxYzBkOWJlOSIsIm5iZiI6MS43NDU1MDI2NDY3NTAwMDAyZSs5LCJzdWIiOiI2ODBhNDFiNjE0MmIwOWNlY2Y4YTQ2YmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.61djaPqegeIz9LA_iRkFnY4UpviRO86P7xPiAHZahg8'
    }
  });

  export default axiosInstance;

