const dealer = require('../models/dealerEntery.models');

exports.createDealer = async (req, res) => {
    try {
        let { ConsumerName, Location, adharCard, lightBill, veraBill, PhoneNumber, MarketingType, amount, status } = req.body;

        let checkDealer = await dealer.findOne({ ConsumerName: ConsumerName })

        if (checkDealer) {
            return res.status(401).json({ status: 401, message: "Dealer Entery Already Exists" })
        }

        if (!req.files || !req.files['adharCard'] || !req.files['lightBill'] || !req.files['veraBill']) {
            return res.status(401).json({ status: 401, message: "Please Upload All Required Files" });
        }

        checkDealer = await dealer.create({
            ConsumerName,
            Location,
            adharCard: req.files['adharCard'][0].path,
            lightBill: req.files['lightBill'][0].path,
            veraBill: req.files['veraBill'][0].path,
            PhoneNumber,
            status,
            MarketingType,
            amount
        });

        return res.status(201).json({ status: 201, message: "Dealer Entry Created Successfully...", Dealer: checkDealer })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllDealers = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Can't Be Less Than 1" })
        }

        let paginatedDealer;

        paginatedDealer = await dealer.find();

        let count = paginatedDealer.length;

        // if (count === 0) {
        //     return res.status(404).json({ status: 404, message: "Dealter Entery Not Found  " })
        // }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedDealer = paginatedDealer.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalDealersEntery: count, message: "All Dealer Entry Found SuccessFully", Dealer: paginatedDealer })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getDealerById = async (req, res) => {
    try {
        let id = req.params.id

        let getdealer = await dealer.findById(id);

        // if (!getdealer) {
        //     return res.status(404).json({ status: 404, message: "Dealer Entery Not Found " })
        // }

        return res.status(200).json({ status: 200, message: "Dealer Entry Found SuccessFully...", Dealer: getdealer });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateDealer = async (req, res) => {
    try {
        let id = req.params.id

        let updatedealer = await dealer.findById(id);

        // if (!updatedealer) {
        //     return res.status(404).json({ status: 404, message: "Dealer Entery Not Found " })
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

        updatedealer = await dealer.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Dealer Entry Updated SuccessFully...", Dealer: updatedealer });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteDealer = async (req, res) => {
    try {
        let id = req.params.id

        let deletedealer = await dealer.findById(id);

        if (!deletedealer) {
            return res.status(400).json({ status: 404, message: "Dealer Entry Not Found " })
        }

        await dealer.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Dealer Entry Deleted SuccessFully..." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

