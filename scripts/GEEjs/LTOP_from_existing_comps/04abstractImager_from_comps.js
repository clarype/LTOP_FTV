//######################################################################################################## 
//#                                                                                                    #\\
//#                                         LANDTRENDR LIBRARY                                         #\\
//#                                                                                                    #\\
//########################################################################################################


// date: 2020-12-10
// author: Peter Clary        | clarype@oregonstate.edu
//         Robert Kennedy     | rkennedy@coas.oregonstate.edu
//         Ben Roberts-Pierel | robertsb@oregonstate.edu
// website: https://github.com/eMapR/LT-GEE


// Landtrendr test module
var ltgee = require('users/emaprlab/broberts:lt_collection_2/LandTrendr.js'); 

// Load in the Abstract image collection. This is made from tiff_v7
var images = ee.ImageCollection("users/ak_glaciers/abstract_images/laos_abstract_images_ic");

// Import a ID layer
var id_points = ee.FeatureCollection('users/ak_glaciers/abstract_images/abstract_image_ids');

// Rename the bands (can't upload with names as far as I can tell)
images = images.select(['b1','b2','b3','b4','b5'],['NBR', 'NDVI', 'TCG', 'TCW', 'B5']);

var indexname = "TCW"

// Add a time stamp to each image
images = images.map(add_time_stamp);

// Mask the "no-data" values
images = images.map(mask_no_data_values);

// Display the images
Map.addLayer(images,  {min:[0,-500,0], max:[1000,1000,1500]}, 'Abstract Collection');
Map.addLayer(id_points, {}, 'ID Points');
Map.centerObject(images, 16);

// Add a time stamp based on the system:id property
function add_time_stamp (image) {
  
  // Get the year from the system:id property
  var year = ee.Number.parse(ee.String(image.get('system:id')).slice(-4)).toInt16();
  
  // Create a date object
  var date = ee.Date.fromYMD(year, 8, 1).millis();
  
  return image.set('system:time_start', date);
  
}

// Update the mask to remove the no-data values so they don't mess
// up running LandTrendr -- assumes the no-data value is -32768
function mask_no_data_values (img) {
  
  // Create the mask
  var img_mask = img.neq(-32768);
  
  return img.updateMask(img_mask);
  
}

// LandTrendr Parameters 
///////////////////////////////////////////////////////////
var runParams = [{timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 6 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 6 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 8 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 8 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 10 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 10 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.75, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 0.9, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.25, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.5, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 0.9, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.05, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.1, bestModelProportion: 0.75, minObservationsNeeded: 11 }, {timeSeries: ee.ImageCollection([]), maxSegments: 11 , spikeThreshold: 1.0, vertexCountOvershoot: 3, preventOneYearRecovery: true, recoveryThreshold: 1.0, pvalThreshold: 0.15, bestModelProportion: 0.75, minObservationsNeeded: 11 }]

/////////////////////////////////////////////////////////


var getPoint2 = function(geom,img, z) {
  
  return img.reduceRegions({collection: geom, reducer: 'first',  scale: z })//.getInfo();

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// here we map over each LandTrendr parameter varation, applying each varation to the abstract image 
var printer = runParams.map(function(param){

  // this statment finds the index of the parameter varation being used 
  var index = runParams.indexOf(param) 
  
  // here we select the indice image on which to run LandTrendr 
  runParams[index].timeSeries = images.select([indexname]);
    
  // run LandTrendr 
  var lt = ee.Algorithms.TemporalSegmentation.LandTrendr(runParams[index])
  
  //select the segmenation data from LandTrendr
  var ltlt = lt.select(['LandTrendr']);
  
  // slice the LandTrendr data into sub arrays
  var yearArray = ltlt.arraySlice(0,0,1).rename(['year']);
  var sourceArray = ltlt.arraySlice(0,1,2).rename(['orig']);
  var fittedArray = ltlt.arraySlice(0,2,3).rename(['fitted']);
  var vertexMask = ltlt.arraySlice(0, 3, 4).rename(['vert']); 
  var rmse = lt.select(['rmse']);

  // place each array into a image stack one array per band 
  var lt_images = yearArray.addBands(sourceArray)
                           .addBands(fittedArray)
                           .addBands(vertexMask)
                           .addBands(rmse)

  // extract a LandTrendr pixel times a point
  var getpin2 = getPoint2(id_points,lt_images,20); // add scale 30 some points (cluster_id 1800 for example) do not extract lt data. I compared the before change output with the after the chagne output and the data that was in both datasets matched. compared 1700 to 1700 ...  
  
  // maps over a feature collection that holds the LandTrendr data and adds attributes : index, params and param number.
  var attriIndexToData = getpin2.map(function(feature){
    
    return feature.set('index', indexname)
                  .set('params',runParams[index])
                  .set('param_num', index);
    
  })

  return attriIndexToData

})

// empty variable to a merged feature collection
var featCol;

// loop over each feature collection and merges them into one
for(var i in printer ){
  if(i == 0){
    featCol = printer[0];
    }else if (i>0){
      featCol = featCol.merge(printer[i]);
    }
}

Map.addLayer(featCol,{},'featCol')

Export.table.toDrive({
  collection: featCol,
  description: "LTOP_Laos_abstractImageSample_5000pts_lt_144params_"+indexname+"_v2_comps",
  folder: "LTOP_Laos_abstractImageSamples_5000pts_v2_comps",
  fileFormat: 'CSV'
});




