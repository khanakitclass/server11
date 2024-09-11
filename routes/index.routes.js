const axios = require('axios');
const express = require('express');
const indexRoutes = express.Router();
const { userlogin, changePassword, userLogout, refreshToken } = require('../auth/auth');
const upload = require('../helper/imageUplode');
const { createNewProduct, getAllProductData, getProductById, updateProductData, deleteProductData } = require('../controller/product.controller');
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require('../controller/category.controller');
const { createSubCategory, getAllSubCategory, getSubCategoryById, updateSubCategory, deleteSubCategory } = require('../controller/subCategory.controller');
const { createRole, getAllRoles, getRoleById, upadetRoleById, deleteRoleById } = require('../controller/role.controller');
const { createNewUser, getAllUsers, getUserById, updateUser, removeUser, logoutUser } = require('../controller/user.controller');
const { createWareHouse, getAllWareHouse, getWareHouseById, updateWareHouseById, deleteWareHouseById } = require('../controller/warehouse.controllle');
const { createKitProduct, getAllKitProduct, updateKitProductById, deleteKitProductById, getkitProductById } = require('../controller/kitproduct.controller');
const { createNewVendor, getAllvendor, getvendorById, updateVandor, removeVendor } = require('../controller/vendor.controller');
const { createDealer, getAllDealers, getDealerById, updateDealer, deleteDealer } = require('../controller/dealerEntery.controller');
const { createCredit, getAllCreadit, getCerditById, updateCredit, deleteCredit } = require('../controller/credit.controller');
const { createDispatch, getAllDispatchData, getDispatchDataById, updateDispatchById, deleteDispatchById } = require('../controller/dispatch.controller');
const { createAccount, getAllAccount, getAccountById, updateAccount, deleteAccount } = require('../controller/account.controller');
const { createTechnical, getAllTechnical, getTechnicalById, updateTechnicalDetails, deleteTechnicalDetails } = require('../controller/technical.controller');
const { createLiasoning, getAllLiasoning, getLiasoningById, updateLiasoning, deleteLiasoning } = require('../controller/liasoning.controller');
const { createResidentialMarket, getAllResidentmarket, getResidentMarketById, updateResidentMasrket, deleteResidentMasrket } = require('../controller/residentialmasrketing.controller');
const { createcommercialMarket, getAllCommercialmarket, getCommercialMarketById, updateCommercialMarket, deleteCommercialMasrket } = require('../controller/commercialMarket.controller');
const { createDailyPrice, getAllDailyPrice, getDailyPriceById, updatedailyPriceById, deletedailyPriceById } = require('../controller/dailyPrice.controller');
const { createDealerRegister, getAllDealersRegister, getDealerRegisterById, updateDealerRegister, deleteDealerRegister } = require('../controller/dealerRegister.controller');
const { createNewPurchaseInvoice, getAllPurchaseInvoiceData, getPurchaseInvoiceById, updatePurchaseInvoiceData, deletePurchaseInvoice } = require('../controller/purcahseInvoice.controller');
const { createNewPurchase, getAllPurchaseData, getPurchaseById, updatePurchaseData, deletePurchase } = require('../controller/purchase.controller');
const { createTrasportDetaile, getAllTransportDetails, getTransportByID, updateTransportDetails, deleteTransportDetails } = require('../controller/transport.controller');
const { CreateMarketing } = require('../controller/marketing');
const { createSlideBarCategory, getAllSlideBarCategory, getSlideBarCategory, updateSlideBarCategory, deleteSlidBarCategory } = require('../controller/slideBarCategory.Controller');
const { createSlideBarSubCategory, getAllSlideBarSubCategory, getSlideBarSubCategory, updateSlideBarSubCategory, deleteSlidBarSubCategory } = require('../controller/slideBarSubCategory.controller');
const { auth } = require('../helper/auth');
const { createConditions, getAllConditions, getConditionById, updateConditionById, deleteConditionById } = require('../controller/termsAndConditionsController');
const { createstore, getAllstore, getstore, getstoreById, updatestoreById, deletestoreById } = require('../controller/store.controller');

// ------ All Rouutes ------

// Auth Routes 

indexRoutes.post('/login', userlogin);                      // User Login 
indexRoutes.put('/changePassword/:id', changePassword);     // User Change Password Using Id
indexRoutes.post('/logout/:id', userLogout);                // User Log Out
indexRoutes.post('/refreshToken', refreshToken);

// Product Routes 

indexRoutes.post('/addNewProduct', createNewProduct);
indexRoutes.get('/allproduct', getAllProductData);
indexRoutes.get('/getProduct/:id', getProductById);
indexRoutes.put('/updateProduct/:id', updateProductData);
indexRoutes.delete('/deleteProduct/:id', deleteProductData);

//Category Routes

indexRoutes.post('/addCategory', createCategory);
indexRoutes.get('/allCategory', getAllCategory);
indexRoutes.get('/getCategory/:id', getCategoryById);
indexRoutes.put('/updateCategory/:id', updateCategory);
indexRoutes.delete('/deleteCategory/:id', deleteCategory);

//subCategory Routes

indexRoutes.post('/addSubCategory', createSubCategory);
indexRoutes.get('/allSubCategory', getAllSubCategory);
indexRoutes.get('/getSubCategory/:id', getSubCategoryById);
indexRoutes.put('/updateSubCategory/:id', updateSubCategory);
indexRoutes.delete('/deleteSubCategory/:id', deleteSubCategory);

//roles Routes 

indexRoutes.post('/createRole', createRole);
indexRoutes.get('/allRoles', getAllRoles);
indexRoutes.get('/getRoleById/:id', getRoleById);
indexRoutes.put('/updateRole/:id', upadetRoleById);
indexRoutes.delete('/deleteRole/:id', deleteRoleById);


// user Routes 

indexRoutes.post('/createUser', upload.single('avatar'), createNewUser);
indexRoutes.get('/allUsers', getAllUsers);
indexRoutes.get('/getUserById/:id', getUserById);
indexRoutes.put('/userUpdate/:id', upload.single('avatar'), updateUser);
indexRoutes.delete('/deleteUser/:id', removeUser);

// wareHouse Routes

indexRoutes.post('/createWarehouse', createWareHouse);
indexRoutes.get('/getAllWarehouse', getAllWareHouse);
indexRoutes.get('/geWareHouseById/:id', getWareHouseById);
indexRoutes.put('/updateWareHouse/:id', updateWareHouseById);
indexRoutes.delete('/deleteWarehouse/:id', deleteWareHouseById);

//kitProduct Routes 

indexRoutes.post('/createKitProduct', createKitProduct);
indexRoutes.get('/getAllKitProduct', getAllKitProduct);
indexRoutes.get('/getKitProductById/:id', getkitProductById);
indexRoutes.put('/updateKitProduct/:id', updateKitProductById);
indexRoutes.delete('/deleteKitProduct/:id', deleteKitProductById);

// vedor Routes

indexRoutes.post('/createVandore', createNewVendor);
indexRoutes.get('/getAllVender', getAllvendor);
indexRoutes.get('/getVenderbyId/:id', getvendorById);
indexRoutes.put('/updateVenode/:id', updateVandor);
indexRoutes.delete('/deleteVendor/:id', removeVendor);


//  dealer Routes 

indexRoutes.post('/createDealer', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createDealer);
indexRoutes.get('/getAllDealer', getAllDealers);
indexRoutes.get('/getDealerById/:id', getDealerById);
indexRoutes.put('/updateDealer/:id', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateDealer);
indexRoutes.delete('/deleteDealer/:id', deleteDealer)


// Credit routes 

indexRoutes.post('/createCredit', createCredit);
indexRoutes.get('/getAllCredit', getAllCreadit);
indexRoutes.get('/getCreditById/:id', getCerditById);
indexRoutes.put('/updateCredit/:id', updateCredit);
indexRoutes.delete('/deletCredit/:id', deleteCredit);


// Dispatch routes

indexRoutes.post('/createDispatch', createDispatch);
indexRoutes.get('/getAllDespatch', getAllDispatchData);
indexRoutes.get('/getdispatchId/:id', getDispatchDataById);
indexRoutes.put('/updateDispatch/:id', updateDispatchById);
indexRoutes.delete('/deleteDispatch/:id', deleteDispatchById);

// Account Rourtes

indexRoutes.post('/createAccount', createAccount);
indexRoutes.get('/getAllAccount', getAllAccount);
indexRoutes.get('/getAccountById/:id', getAccountById);
indexRoutes.put('/updateAccountById/:id', updateAccount);
indexRoutes.delete('/deleteAccount/:id', deleteAccount);


// Technical Routes 

indexRoutes.post('/createTechnicalDetails', createTechnical);
indexRoutes.get('/getAllTecnicalDetails', getAllTechnical);
indexRoutes.get('/getTechnicalDetails/:id', getTechnicalById);
indexRoutes.put('/updateTechnicalDetails/:id', updateTechnicalDetails);
indexRoutes.delete('/deleteTecnicalDetails/:id', deleteTechnicalDetails);

// Liasoniing Routes

indexRoutes.post('/createLiasonig', createLiasoning);
indexRoutes.get('/getAllLiasoning', getAllLiasoning);
indexRoutes.get('/getLiasoning/:id', getLiasoningById);
indexRoutes.put('/updateLiasoning/:id', upload.fields([{ name: "SitePhoto", maxCount: 1 }, { name: "OtherPhoto", maxCount: 1 }]), updateLiasoning);
indexRoutes.delete('/deleteLisoning/:id', deleteLiasoning);


// Resident Marketing Routes 

indexRoutes.post("/createResidentMarket", createResidentialMarket);
indexRoutes.get('/getAllresidentMarket', getAllResidentmarket);
indexRoutes.get('/getResidentMarket/:id', getResidentMarketById);
indexRoutes.put('/updateResidentMarket/:id', updateResidentMasrket);
indexRoutes.delete('/deleteResidenMarket/:id', deleteResidentMasrket);

// Commercial Market Routes

indexRoutes.post('/createCommercialMarket', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), createcommercialMarket);
indexRoutes.get('/getAllCommercialMarket', getAllCommercialmarket);
indexRoutes.get('/getCommercialMarket/:id', getCommercialMarketById);
indexRoutes.put('/updateCommercial/:id', upload.fields([{ name: "adharCard", maxCount: 1 }, { name: "lightBill", maxCount: 1 }, { name: "veraBill", maxCount: 1 }]), updateCommercialMarket);
indexRoutes.delete('/deleteCommercial/:id', deleteCommercialMasrket);

// Daily Price

indexRoutes.post('/addDailyPrice', createDailyPrice);
indexRoutes.get('/getAllDailyPrice', getAllDailyPrice);
indexRoutes.get('/getDailyPrice/:id', getDailyPriceById);
indexRoutes.put('/updateDailPrice/:id', updatedailyPriceById);
indexRoutes.delete('/deleteDailyPrice/:id', deletedailyPriceById);


// Dealer Register 

indexRoutes.post('/createDealerRegister', upload.single('image'), createDealerRegister);
indexRoutes.get('/getAllDealerRegiser', getAllDealersRegister);
indexRoutes.get('/getDelerRegister/:id', getDealerRegisterById);
indexRoutes.put('/updateDealerRegister/:id', upload.single('image'), updateDealerRegister);
indexRoutes.delete('/deleteDelerRegiste/:id', deleteDealerRegister);

// Purchase Invoice Routes

indexRoutes.post('/createPurchaseInvoice', upload.single('uplodFile'), createNewPurchaseInvoice);
indexRoutes.get('/getAllPurcahseInvoice', getAllPurchaseInvoiceData);
indexRoutes.get('/getPurchaseInvoice/:id', getPurchaseInvoiceById);
indexRoutes.put('/updatePurchaseInvoice/:id', updatePurchaseInvoiceData);
indexRoutes.delete('/deletePurchaseInvoive/:id', deletePurchaseInvoice);

// Purchase routes

indexRoutes.post('/CreatePurchase', createNewPurchase);
indexRoutes.get('/getAllPurchase', getAllPurchaseData);
indexRoutes.get('/getPurchaseData/:id', getPurchaseById);
indexRoutes.put('/updatePurchase/:id', updatePurchaseData);
indexRoutes.delete('/deletePurchase/:id', deletePurchase);


// Transport Routes 

indexRoutes.post('/crateTarsport', createTrasportDetaile);
indexRoutes.get('/allTransportDetails', getAllTransportDetails);
indexRoutes.get('/getTransportDetails/:id', getTransportByID);
indexRoutes.put('/updateTransportDetails/:id', updateTransportDetails);
indexRoutes.delete('/deleteTransportDetails/:id', deleteTransportDetails);


// Slide Bar Category

indexRoutes.post('/creatSlidebarCategory', upload.single('slideBarImage'), createSlideBarCategory)
indexRoutes.get('/AllSlideBarCategory', getAllSlideBarCategory);
indexRoutes.get('/GetslideBarCategory/:id', getSlideBarCategory);
indexRoutes.put('/updateSlideBarCategory/:id', upload.single('slideBarImage'), updateSlideBarCategory);
indexRoutes.delete('/deleteSlideBarCategory/:id', deleteSlidBarCategory)

// slide Bar sub Category 

indexRoutes.post('/createSlidebarSubCategory', createSlideBarSubCategory);
indexRoutes.get('/AllslideBarSubcategory', getAllSlideBarSubCategory);
indexRoutes.get('/getSlidebarSubCategory/:id', getSlideBarSubCategory);
indexRoutes.put('/updateSlideBarSubCategory/:id', updateSlideBarSubCategory);
indexRoutes.delete('/deleteSlideBarSubCategory/:id', deleteSlidBarSubCategory)

//  TERMS & CONDITION

indexRoutes.post('/createTermsAndCondition', createConditions);
indexRoutes.get('/allTermsAndConditions', getAllConditions);
indexRoutes.get('/getTermsAndCondition/:id', getConditionById);
indexRoutes.put('/updateTermsAndCondition/:id', updateConditionById);
indexRoutes.delete('/deleteTermsAndCondition/:id', deleteConditionById);

//  STORE

indexRoutes.post('/createstore', upload.single('storeuploadFile'), createstore);
indexRoutes.get('/allstores', getAllstore);
indexRoutes.get('/getstore/:id', getstoreById);
indexRoutes.put('/updatestore/:id', upload.single('storeuploadFile'), updatestoreById);
indexRoutes.delete('/deletestore/:id', deletestoreById);

// view download image

indexRoutes.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send('Image URL is required');
  }

  try {
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream'
    });

    res.setHeader('Content-Type', response.headers['content-type']);

    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).send('Error fetching image');
  }
});


// marketing routes 

indexRoutes.post('/createMarketing', CreateMarketing);
module.exports = indexRoutes;
