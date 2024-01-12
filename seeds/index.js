import Campground from "../models/campground.js";
import { cities } from "./cities.js";
import { descriptors, places } from "./seedHelpers.js";

const sample = (array) => array[Math.floor(Math.random() * array.length)];
export const seedDB = async () => {
  try {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);

      const newCampground = new Campground({
        location: `${cities[random1000].city},${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
      });

      await newCampground.save({ wtimeout: 60000 });
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
};
