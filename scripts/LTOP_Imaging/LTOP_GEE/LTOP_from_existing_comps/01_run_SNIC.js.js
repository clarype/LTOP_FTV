//######################################################################################################## 
//#                                                                                                    #\\
//#                              Step 1 LandTrendr Optimization workflow                               #\\
//#                                                                                                    #\\
//########################################################################################################

// date: 2022-09-02  
// author: Peter Clary        | clarype@oregonstate.edu
//         Robert Kennedy     | rkennedy@coas.oregonstate.edu
//         Ben Roberts-Pierel | robertsb@oregonstate.edu
// website: https://github.com/eMapR/LT-GEE

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Import modules /////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

var ltgee = require('users/ak_glaciers/adpc_servir_LTOP:modules/LandTrendr.js'); 
var ltop = require('users/clarype/LTOPlus:LTOP_modules.js'); 
var params = require('users/clarype/LTOPlus:modules/params.js'); // change to your param.js file

print('You are currently running version: ',params.version,' of the LTOP workflow'); 


/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// Composites /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
var annualSRcollection; 

if (params.image_source == 'medoid'){

  var imageEnd = ltgee.buildSRcollection(2021, 2021, params.startDate, params.endDate, params.aoi, params.masked).mosaic(); 
  var imageMid = ltgee.buildSRcollection(2005, 2005, params.startDate, params.endDate, params.aoi, params.masked).mosaic();
  var imageStart = ltgee.buildSRcollection(1990, 1990, params.startDate, params.endDate, params.aoi, params.smasked).mosaic();

//get servir (or other) image composites   
}else if (params.image_source != 'medoid'){
  
  var comps = ltop.buildSERVIRcompsIC(params.startYear,params.endYear); 
  var tc = ltgee.transformSRcollection(comps, ['tcb','tcg','tcw'])
  
  //now make an image out of a start, mid and end point of the time series 
  var image21 = tc.filter(ee.Filter.eq('system:index','2021')).first();
  var image18 = tc.filter(ee.Filter.eq('system:index','2018')).first();
  var image14 = tc.filter(ee.Filter.eq('system:index','2014')).first();
  var image10 = tc.filter(ee.Filter.eq('system:index','2010')).first();
  var image06 = tc.filter(ee.Filter.eq('system:index','2006')).first();
  var image02 = tc.filter(ee.Filter.eq('system:index','2002')).first();
  var image98 = tc.filter(ee.Filter.eq('system:index','1998')).first();
  var image94 = tc.filter(ee.Filter.eq('system:index','1994')).first();
  var image90 = tc.filter(ee.Filter.eq('system:index','1990')).first();

}

var LandsatComposites = image90.addBands(image94).addBands(image98).addBands(image02).addBands(image06).addBands(image10).addBands(image14).addBands(image18).addBands(image21); 

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Call the functions /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. run the snic algorithm 
var snic_output01 = ltop.snic01(LandsatComposites,params.aoi,params.randomPts,params.seedSpacing); 
Map.centerObject(params.aoi, 10)
// testing -- need to cast computed object to image or featue
Map.addLayer(ee.Image(snic_output01.get(1)))
Map.addLayer(ee.FeatureCollection(snic_output01.get(0)))
print(ee.FeatureCollection(snic_output01.get(0)).first())
Export.table.toAsset({
              collection: snic_output01.get(0), 
              description:"LTOP_SNIC_pts_"+params.place+"_c2_"+params.randomPts.toString()+"_pts_"+params.startYear.toString(), 
              assetId:params.assetsChild+"/LTOP_SNIC_pts_"+params.place+"_c2_"+params.randomPts.toString()+"_pts_"+params.startYear.toString(), 
              
  }); 
  
Export.image.toAsset({
              image: snic_output01.get(1), 
              description:"LTOP_SNIC_imagery_"+params.place+"_c2_"+params.randomPts.toString()+"_pts_"+params.startYear.toString(), 
              assetId:params.assetsChild+"/LTOP_SNIC_imagery_"+params.place+"_c2_"+params.randomPts.toString()+"_pts_"+params.startYear.toString(), 
              region:params.aoi, 
              scale:30,
              maxPixels:1e13
  }); 



