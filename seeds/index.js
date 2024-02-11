import Campground from "../models/campground.js";
import { cities } from "./cities.js";

export const seedDB = async () => {
  try {
    await Campground.deleteMany({});

    for (let i = 0; i < 9; i++) {
      const price = Math.floor(Math.random() * 20) + 10;

      const newCampground = new Campground({
        author: "65a6aa5403f12820672c9218",
        location: `${cities[i].city},${cities[i].state}`,
        title: `${cities[i].title}`,
        images: [
          {
            url: `${cities[i].url}`,
            filename: "",
          },
        ],
        geometry: {
          type: "Point",
          coordinates: [cities[i].longitude, cities[i].latitude],
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
