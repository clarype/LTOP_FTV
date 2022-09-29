//######################################################################################################## 
//#                                                                                                    #\\
//#                                   LandTrendr Optimization Paramater File                           #\\
//#                                                                                                    #\\
//########################################################################################################
// !!Make sure the parameter 'assetsChild' is a real location!! 
exports = {
  version:'0.0.1',                  // version number  
  place:'Cambodia',     // description string in file name
  startYear:1990,                   // time series start year 
  endYear:2021,                     // time series end year   
  seedSpacing:10,                   // SNIC seed spacing between seed pixels  
  randomPts:5000,                   // the number of random sample points // 20000 
  imageSource:'servir',             // image source discription string that is added the file name
  assetsRoot:'users/ak_glaciers/',      // had to change this to my account 
  assetsChild:'Cambodia_troubleshooting_tc',          // this is updated from 01,02,03 to 04
  aoi:ee.FeatureCollection("USDOS/LSIB/2017").filter(ee.Filter.eq('COUNTRY_NA','Cambodia')).geometry(), // aoi location 
  maxClusters:5000,                 // max number of clusters 
  minClusters:5000,                 // min number of clusters
  
  //this has to be uploaded from a local directory and changed -- Peter >> these are hard coded for training, but would be change in the full workflow 
  abstract_image_pts:ee.FeatureCollection('users/ak_glaciers/Cambodia_troubleshooting_tc/abstract_image_ids_revised_ids_tc'),
  selectedLTparams:ee.FeatureCollection('users/ak_glaciers/Cambodia_troubleshooting_tc/LTOP_Cambodia_troubleshooting_selected_LT_params_tc'),
  
  //only needed for medoid composites
  //image_source:'medoid',
  startDate:'11-20',                // inter annual composite window start date
  endDate:'03-10',                  // inter annual composite window end date
  masked:['cloud', 'shadow']        // composite masking items 

}; 