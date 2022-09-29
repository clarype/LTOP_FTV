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
  randomPts:20000,                   // the number of random sample points // 20000 
  imageSource:'servir',             // image source discription string that is added the file name
  assetsRoot:'users/clarype/',      // had to change this to my account 
  assetsChild:'LTOP/kmeans_testing',          // this is updated from 01,02,03 to 04
  aoi:ee.FeatureCollection("USDOS/LSIB/2017").filter(ee.Filter.eq('COUNTRY_NA','Cambodia')).geometry(), // aoi location 
  maxClusters:2500,                 // max number of clusters 
  minClusters:2500,                 // min number of clusters
  
  //this has to be uploaded from a local directory and changed -- Peter >> these are hard coded for training, but would be change in the full workflow 
  abstract_image_pts:ee.FeatureCollection('users/ak_glaciers/servir_comps_revised_workflow/abstract_image_ids_revised_ids'),
  selectedLTparams:ee.FeatureCollection('users/ak_glaciers/servir_comps_revised_workflow/LTOP_servir_comps_revised_kmeans_pts_config_selected_for_GEE_upload_new_weights_gee_implementation'),
  
  //only needed for medoid composites
  //image_source:'medoid',
  startDate:'11-20',                // inter annual composite window start date
  endDate:'03-10',                  // inter annual composite window end date
  masked:['cloud', 'shadow']        // composite masking items 

}; 