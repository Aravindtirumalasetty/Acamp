import Campground from "../models/campground.js";
import { cities } from "./cities.js";
import { descriptors, places } from "./seedHelpers.js";

const sample = (array) => array[Math.floor(Math.random() * array.length)];
export const seedDB = async () => {
  try {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;

      const newCampground = new Campground({
        author: "65a6aa5403f12820672c9218",
        location: `${cities[random1000].city},${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        images: [
          {
            url: "https://res.cloudinary.com/dfyyarbvp/image/upload/v1705842349/ACamp/is2txkuqnsr0levrkvqr.png",
            filename: "ACamp/is2txkuqnsr0levrkvqr",
          },
          {
            url: "https://res.cloudinary.com/dfyyarbvp/image/upload/v1705842370/ACamp/qhfji1xmolnjp1snqpkq.png",
            filename: "ACamp/qhfji1xmolnjp1snqpkq",
          },
        ],
        geometry: {
          type: "Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ],
        },
        description:
          "In this corrected version, I've replaced res.redirect with res.render, assuming that you want to render the view with the campground data. If your intention is to redirect the user to an edit page, you should use res.redirect like this",
        price,
      });

      await newCampground.save({ wtimeout: 60000 });
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
};
