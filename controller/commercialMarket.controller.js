const commercialMarket = require('../models/commercialMarketing.models');
const FillNoTracker = require('../models/fillNoTrackerModels');

async function generateFillNo() {
    let tracker = await FillNoTracker.findOne();

    if (!tracker) {
        tracker = new FillNoTracker({ prefix: 'A', lastSequenceNumber: 0 });
        await tracker.save();
    }

    let nextFillNo;
    let sequenceNumber = tracker.lastSequenceNumber + 1;

    if (sequenceNumber > 4) {
        const newPrefix = String.fromCharCode(tracker.prefix.charCodeAt(0) + 1);

        let newPrefixTracker = await FillNoTracker.findOne({ prefix: newPrefix });
        if (!newPrefixTracker) {
            newPrefixTracker = new FillNoTracker({ prefix: newPrefix, lastSequenceNumber: 0 });
            await newPrefixTracker.save();
        }
        tracker.prefix = newPrefix;
        tracker.lastSequenceNumber = 1;
        await tracker.save();
        nextFillNo = `${newPrefix}${tracker.lastSequenceNumber.toString().padStart(3, '0')}`;
    } else {
        nextFillNo = `${tracker.prefix}${sequenceNumber.toString().padStart(3, '0')}`;
        tracker.lastSequenceNumber = sequenceNumber;
        await tracker.save();
    }

    return nextFillNo;
}

// exports.createcommercialMarket = async (req, res) => {
//     try {
//         let { MarketingType } = req.body;
//         console.log(req.body,"gftygvbhbuiygyu");

//         if (MarketingType === "Commercial Marketing") {
//             console.log(MarketingType,"Commercial Marketing");

//             let { fillNo, Date, Name, Dealer, PhoneNumber,ConsumerName,ContactPersonName, Address, City_Village, District_Location, Pincode, Latitude,Longitude, Amount, GST, TotalAmount,
//                  Phase,  DealerCommission, ConsumerNumber, ConnectionLoad, Tarrif, AverageMonthlyBill, GSTNumber, PanNumber, MSME_UdyamREGISTRATION, } = req.body;

//             let checkcommercialMarket = await commercialMarket.findOne({ PhoneNumber: req.body.PhoneNumber })

//             if (checkcommercialMarket) {
//                 return res.status(401).json({ status: 401, message: "CommercialMarket Is Already Exiest.." })
//             }

//             if (!fillNo) {
//                 fillNo = await generateFillNo();
//             }

//             checkcommercialMarket = await commercialMarket.create({
//                 fillNo,
//                 Date,
//                 // contactPeosonName,
//                 Name,
//                 PhoneNumber,
//                 Address,
//                 City_Village,
//                 Dealer,
//                 District_Location,
//                 Pincode,
//                 Latitude,
//                 Amount,
//                 GST,
//                 ConsumerName,
//                 TotalAmount,
//                 Phase,
//                 // bank,
//                 Longitude,
//                 DealerCommission,
//                 ContactPersonName,
//                 ConsumerNumber,
//                 ConnectionLoad,
//                 Tarrif,
//                 AverageMonthlyBill,
//                 GSTNumber,
//                 PanNumber,
//                 MSME_UdyamREGISTRATION,
//                 MarketingType: "Commercial Marketing"
//             });

//             console.log(checkcommercialMarket,"====================checkcommercialMarket");
//             return res.status(201).json({ status: 201, message: "CommercialMarket Is Created successFully..", commercialMarketing: checkcommercialMarket })
//         }

//         if (MarketingType === "Residential Marketing") {

//             let { fillNo, Date, ConsumerName,ContactPersonName, PhoneNumber, ConsumerNumber, Address, City_Village, District_Location, Pincode, Latitude, Longitude, MarketingType, PrimaryAmount, Dealer,
//                 CashAmount, SolarAmount, SolarModuleMake, DealerPolicy, SolarModuleWp, SolarModuleNos, SystemSizeKw, InverterSize } = req.body;

//             let checkResidentMarket = await commercialMarket.findOne({ PhoneNumber: req.body.PhoneNumber })
//             if (checkResidentMarket) {
//                 return res.status(401).json({ status: 401, message: "residentialMarketing Is Already Exiest.." })
//             }

//             if (!fillNo) {
//                 fillNo = await generateFillNo();
//             }

//             checkResidentMarket = await commercialMarket.create({
//                 fillNo,
//                 Date,
//                 ConsumerName,
//                 // consumerName,
//                 PhoneNumber,
//                 ConsumerNumber,
//                 Address,
//                 ContactPersonName,
//                 City_Village,
//                 District_Location,
//                 Pincode,
//                 Latitude,
//                 Longitude,
//                 MarketingType,
//                 PrimaryAmount,
//                 Dealer,
//                 CashAmount,
//                 SolarAmount,
//                 SolarModuleMake,
//                 DealerPolicy,
//                 SolarModuleWp,
//                 SolarModuleNos,
//                 SystemSizeKw,
//                 InverterSize,
//                 MarketingType: "Residential Marketing"
//             });
//             console.log("checkResidentMarket>>>>>>>>>>>",checkResidentMarket);
//             return res.status(201).json({ status: 201, message: "residentialMarketing Is Created successFully..", residentialMarketing: checkResidentMarket })
//         }
//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message });
//         console.log(error);
//     }
// };

// exports.getAllCommercialmarket = async (req, res) => {
//     try {
//         let page = parseInt(req.query.page);
//         let pageSize = parseInt(req.query.pageSize);

//         if (page < 1 || pageSize < 1) {
//             return res.status(401).json({ status: 401, message: "Account Is Already Exiest.." })
//         }

//         let paginatedRCommercialMarket;
//         paginatedRCommercialMarket = await commercialMarket.find();
//         let count = paginatedRCommercialMarket.length;

//         if (count === 0) {
//             return res.status(404).json({ status: 404, message: "No CommercialMarket Found.." })
//         }

//         if (page && pageSize) {
//             startIndex = (page - 1) * pageSize;
//             lastIndex = (startIndex + pageSize)
//             paginatedRCommercialMarket = paginatedRCommercialMarket.slice(startIndex, lastIndex)
//         }

//         return res.status(200).json({ status: 200, TotalCommercialMarket: count, message: 'All CommercialMarket Found Successfully..', commercialMarket: paginatedRCommercialMarket })
//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message });
//         console.log(error);
//     }
// }

// exports.getCommercialMarketById = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let commercialMarketById = await commercialMarket.findById(id);
//         if (!commercialMarketById) {
//             return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
//         }
//         return res.status(200).json({ status: 200, message: "Get CommercialMarket Data Successfully...", CommercialMarket: commercialMarketById })
//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message });
//         console.log(error);
//     }
// }

// exports.updateCommercialMarket = async (req, res) => {
//     try {
//         let id = req.params.id;

//         let checkCommercialMarketId = await commercialMarket.findById(id);

//         if (!checkCommercialMarketId) {
//             return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
//         }

//         checkCommercialMarketId = await commercialMarket.findByIdAndUpdate(id, { ...req.body }, { new: true });

//         return res.status(200).json({ status: 200, message: "CommercialMarket Updated Successfully..", CommercialMarket: checkCommercialMarketId })
//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message });
//         console.log(error);
//     }
// };

// exports.deleteCommercialMasrket = async (req, res) => {
//     try {
//         let id = req.params.id;

//         let checkCommercialMarketId = await commercialMarket.findById(id);

//         if (!checkCommercialMarketId) {
//             return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
//         }

//         await commercialMarket.findByIdAndDelete(id);

//         return res.status(200).json({ status: 200, message: "CommercialMarket Removed Successfully.." })
//     } catch (error) {
//         res.status(500).json({ status: 500, message: error.message });
//         console.log(error);
//     }
// }

exports.createcommercialMarket = async (req, res) => {
    try {
        let { MarketingType } = req.body;

        if (MarketingType === "Commercial Marketing") {

            let { fillNo, Date, ContactPersonName, Dealer, PhoneNumber, Address, City_Village, SystemSizeKw, District_Location, Longitude, Pincode, Latitude, Amount, GST, TotalAmount, ConsumerName, DealerCommission, ConsumerNumber, ConnectionLoad, Tarrif, AverageMonthlyBill, GSTNumber, PanNumber, MSME_UdyamREGISTRATION, Phase, adharCard, lightBill, veraBill, status } = req.body;

            let checkcommercialMarket = await commercialMarket.findOne({ PhoneNumber: req.body.PhoneNumber })

            if (checkcommercialMarket) {
                return res.status(401).json({ status: 401, message: "Commercial Marketing Is Already Exist.." })
            }

            if (!fillNo) {
                fillNo = await generateFillNo();
            }

            if (!req.files || !req.files['adharCard'] || !req.files['lightBill'] || !req.files['veraBill']) {
                return res.status(401).json({ status: 401, message: "Please Upload All Required Files" });
            }

            checkcommercialMarket = await commercialMarket.create({
                fillNo,
                Date,
                ContactPersonName,
                PhoneNumber,
                Address,
                City_Village,
                Dealer,
                District_Location,
                Pincode,
                Latitude,
                Amount,
                GST,
                TotalAmount,
                ConsumerName,
                DealerCommission,
                ConsumerNumber,
                ConnectionLoad,
                Tarrif,
                AverageMonthlyBill,
                GSTNumber,
                PanNumber,
                SystemSizeKw,
                Longitude,
                MSME_UdyamREGISTRATION,
                Phase,
                adharCard: req.files['adharCard'][0].path,
                lightBill: req.files['lightBill'][0].path,
                veraBill: req.files['veraBill'][0].path,
                status,
                MarketingType: "Commercial Marketing",
            });

            return res.status(201).json({ status: 201, message: "Commercial Market Is Created SuccessFully..", commercialMarketing: checkcommercialMarket })
        }

        if (MarketingType === "Residential Marketing") {

            let { fillNo, Date, ConsumerName, PhoneNumber, ConsumerNumber, Address, City_Village, District_Location, Pincode, Latitude, Longitude,
                PrimaryAmount, Dealer, CashAmount, SolarAmount, SolarModuleMake, DealerPolicy, SolarModuleWp, SolarModuleNos, SystemSizeKw, InverterSize,
                adharCard, lightBill, veraBill, status } = req.body;

            let checkResidentMarket = await commercialMarket.findOne({ PhoneNumber: req.body.PhoneNumber })

            if (checkResidentMarket) {
                return res.status(401).json({ status: 401, message: "Residential Marketing Is Already Exist.." })
            }

            if (!fillNo) {
                fillNo = await generateFillNo();
            }

            if (!req.files || !req.files['adharCard'] || !req.files['lightBill'] || !req.files['veraBill']) {
                return res.status(401).json({ status: 401, message: "Please Upload All Required Files" });
            }

            checkResidentMarket = await commercialMarket.create({
                fillNo,
                Date,
                ConsumerName,
                PhoneNumber,
                ConsumerNumber,
                Address,
                City_Village,
                District_Location,
                Pincode,
                Latitude,
                Longitude,
                PrimaryAmount,
                Dealer,
                CashAmount,
                SolarAmount,
                SolarModuleMake,
                DealerPolicy,
                SolarModuleWp,
                SolarModuleNos,
                SystemSizeKw,
                InverterSize,
                adharCard: req.files['adharCard'][0].path,
                lightBill: req.files['lightBill'][0].path,
                veraBill: req.files['veraBill'][0].path,
                status,
                MarketingType: "Residential Marketing",
            });

            return res.status(201).json({ status: 201, message: "Residential Marketing Is Created SuccessFully..", residentialMarketing: checkResidentMarket })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

const dealer = require('../models/dealerEntery.models');
exports.getAllCommercialmarket = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Can't Be Less Than 1" })
        }

        let paginatedRCommercialMarket;

        paginatedRCommercialMarket = await commercialMarket.find();

        let getdDealerData = await dealer.find();
        let count = paginatedRCommercialMarket.length;

        // if (count === 0) {
        //     return res.status(404).json({ status: 404, message: "No CommercialMarket Found.." })
        // }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedRCommercialMarket = paginatedRCommercialMarket.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalCommercialMarket: count, message: 'All Marketing Data Found Successfully..', commercialMarket: paginatedRCommercialMarket, dealer: getdDealerData })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getCommercialMarketById = async (req, res) => {
    try {
        let id = req.params.id;

        let commercialMarketById = await commercialMarket.findById(id);

        // if (!commercialMarketById) {
        //     return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
        // }

        return res.status(200).json({ status: 200, message: "Get Marketing Data Successfully...", CommercialMarket: commercialMarketById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateCommercialMarket = async (req, res) => {
    try {
        let id = req.params.id;

        // if (!req.files || !req.files['adharCard'] || !req.files['lightBill'] || !req.files['veraBill']) {
        //     return res.status(401).json({ status: 401, message: "Please upload all required files" });
        // }

        let checkCommercialMarketId = await commercialMarket.findById(id);

        // if (!checkCommercialMarketId) {
        //     return res.status(404).json({ status: 404, message: "Market Not Found" })
        // }

        if (req.files.adharCard) {
            req.body.adharCard = req.files.adharCard[0].path
        }

        if (req.files.lightBill) {
            req.body.lightBill = req.files.lightBill[0].path
        }

        if (req.files.veraBill) {
            req.body.veraBill = req.files.veraBill[0].path
        }

        checkCommercialMarketId = await commercialMarket.findByIdAndUpdate(id, req.body.submissionValues, { new: true });


        return res.status(200).json({ status: 200, message: "Marketing Data Updated Successfully..", CommercialMarket: checkCommercialMarketId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteCommercialMasrket = async (req, res) => {
    try {
        let id = req.params.id;

        let checkCommercialMarketId = await commercialMarket.findById(id);

        if (!checkCommercialMarketId) {
            return res.status(404).json({ status: 404, message: "Marketing Data Not Found" })
        }

        await commercialMarket.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Marketing Data Removed Successfully.." })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}