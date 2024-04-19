const planetsData = [
  {
    name: "Mercury",
    color: "gray",
    semiMajorAxis: 0.39, // In AU
    eccentricity: 0.205,
    orbitalPeriod: 0.24, // In Earth years
    radius: 0.383, // Scaled for visualization
  },
  {
    name: "Venus",
    color: "hotpink",
    semiMajorAxis: 0.72,
    eccentricity: 0.007,
    orbitalPeriod: 0.62,
    radius: 0.949,
  },
  {
    name: "Earth",
    color: "blue",
    semiMajorAxis: 1,
    eccentricity: 0.017,
    orbitalPeriod: 1,
    radius: 1, // Earth's radius as the baseline for scale
  },
  {
    name: "Mars",
    color: "red",
    semiMajorAxis: 1.52,
    eccentricity: 0.093,
    orbitalPeriod: 1.88,
    radius: 0.532,
  },
  {
    name: "Jupiter",
    color: "orange",
    semiMajorAxis: 5.20,
    eccentricity: 0.049,
    orbitalPeriod: 11.86,
    radius: 11.21, 
  },
  {
    name: "Saturn",
    color: "goldenrod",
    semiMajorAxis: 9.58,
    eccentricity: 0.056,
    orbitalPeriod: 29.46,
    radius: 9.45,
  },
  {
    name: "Uranus",
    color: "lightblue",
    semiMajorAxis: 19.22,
    eccentricity: 0.046,
    orbitalPeriod: 84.01,
    radius: 4.01,
  },
  {
    name: "Neptune",
    color: "darkblue",
    semiMajorAxis: 30.05,
    eccentricity: 0.010,
    orbitalPeriod: 164.8,
    radius: 3.88,
  },
];

export default planetsData;
